// src/components/mypage/mypage2/MyWorkJournalDetail.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const MyWorkJournalDetail = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams(); // diaryId
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    const fetchJournalDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/diary/detail/${diaryId}`);
        const detail = response.data.diaryDetail;
        // content가 Quill Delta 형식인 경우, 각 insert 값을 합쳐 평문으로 변환
        const contentText =
          detail.content && detail.content.ops
            ? detail.content.ops.map(op => op.insert).join('')
            : '';
        // journal 데이터를 구성 (필요에 따라 thumbnail, mainImageUrl은 기본값 사용)
        setJournal({
          id: detail.diaryId,
          username: detail.animalName,      // animalName을 작성자명으로 사용
          title: detail.title,
          center: detail.shelterName,         // shelterName을 센터명으로 사용
          date: detail.writtenDate,
          content: contentText,
          thumbnailUrl: "/assets/corgi.png",  // API에 이미지 필드가 없으므로 기본 이미지 사용
          mainImageUrl: "/assets/corgi.png"
        });
      } catch (err) {
        setError('일지 상세 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching journal detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJournalDetail();
  }, [diaryId]);

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!journal) {
    return null;
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
          onClick={() => navigate('/mypage/workjournal')}
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
