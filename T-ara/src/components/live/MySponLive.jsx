import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // axios 인스턴스 (baseURL 및 기타 설정이 되어 있다고 가정)
import { toast } from 'react-toastify';

const MySponLive = () => {
  const [donationLiveList, setDonationLiveList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 후원 라이브 목록을 불러옴
  useEffect(() => {
    api.get('/stream/donation-live')
      .then((response) => {
        setDonationLiveList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('후원 라이브 데이터 불러오기 오류:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // 각 라이브 아이템 클릭 시 해당 스트림 접속 정보를 받아와 라이브 페이지로 이동
  const handleLiveClick = (streamId) => {
    api.get(`/stream/lives/${streamId}`)
      .then((response) => {
        // response.data에는 JoinStreamDTO 정보가 들어있음.
        navigate(`/lives/${streamId}`, { state: response.data });
      })
      .catch((err) => {
        console.error('라이브 접속 오류:', err);
        toast.error('라이브 접속 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="w-full border p-4">
      {/* 헤더와 검색창 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">내 후원동물 라이브</h1>
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

      {/* 필터 UI (필요 시 동작 구현 추가) */}
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

      {/* 라이브 목록 또는 메시지 */}
      {loading ? (
        <p>로딩중...</p>
      ) : error ? (
        <p className="text-center text-red-500">후원 라이브 방송을 불러오지 못했습니다.</p>
      ) : donationLiveList.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {donationLiveList.map((live) => (
            <div
              key={live.streamId}
              className="border p-2 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleLiveClick(live.streamId)}
            >
              <h2 className="font-semibold">{live.title}</h2>
              {/* 추가적인 라이브 스트림 정보(썸네일, 시간 등)가 있다면 여기서 표시 */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">진행 중인 후원 라이브 방송이 없습니다.</p>
      )}
    </div>
  );
};

export default MySponLive;
