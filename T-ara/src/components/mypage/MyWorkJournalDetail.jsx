import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MyWorkJournalDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState({
    username: '김시원99',
    title: '12월의 김시원99 일지',
    center: '광주 동물보호센터',
    date: '2025.01.25 17:26',
    content: `아침 7:30 AM - 아침 산책 오늘 아침 산책은 날씨가 맑고 시원해서 정말 좋았어요. 뽀로는 아침 산책을 특히 좋아하는데, 산책을 시작하자마자 신나서 뛰어다녔어요. 길을 걸으면서 주변의 냄새를 열심히 맡고, 다른 강아지가 지나가면 꼬리를 흔들며 인사를 했답니다. 특히 오늘은 새벽에 내린 이슬이 강아지 발바닥에 묻어서 조금 흙투성이가 되기도 했지만, 뽀로는 전혀 신경 쓰지 않고 자유롭게 뛰어놀았어요. 항상 산책 후엔 너무 피곤해하면서도 만족한 표정을 짓는데, 그것도 너무 귀엽습니다.

아침 8:00 AM - 아침밥 오늘 아침은 건강한 사료와 함께 소량의 삶은 달걀을 섞어주었어요. 뽀로는 밥을 주면 하나도 남기지 않고 다 먹어버려요. 사료가 항상 맛있나 봐요! 매일 밥을 먹을 때마다 그릇을 깨끗하게 비우는 뽀로를 보면, 아주 배고팠던 것 같아 마음이 따뜻해져요. 그리고 가끔씩 밥 먹은 후에 보이는 만족스러운 표정도 너무 귀엽습니다. "잘 먹었어요!"라고 말하는 것 같아요.

오전 9:30 AM - 훈련 시간 오늘은 앉아와 기다려 훈련을 했어요. 훈련 시간에는 뽀로가 항상 집중을 잘해서 정말 잘 따라와요...`,
    thumbnailUrl: '/assets/corgi.png',
    mainImageUrl: '/assets/corgi.png'
  });

  useEffect(() => {
    // API 연동 예정 부분
    // 데이터 페칭 로직 추가 가능
    // id 값을 사용하여 특정 일지 데이터 가져오기
  }, [id]);

  // 로딩 상태 처리
  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  return (
    <div className="w-full max-w-[1307px] mx-auto p-6 bg-white rounded-lg border border-gray-200">
      {/* 네비게이션 */}
      <div className="mb-4">
        <span className="text-sm text-gray-500 tracking-[-1px]">
          나의 후원동물 {'>'} 활동일지
        </span>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* 작성자 정보 */}
      <div className="relative flex items-end justify-between mb-4">
      <div className="flex items-start gap-4">
          <img
          src={journal.thumbnailUrl}
          alt="Profile"
          className="w-20 h-20 rounded-lg"
          />
          <div>
          <h2 className="text-lg font-bold mb-2">{journal.username}</h2>
          <h1 className="text-3xl font-bold mb-2">{journal.title}</h1>
          </div>
      </div>
      <p className="text-sm text-gray-500 absolute bottom-0 right-0">
          {journal.center} | {journal.date}
      </p>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* 메인 이미지 */}
      <div className="mb-6">
        <img
          src={journal.mainImageUrl}
          alt="Main"
          className="w-[600px] h-[337.5px] object-cover opacity-50"
        />
      </div>

      {/* 본문 내용 */}
      <div className="mb-12">
        <p className="text-lg text-gray-600 tracking-[-1.08px] leading-relaxed whitespace-pre-wrap">
          {journal.content}
        </p>
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="w-[150px] h-[50px] bg-[#545455] text-white font-bold text-sm rounded-full flex items-center justify-center"
        >
          {'< 이전글'}
        </button>

        <button
          onClick={() => navigate('/my-page')}
          className="w-[150px] h-[50px] bg-red-500 text-white font-bold text-sm rounded-full flex items-center justify-center"
        >
          목록
        </button>

        <button
          onClick={() => navigate(1)}
          className="w-[150px] h-[50px] bg-[#545455] text-white font-bold text-sm rounded-full flex items-center justify-center"
        >
          {'다음글 >'}
        </button>
      </div>
    </div>
  );
};

export default MyWorkJournalDetail;