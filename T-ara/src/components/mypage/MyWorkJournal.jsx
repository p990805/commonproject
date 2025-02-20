// src/components/mypage/mypage2/MyWorkJournal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const MyWorkJournal = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 5; // 한 페이지당 항목 수
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  // GET /diary/user/list API 호출 함수
  // MyWorkJournal.jsx
  const fetchActivities = async () => {
    setLoading(true);
    try {
      // 1. 먼저 다이어리 리스트를 가져옵니다
      const response = await api.get("/diary/user/list");

      // 2. 각 다이어리 항목에 대해 동물 상세 정보를 가져옵니다
      const activitiesWithThumbnails = await Promise.all(
        response.data.diaryList.map(async (item) => {
          try {
            // 동물 상세 정보 API 호출
            const animalResponse = await api.get(
              `/animal/detail/${item.animalId}`
            );
            const thumbnail = animalResponse.data.animalInfo.thumbnail;

            return {
              id: item.diaryId,
              username: item.animalName,
              title: item.title,
              content: "",
              date: formatDate(item.writtenDate),
              imageUrl: thumbnail || "/assets/corgi.png", // 동물 API에서 가져온 썸네일 사용
            };
          } catch (error) {
            console.error(
              `Error fetching animal details for ID ${item.animalId}:`,
              error
            );
            // 동물 정보 가져오기 실패시 기본 이미지 사용
            return {
              id: item.diaryId,
              username: item.animalName,
              title: item.title,
              content: "",
              date: formatDate(item.writtenDate),
              imageUrl: "/assets/corgi.png",
            };
          }
        })
      );

      setActivities(activitiesWithThumbnails);
      setTotalPages(Math.ceil(activitiesWithThumbnails.length / itemsPerPage));
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setActivities([]);
        setError(null);
      } else {
        setError("활동 일지를 불러오는데 실패했습니다.");
        console.error("Error fetching activities:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // 날짜 형식 변환 (ex. "2025-02-18 01:37:43" → "2025-02-18")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split(" ")[0];
  };

  const handleActivityClick = (activityId) => {
    // workjournal/:diaryId 경로로 이동
    navigate(`/mypage/workjournal/${activityId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 현재 페이지에 해당하는 활동 목록 (페이지네이션 처리)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActivities = activities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }
  if (error && activities.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">활동일지</h1>
        </div>
        <hr />

        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex items-center mt-10">
            <p className="text-gray-500 text-md text-center mt-8">
              활동일지가 존재하지 않습니다.
            </p>
          </div>

          <div className="flex justify-center items-center gap-1 mt-8">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50">
              «
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50">
              ‹
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-lg">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50">
              ›
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50">
              »
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-[1307px] mx-auto p-6 bg-white rounded-lg border border-gray-200">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">활동일지</h1>
      </div>

      {/* 구분선 */}
      <div className="border-t border-black mb-6"></div>

      {/* 활동 리스트 */}
      <div className="space-y-0">
        {currentActivities.length > 0 ? (
          currentActivities.map((activity) => (
            <div key={activity.id} className="w-full border-b border-gray-200">
              <div className="flex p-6 gap-8">
                {/* 이미지 영역 */}
                <div
                  className="w-[300px] h-[200px] relative shrink-0 cursor-pointer"
                  onClick={() => handleActivityClick(activity.id)}
                >
                  <img
                    src={activity.imageUrl}
                    alt="Activity"
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>

                {/* 콘텐츠 영역 */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-4">
                    <h3 className="text-base font-bold tracking-[-1.08px] font-inter">
                      {activity.username}
                    </h3>
                    <h2
                      onClick={() => handleActivityClick(activity.id)}
                      className="text-3xl font-bold tracking-[-1.08px] font-inter cursor-pointer hover:text-red-500 transition-colors"
                    >
                      {activity.title}
                    </h2>
                    <p className="text-lg text-gray-500 tracking-[-1.08px] font-inter">
                      {activity.content}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 tracking-[-1.08px] font-inter">
                    {activity.date}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            활동일지 내역이 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-1 mt-8">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          ‹
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-lg">
          {currentPage}
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          ›
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default MyWorkJournal;
