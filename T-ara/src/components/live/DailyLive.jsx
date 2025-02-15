// src/components/live/DailyLive.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // axios 인스턴스 (환경에 맞게 설정되어 있다고 가정)
import { toast } from 'react-toastify';
import ThumbnailCapture from './ThumbnailCapture';

const DailyLive = () => {
  const [liveList, setLiveList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 백엔드에서 라이브 스트림 목록 불러오기
  useEffect(() => {
    api.get('/stream')
      .then((response) => {
        setLiveList(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.error('라이브 스트림 데이터 불러오기 에러:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // 라이브 아이템 클릭 시 라이브 플레이어 페이지로 이동
  const handleLiveClick = (streamId) => {
    api.get(`/stream/lives/${streamId}`)
      .then((response) => {
        // response.data에는 JoinStreamDTO 정보가 있다고 가정
        navigate(`/live/${streamId}`, { state: response.data });
        console.log(response.data);
      })
      .catch((err) => {
        console.error('라이브 접속 에러:', err);
        toast.error("라이브 접속 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="w-full border p-4">
      {/* 상단 제목 및 검색창 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">진행중인 일상 라이브</h1>
        <div className="relative">
          <input
            type="text"
            className="border p-1 absolute right-3 border-gray-400 rounded"
            placeholder="검색"
          />
          <img
            src="/assets/search-icon.png"
            alt="검색"
            className="w-4 h-4 relative right-5 top-2 cursor-pointer"
          />
        </div>
      </div>

      {/* 필터 */}
      <div className="flex space-x-2 mb-4">
        <select className="w-50 border border-gray-300 p-1">
          <option value="전체">전체</option>
          <option value="서울">서울</option>
          <option value="광주">광주</option>
        </select>
        <select className="w-50 border border-gray-300 p-1">
          <option value="전체">전체</option>
          <option value="광산구보호소">광산구보호소</option>
          <option value="서구보호소">서구보호소</option>
        </select>
        <select className="w-50 border border-gray-300 p-1">
          <option value="전체">전체</option>
          <option value="강아지">강아지</option>
          <option value="고양이">고양이</option>
        </select>
      </div>

      {/* 라이브 목록 */}
      {loading ? (
        <p>로딩중...</p>
      ) : error ? (
        <p className="text-center text-red-500">진행 중인 방송이 없습니다.</p>
      ) : liveList.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {liveList.map((live) => (
            <div
              key={live.streamId}
              className="border p-2 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleLiveClick(live.streamId)}
            >
              <h2 className="font-semibold">{live.title}</h2>
              {/* 백엔드에서 각 라이브 객체에 previewUrl(스트림 미리보기 URL)을 제공한다고 가정 */}
              {live.previewUrl ? (
                <ThumbnailCapture imageUrl={live.previewUrl} width={320} height={260} />
              ) : (
                <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                  <p>썸네일 없음</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">현재 진행 중인 라이브 방송이 없습니다.</p>
      )}
    </div>
  );
};

export default DailyLive;
