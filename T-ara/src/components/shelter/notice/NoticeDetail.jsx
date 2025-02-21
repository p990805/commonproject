// src/components/NoticeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarNavigation from "../SidebarNavigation";
import api from "../../../api";
// Import the converter from the library
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

// Helper function to convert delta to HTML
const deltaToHtml = (delta) => {
  const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  return converter.convert();
};

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notice details from the backend
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await api.get(`/notice/detail/${noticeId}`);
        if (response.data.notice) {
          setNotice(response.data.notice);
        } else {
          setError(new Error("존재하지 않는 공지사항 입니다."));
        }
      } catch (err) {
        console.error("공지사항 상세 조회 오류:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [noticeId]);

  // Format date string (e.g., "2025-02-16 07:38:28" -> "2025.02.16")
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;
  if (!notice) return <div className="p-6">공지사항을 찾을 수 없습니다.</div>;

  // Convert Quill Delta to HTML
  const contentHtml = notice.content ? deltaToHtml(notice.content) : "";

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />
      <div className="flex-1 p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 underline"
        >
          ← 목록으로 돌아가기
        </button>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{notice.title}</h1>
          <p className="text-gray-500 mb-2">작성자: {notice.shelterName}</p>
          <p className="text-gray-500 mb-4">
            수정일: {formatDate(notice.lastModified)}
          </p>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
