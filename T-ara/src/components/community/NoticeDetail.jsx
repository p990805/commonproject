// src/components/community/NoticeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { deltaToHtml } from "../../utils/quillParser"; // Quill 델타를 HTML로 변환하는 함수

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!noticeId) return;
    setLoading(true);
    api
      .get(`/notice/detail/${noticeId}`)
      .then((response) => {
        // API 응답 구조 예시:
        // {
        //   "notice": {
        //     "noticeId": "1",
        //     "shelterId": "20",
        //     "shelterName": "보호소테스트",
        //     "title": "사진 테스트 2",
        //     "content": { "ops": [...] },
        //     "lastModified": "2025-02-16 07:38:28"
        //   }
        // }
        const fetchedNotice = response.data.notice;
        setNotice(fetchedNotice);
        setLoading(false);
      })
      .catch((err) => {
        console.error("공지사항 상세 조회 오류:", err);
        setError(err);
        setLoading(false);
      });
  }, [noticeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

  // Quill 델타 형식이라면 HTML로 변환
  const contentHtml = notice.content ? deltaToHtml(notice.content) : "";

  // 날짜 포맷 함수
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 작성(수정) 시점으로 lastModified 사용
  const formattedDate = formatDateTime(notice.lastModified);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      {/* 상단 버튼: 목록으로 돌아가기 */}
      <button
        onClick={() => navigate("/community/notice")}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← 목록으로 돌아가기
      </button>

      {/* 공지사항 제목 */}
      <h1 className="text-3xl font-bold mb-2">{notice.title}</h1>

      {/* 작성자(보호소 이름)와 작성(수정) 시점 */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span className="mr-4">작성자: {notice.shelterName}</span>
        <span>{formattedDate}</span>
      </div>

      {/* 공지사항 본문 (Quill 델타 → HTML 변환) */}
      <div
        className="prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* 추가 이미지 필드가 있다면 표시 (없다면 제거 가능) */}
      {/* 
      {notice.imageUrl && (
        <img
          src={notice.imageUrl}
          alt="공지사항 이미지"
          className="w-full object-cover rounded-md mb-4"
        />
      )}
      */}
    </div>
  );
};

export default NoticeDetail;
