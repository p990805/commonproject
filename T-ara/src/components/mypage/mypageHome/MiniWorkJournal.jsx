import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api"; // api.js의 경로에 맞게 수정해주세요

const MiniWorkJournal = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await api.get("/diary/user/list");
        const { diaryList } = response.data;
        // 최신순 정렬 (createdAt 기준 내림차순)
        const sortedList = diaryList.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        // 최대 5개만 사용
        setJournals(sortedList.slice(0, 5));
      } catch (error) {
        // 에러가 발생하면 콘솔에는 남기지 않고 빈 배열로 처리
        setJournals([]);
      }
    };

    fetchDiaries();
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">활동일지</h2>
        <Link
          to="/mypage/workjournal"
          className="text-gray-400 hover:underline text-sm font-medium"
        >
          +더보기
        </Link>
      </div>

      <div className="space-y-2">
        {journals.length > 0 ? (
          journals.map((item) => (
            <Link
              key={item.diaryId}
              to={`/mypage/workjournal/${item.diaryId}`}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between border-b p-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{item.title}</span>
                </div>
                <div>
                  <span className="text-gray-700 text-sm">
                    후원일 {item.writtenDate}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center mt-4">
            <p className="text-gray-500 text-md">활동일지 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniWorkJournal;
