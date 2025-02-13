// src/components/community/InquiryItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import api from "../../../api";

const InquiryItem = ({ inquiry, isOpen, onToggle, onDelete }) => {
  const hasAnswer = inquiry.answerStatus === "1";

  // 삭제 버튼 핸들러
  const handleDelete = async (e) => {
    e.stopPropagation(); // 리스트 토글 이벤트 방지
    if (!window.confirm("정말 이 문의사항을 삭제하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get(`/inquiry/delete/${inquiry.inquiryId}`, {
        headers: { Authorization: token },
      });
      alert(response.data.message);
      // 부모 컴포넌트에 삭제 완료 알림 (리스트 상태 업데이트)
      onDelete && onDelete(inquiry.inquiryId);
    } catch (error) {
      console.error("문의사항 삭제 오류:", error);
      alert("문의사항 삭제에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <li className="border-b border-gray-300 last:border-b-0 pb-4">
      {/* 문의 기본 정보 */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div>
          <h2 className="text-xl font-bold">제목: {inquiry.title}</h2>
          <p className="text-sm text-gray-500">
            문의번호: {inquiry.inquiryId} / 작성일: {inquiry.createdAt}
          </p>
        </div>
        <div className="flex items-center">
          {hasAnswer ? (
            <span className="ml-2 text-sm text-green-600">[답변 완료]</span>
          ) : (
            <span className="ml-2 text-sm text-red-500">[답변 전]</span>
          )}
          {/* 수정 버튼: 답변 전이고 삭제되지 않은 문의에만 노출 */}
          {!hasAnswer && !inquiry.deleted && (
            <>
              <Link
                to={`/community/inquiry/modifyinfo/${inquiry.inquiryId}`}
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                onClick={(e) => e.stopPropagation()} // 리스트 토글 이벤트 방지
              >
                수정
              </Link>
              <button
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
                onClick={handleDelete}
              >
                삭제
              </button>
            </>
          )}
          <button
            className={`ml-2 cursor-pointer transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 상세 내용 영역 */}
      {isOpen && (
        <div className="py-4 text-gray-600 text-sm">
          {inquiry.deleted ? (
            <p className="italic text-red-500">해당 문의는 삭제되었습니다.</p>
          ) : (
            <>
              <p className="font-bold text-red-500 mb-2">문의 내용:</p>
              {inquiry.content ? (
                <p>{inquiry.content}</p>
              ) : (
                <p className="italic text-gray-400">문의 내용이 없습니다.</p>
              )}
              {hasAnswer && (
                <>
                  <p className="font-bold text-red-500 mb-2 mt-4">답변:</p>
                  {inquiry.answer ? (
                    <p>{inquiry.answer}</p>
                  ) : (
                    <p className="italic text-gray-400">
                      답변을 불러오는 중...
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </li>
  );
};

export default InquiryItem;
