// src/components/live/DailyLive.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // axios 인스턴스
import { toast } from "react-toastify";
import ThumbnailCapture from "./ThumbnailCapture";

const DailyLive = () => {
  const [liveList, setLiveList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("인기순");
  const navigate = useNavigate();

  // 백엔드에서 라이브 스트림 목록 불러오기
  useEffect(() => {
    api
      .get("/stream")
      .then((response) => {
        setLiveList(response.data);
        setLoading(false);
        // console.log(response.data);
      })
      .catch((err) => {
        console.error("라이브 스트림 데이터 불러오기 에러:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // 검색어와 정렬 옵션에 따라 라이브 목록 필터링 및 정렬
  const filteredAndSortedList = liveList
    // 검색 필터: title이나 description에 검색어가 포함되어 있으면 남김
    .filter((live) => {
      if (!searchTerm) return true;
      const lowerTerm = searchTerm.toLowerCase();
      return (
        (live.title && live.title.toLowerCase().includes(lowerTerm)) ||
        (live.description && live.description.toLowerCase().includes(lowerTerm))
      );
    })
    // 정렬 처리
    .sort((a, b) => {
      if (sortOption === "최신순") {
        // 내림차순: 최신 startTime이 먼저
        return new Date(b.startTime) - new Date(a.startTime);
      } else if (sortOption === "오래된순") {
        // 오름차순: 오래된 startTime이 먼저
        return new Date(a.startTime) - new Date(b.startTime);
      } else {
        // 인기순 또는 기본 순서는 API에서 받은 순서 유지
        return 0;
      }
    });

  // 라이브 아이템 클릭 시 라이브 플레이어 페이지로 이동
  const handleLiveClick = (streamId) => {
    api
      .get(`/stream/lives/${streamId}`)
      .then((response) => {
        // response.data에는 JoinStreamDTO 정보가 있다고 가정
        navigate(`/live/${streamId}`, { state: response.data });
        // console.log(response.data);
      })
      .catch((err) => {
        console.error("라이브 접속 에러:", err);
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <select
          className="w-50 border border-gray-300 p-1"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="최신순">최신순</option>
          <option value="오래된순">오래된순</option>
        </select>
      </div>

      {/* 라이브 목록 */}
      {loading ? (
        <p>로딩중...</p>
      ) : error ? (
        <p className="text-center text-red-500">진행 중인 방송이 없습니다.</p>
      ) : filteredAndSortedList.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredAndSortedList.map((live) => (
            <div
              key={live.streamId}
              className="border p-2 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleLiveClick(live.streamId)}
            >
              <h2 className="font-semibold">{live.title}</h2>
              {/* 백엔드에서 각 라이브 객체에 previewUrl(스트림 미리보기 URL)을 제공한다고 가정 */}
              {live.previewUrl ? (
                <ThumbnailCapture
                  imageUrl={live.previewUrl}
                  width={320}
                  height={260}
                />
              ) : (
                <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                  <p>썸네일 없음</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          현재 진행 중인 라이브 방송이 없습니다.
        </p>
      )}
    </div>
  );
};

export default DailyLive;
