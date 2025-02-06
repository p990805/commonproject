import React, { useState, useEffect } from 'react';

const DailyLive = () => {
  // 예시: 라이브 스트리밍 데이터 배열 (API 호출 등으로 받아올 수 있음)
  const [liveList, setLiveList] = useState([]);

  // useEffect를 통해 데이터를 불러오는 로직 (여기서는 예시로 setTimeout 사용)
  useEffect(() => {
    // 예를 들어, 3초 후에 데이터를 받아왔다고 가정
    setTimeout(() => {
      // 테스트: 데이터가 있을 경우 주석 해제, 없을 경우 빈 배열 유지
      // setLiveList([{ id: 1, title: '라이브 스트리밍1' }, { id: 2, title: '라이브 스트리밍2' }]);
      setLiveList([]); // 데이터가 없을 때
    }, 3000);
  }, []);

  return (
    <div className="w-full border p-4">
      {/* 진행중인 라이브 제목과 검색창 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">진행중인 일상 라이브</h1>
        <div className="relative">
          <input type="text" className="border p-1 absolute right-3" placeholder="검색" />
          <img src="/assets/search-icon.png" alt="검색" className="w-4 h-4 relative right-5 top-2 cursor-pointer" />
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

      {/* 라이브 목록 또는 메시지 */}
      {liveList.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {liveList.map((live) => (
            <div key={live.id} className="border p-2">
              <h2 className="font-semibold">{live.title}</h2>
              {/* 여기에서 라이브 스트리밍 썸네일, 정보 등 추가 */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">라이브 방송 중인 곳이 없습니다.</p>
      )}
    </div>
  );
};

export default DailyLive;
