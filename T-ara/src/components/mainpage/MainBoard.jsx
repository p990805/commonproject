import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const MainBoard = () => {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 공지사항 목록 API 호출 (기본 파라미터 사용)
  useEffect(() => {
    api
      .get("/notice/list", {
        params: {
          shelterCategory: "all",
          searchCategory: "all",
          keyword: "",
        },
      })
      .then((response) => {
        const list = response.data.noticeList || [];
        setNoticeList(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("공지사항 리스트 로드 오류:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // 날짜 포맷 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>공지사항을 불러올 수 없습니다.</div>;

  // 최대 5개의 공지사항만 표시
  const displayList = noticeList.slice(0, 5);

  return (
    <div className="flex w-full max-w-[1500px] mx-auto h-[600px] bg-gray-100">
      <div className="flex flex-col items-center justify-center w-[60%] mx-auto gap-5">
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-2xl">공지사항</h1>
          <Link
            to="/community/notice"
            className="text-gray-400 font-bold hover:underline flex items-center space-x-1"
          >
            <span className="flex gap-1 items-center">
              더보기 <FaPlus className="align-middle mb-[2.5px]" />
            </span>
          </Link>
        </div>

        {/* 공지사항 리스트 */}
        <div className="w-full bg-white overflow-auto p-3 rounded">
          {displayList.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              현재 작성된 공지사항이 없습니다.
            </div>
          ) : (
            displayList.map((notice) => (
              <div
                key={notice.noticeId}
                className="flex justify-between items-center px-4 py-3 border-b border-gray-100 last:border-none cursor-pointer hover:bg-gray-100 rounded-md transition"
                onClick={() => navigate(`/community/notice/${notice.noticeId}`)}
              >
                {/* 카테고리 */}
                <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-2xl">
                  공지
                </span>
                {/* 제목 */}
                <p className="flex-1 text-gray-700 ml-4 truncate">
                  {notice.title}
                </p>
                {/* 날짜 */}
                <span className="text-gray-400 text-sm">{formatDate(notice.createdAt)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainBoard;
