import React, { useState, useEffect } from "react";
import QuillEditor from "../QuillEditor";
import api from "../../api";

const EditCampaignModal = ({ campaign, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: { ops: [{ insert: "\n" }] },
    targetAmount: "",
    startedAt: "",
    endedAt: "",
    simpleDescription: "",
    achievedAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaignContent = async () => {
      if (!campaign?.campaignId) return;

      try {
        const response = await api.get(`/campaigns/${campaign.campaignId}`);
        console.log("API Response:", response.data);

        // content 파싱 부분을 여기에 넣습니다
        let parsedContent;
        try {
          parsedContent =
            typeof response.data.content === "string"
              ? JSON.parse(response.data.content)
              : response.data.content;
          console.log("Parsed content:", parsedContent);
        } catch (error) {
          console.error("Content parsing error:", error);
          parsedContent = { ops: [{ insert: "\n" }] };
        }

        setFormData({
          title: campaign.title || "",
          content: parsedContent, // 파싱된 content 사용
          targetAmount: campaign.targetAmount || "",
          startedAt: campaign.startedAt?.split("T")[0] || "",
          endedAt: campaign.endedAt?.split("T")[0] || "",
          simpleDescription: campaign.simpleDescription || "",
          achievedAmount: campaign.achievedAmount || 0,
        });
        setLoading(false);
      } catch (error) {
        console.error("캠페인 데이터 로드 오류:", error);
        alert("캠페인 내용을 불러오는데 실패했습니다.");
        setLoading(false);
        onClose();
      }
    };

    if (isOpen) {
      fetchCampaignContent();
    }
  }, [campaign?.campaignId, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    // Quill 에디터의 변경사항을 원하는 형식으로 변환
    const newContent = {
      ops: [
        {
          insert: {
            image: content?.ops?.[0]?.insert?.image || "",
            text: content?.ops?.[0]?.insert?.text || "",
          },
        },
      ],
    };

    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.startedAt || !formData.endedAt) {
      alert("시작일과 종료일을 선택해주세요.");
      return;
    }

    try {
      const requestBody = {
        shelterId: parseInt(localStorage.getItem("shelterId")),
        title: formData.title,
        content: formData.content,
        targetAmount: parseInt(formData.targetAmount),
        achievedAmount: parseInt(formData.achievedAmount),
        startedAt: `${formData.startedAt}T00:00:00`,
        endedAt: `${formData.endedAt}T23:59:59`,
        simpleDescription: formData.simpleDescription,
      };

      console.log("전송할 데이터:", requestBody);

      await api.put(`/campaigns/${campaign.campaignId}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("캠페인이 성공적으로 수정되었습니다.");
      onSave();
      onClose();
    } catch (error) {
      console.error("캠페인 수정 실패:", error.response?.data || error.message);
      alert("캠페인 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-h-[90vh] overflow-y-auto relative">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-6">캠페인 수정</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 제목 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* 간단 설명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  간단 설명
                </label>
                <input
                  type="text"
                  name="simpleDescription"
                  value={formData.simpleDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* 목표 금액 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  목표 금액
                </label>
                <input
                  type="number"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* 기간 설정 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시작일
                  </label>
                  <input
                    type="date"
                    name="startedAt"
                    value={formData.startedAt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    종료일
                  </label>
                  <input
                    type="date"
                    name="endedAt"
                    value={formData.endedAt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* 내용 에디터 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  내용
                </label>
                <div className="border border-gray-300 rounded-md">
                  <QuillEditor
                    value={formData.content}
                    onChange={handleQuillChange}
                  />
                </div>
              </div>

              {/* 버튼 영역 */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  수정하기
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditCampaignModal;
