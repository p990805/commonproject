import React, { useState, useEffect } from "react";
import QuillEditor from "../QuillEditor";
import api from "../../api";

const EditDiaryModal = ({ diary, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: { ops: [{ insert: "\n" }] },
    writtenDate: "",
    animalId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryContent = async () => {
      if (!diary?.diaryId) return;

      try {
        const response = await api.get(`/diary/moidfyinfo/${diary.diaryId}`, {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        });

        console.log("API Response:", response.data);

        if (response.data?.modifyInfo) {
          const { modifyInfo } = response.data;

          // content 파싱
          let parsedContent;
          try {
            parsedContent =
              typeof modifyInfo.content === "string"
                ? JSON.parse(modifyInfo.content)
                : modifyInfo.content;
            console.log("Parsed content:", parsedContent);
          } catch (error) {
            console.error("Content parsing error:", error);
            parsedContent = { ops: [{ insert: modifyInfo.content + "\n" }] };
          }

          setFormData({
            title: diary.title || "",
            content: parsedContent,
            writtenDate: diary.writtenDate || "",
            animalId: diary.animalId || "",
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("일지 데이터 로드 오류:", error);
        alert("일지 내용을 불러오는데 실패했습니다.");
        setLoading(false);
        onClose();
      }
    };

    if (isOpen) {
      fetchDiaryContent();
    }
  }, [diary?.diaryId, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    console.log("Quill content changed:", content);
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

    if (!formData.writtenDate) {
      alert("작성일자를 선택해주세요.");
      return;
    }

    try {
      const requestBody = {
        diaryId: diary.diaryId,
        title: formData.title,
        content: formData.content,
        writtenDate: formData.writtenDate,
        animalId: formData.animalId,
      };

      console.log("전송할 데이터:", requestBody);

      const response = await api.put("/diary/modify", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
      });

      alert("일지가 성공적으로 수정되었습니다.");
      onSave();
      onClose();
    } catch (error) {
      console.error("일지 수정 실패:", error.response?.data || error.message);
      alert("일지 수정에 실패했습니다. 다시 시도해주세요.");
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

            <h2 className="text-2xl font-bold mb-6">동물 일지 수정</h2>

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

              {/* 작성일자 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  작성일자
                </label>
                <input
                  type="date"
                  name="writtenDate"
                  value={formData.writtenDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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

export default EditDiaryModal;
