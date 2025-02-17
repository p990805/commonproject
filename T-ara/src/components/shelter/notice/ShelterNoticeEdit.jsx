// src/components/ShelterNoticeEdit.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarNavigation from "../SidebarNavigation";
import QuillEditor from "../../QuillEditor";
import api from "../../../api";

const ShelterNoticeEdit = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    noticeId: "",
    title: "",
    shelterId: "",
    content: { ops: [{ insert: "\n" }] }, // 초기 Quill Delta 객체
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 수정할 공지사항 데이터를 백엔드에서 로드
  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const modifyInfoResponse = await api.get(
          `/notice/modifyinfo/${noticeId}`,
          { headers: { Authorization: token } }
        );
        const noticeInfo = modifyInfoResponse.data.noticeInfo;
        setFormData({
          noticeId: noticeInfo.noticeId,
          title: noticeInfo.title,
          shelterId: noticeInfo.shelterId,
          content: noticeInfo.content || { ops: [{ insert: "\n" }] },
        });
        setLoading(false);
      } catch (err) {
        console.error("공지사항 수정 데이터 로드 오류:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchNoticeData();
  }, [noticeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 제목 유효성 검사
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // 내용 유효성 검사 (Quill Delta 객체의 ops 배열 확인)
    let isContentEmpty = false;
    if (typeof formData.content === "string") {
      isContentEmpty = !formData.content.trim();
    } else if (
      typeof formData.content === "object" &&
      formData.content.ops
    ) {
      if (
        formData.content.ops.length === 0 ||
        (formData.content.ops.length === 1 &&
          formData.content.ops[0].insert === "\n")
      ) {
        isContentEmpty = true;
      }
    } else {
      isContentEmpty = true;
    }
    if (isContentEmpty) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 백엔드에서는 수정 시 "content" 키로 JSON 객체를 받기를 기대합니다.
    const payload = {
      noticeId: formData.noticeId,
      shelterId: formData.shelterId,
      title: formData.title,
      content: formData.content, // 객체 그대로 전송 (stringify하지 않음)
    };

    console.log("수정 제출 payload:", payload);

    try {
      const token = localStorage.getItem("authToken");
      const response = await api.put("/notice/modify", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      alert(response.data.message);
      navigate("/shelter/notice");
    } catch (error) {
      console.error("공지사항 수정 오류:", error);
      alert("공지사항 수정에 실패하였습니다.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />
      <div className="flex-1 p-8">
        <div className="mx-4">
          <h1 className="text-2xl font-bold mb-6">공지사항 수정</h1>
          <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg shadow-lg p-6">
            {/* 제목 입력 */}
            <div className="mb-6">
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
            {/* Quill 에디터 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <div className="border border-gray-300 rounded-md">
                <QuillEditor value={formData.content} onChange={handleQuillChange} />
              </div>
            </div>
            {/* 제출 버튼 */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
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
        </div>
      </div>
    </div>
  );
};

export default ShelterNoticeEdit;
