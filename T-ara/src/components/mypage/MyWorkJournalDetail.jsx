import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { deltaToHtml } from "../../utils/quillParser";

// 안전한 Delta 파싱 유틸리티 함수
const safeParseDelta = (content) => {
  if (!content) return "";

  try {
    if (content && content.ops) {
      return deltaToHtml(content);
    }
    if (typeof content === "string") {
      return content;
    }
    return String(content);
  } catch (error) {
    console.error("Delta 파싱 중 오류:", error, "원본 내용:", content);
    return String(content);
  }
};

const MyWorkJournalDetail = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    const fetchJournalDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/diary/detail/${diaryId}`);
        const detail = response.data.diaryDetail;

        setJournal({
          id: detail.diaryId,
          username: detail.animalName,
          title: detail.title,
          center: detail.shelterName,
          date: detail.writtenDate,
          content: detail.content,
          thumbnailUrl: detail.profileImage || "/assets/corgi.png",
        });
      } catch (err) {
        setError("일지 상세 정보를 불러오는데 실패했습니다.");
        console.error("Error fetching journal detail:", err);
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
          나의 후원동물 {">"} 활동일지
        </span>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* 작성자 정보 */}
      <div className="relative flex items-end justify-between mb-4">
        <div className="flex items-start gap-4">
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

      {/* 본문 내용 - Quill Delta 렌더링 */}
      <div className="mb-12">
        <div
          className="text-lg text-gray-600 tracking-[-1.08px] leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: safeParseDelta(journal.content),
          }}
        />
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => navigate("/mypage/workjournal")}
          className="w-[150px] h-[50px] bg-red-500 text-white font-bold text-sm rounded-full flex items-center justify-center"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default MyWorkJournalDetail;
