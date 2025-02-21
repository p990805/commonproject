import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Notice = () => {
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

  if (noticeList.length === 0) {
    return (
      <div className="w-full p-6 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6">공지사항</h1>
        <hr className="border-gray-200" />
        <div className="p-4 text-center text-gray-500">
          현재 작성된 공지사항이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">공지사항</h1>
      <hr className="border-gray-200" />
      <ul className="divide-y divide-gray-200">
        {noticeList.map((notice) => (
          <li
            key={notice.id}
            className="p-4 flex justify-between items-center hover:bg-gray-100 rounded-md transition cursor-pointer"
            onClick={() => navigate(`${notice.noticeId}`)}
          >
            <div className="flex gap-4 items-center">
              <p className="bg-red-500 text-white rounded-full px-4 py-1 text-sm font-bold">
                공지
              </p>
              <p className="font-medium text-lg text-gray-800">{notice.title}</p>
            </div>
            <p className="text-gray-500 text-sm">
              {formatDate(notice.createdAt)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notice;
