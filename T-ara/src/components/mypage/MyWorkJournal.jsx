import React, { useState, useEffect } from 'react';
import MyWorkJournalDetail from './MyWorkJournalDetail'


const MyWorkJournal = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    fetchActivities(currentPage);
  }, [currentPage]);

  // API 호출 함수
  const fetchActivities = async (page) => {
    setLoading(true);
    try {
      // API 연동 시
      // const response = await axios.get(`/api/activities?page=${page}`);
      // setActivities(response.data.activities);
      // setTotalPages(response.data.totalPages);

      // 임시 데이터
      const mockData = [
        {
          id: 1,
          username: '김시원99',
          title: '12월의 김시원99 일지',
          content: '12월의 김시원의 활동일지 입니다. 칸채우기 용 내용 어쩌구저쩌구 어쩌구저저구 내용 채우기 내용 채우기',
          date: '2025-01-25',
          imageUrl: '/api/placeholder/300/200'
        },
        {
          id: 2,
          username: '김시원99',
          title: '12월의 김시원99 일지',
          content: '12월의 김시원의 활동일지 입니다. 칸채우기 용 내용 어쩌구저쩌구 어쩌구저저구 내용 채우기 내용 채우기',
          date: '2025-01-25',
          imageUrl: '/api/placeholder/300/200'
        },
        {
          id: 3,
          username: '김시원99',
          title: '12월의 김시원99 일지',
          content: '12월의 김시원의 활동일지 입니다. 칸채우기 용 내용 어쩌구저쩌구 어쩌구저저구 내용 채우기 내용 채우기',
          date: '2025-01-25',
          imageUrl: '/api/placeholder/300/200'
        }
      ];
      setActivities(mockData);
      setTotalPages(5); // 임시 총 페이지 수
    } catch (err) {
      setError('활동 일지를 불러오는데 실패했습니다.');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityClick = (activityId) => {
    const activity = activities.find(a => a.id === activityId);
    setSelectedActivity(activity);
  };

  const handleBackToList = () => {
    setSelectedActivity(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="text-center py-8">로딩 중...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  // 상세 보기 컴포넌트 렌더링
  if (selectedActivity) {
    return (
      <MyWorkJournalDetail 
        activity={selectedActivity}
        onBack={handleBackToList}
      />
    );
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
        {activities.map(activity => (
          <div key={activity.id} className="w-full border-b border-gray-200">
            <div className="flex p-6 gap-8">
              {/* 이미지 */}
              <div 
              className="w-[300px] h-[200px] relative shrink-0 cursor-pointer"
              onClick={() => handleActivityClick(activity.id)}
              >
              <img
                  src="/assets/corgi.png"
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