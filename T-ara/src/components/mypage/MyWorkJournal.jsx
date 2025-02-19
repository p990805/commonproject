// src/components/mypage/mypage2/MyWorkJournal.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const MyWorkJournal = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 5; // 한 페이지당 항목 수
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities(currentPage);
  }, [currentPage]);

  // GET /diary/user/list API 호출 함수
  const fetchActivities = async (page) => {
    setLoading(true);
    try {
      const response = await api.get('/diary/user/list');
      // 응답의 diaryList 배열을 원하는 형식으로 매핑
      const mapped = response.data.diaryList.map(item => ({
        id: item.diaryId,                 // diaryId를 id로 사용
        username: item.animalName,          // animalName을 사용자명처럼 사용 (필요에 따라 조정)
        title: item.title,                  // 다이어리 제목
        content: "",                        // API에 내용이 없다면 빈 문자열 또는 다른 필드 사용
        date: item.writtenDate,             // 작성일자(또는 createdAt)
        imageUrl: "/assets/corgi.png"        // 이미지 URL이 없다면 기본 이미지 사용 (API에 이미지 필드가 있다면 그걸 사용)
      }));

      setActivities(mapped);
      setTotalPages(Math.ceil(mapped.length / itemsPerPage));
    } catch (err) {
      setError('활동 일지를 불러오는데 실패했습니다.');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityClick = (activityId) => {
    // workjournal/:diaryId 경로로 이동
    navigate(`/mypage/workjournal/${activityId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="text-center py-8">로딩 중...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

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
        {activities.map(activity => (
          <div key={activity.id} className="w-full border-b border-gray-200">
            <div className="flex p-6 gap-8">
              {/* 이미지 */}
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
              
              {/* 콘텐츠 */}
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
        ))}
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
