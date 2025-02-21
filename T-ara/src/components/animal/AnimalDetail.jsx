import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnimalDetailHeader from "./AnimalDetailHeader";
import AnimalDetailGallery from "./AnimalDetaionGallery";
import api from "../../api";
import { deltaToHtml } from "../../utils/quillParser";

// 안전한 Delta 파싱 유틸리티 함수
const safeParseDelta = (content) => {
  if (!content) return "";

  try {
    // Quill Delta 객체 형식인 경우 (ops 속성 있음)
    if (content && content.ops) {
      return deltaToHtml(content);
    }

    // 문자열인 경우
    if (typeof content === "string") {
      return content;
    }

    // 기타 형식
    return String(content);
  } catch (error) {
    console.error("Delta 파싱 중 오류:", error, "원본 내용:", content);
    return String(content);
  }
};

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 동물 정보 먼저 가져오기
        const animalResponse = await api.get(`/animal/detail/${id}`);
        const animalData =
          animalResponse.data?.animalInfo ||
          animalResponse.data?.data?.animalInfo ||
          animalResponse.data;

        if (!animalData) {
          throw new Error("Animal data not found");
        }

        setAnimal(animalData);

        // 동물일지 가져오기
        try {
          const diaryResponse = await api.get(`/diary/free/${id}`);
          // console.log("Diary Response:", diaryResponse.data);
          // console.log("Diary List:", diaryResponse.data.freeDiaryList);
          setDiaries(diaryResponse.data.freeDiaryList || []);
        } catch (diaryError) {
          // 404 에러는 일지가 없는 정상적인 경우
          if (diaryError.response?.status === 404) {
            setDiaries([]);
          } else {
            console.error("Error fetching diaries:", diaryError);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching animal data:", error);
        setError("동물 정보를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/animal")}
            className="text-gray-600 hover:text-gray-900"
          >
            ← 보호동물 목록으로 돌아가기
          </button>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="py-8">
        {/* 동물 헤더 섹션 */}
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimalDetailHeader animal={animal} />
          </div>
        </div>

        {/* 갤러리 섹션 */}
        <div className="max-w-6xl mx-auto mt-8 px-4">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <AnimalDetailGallery animal={animal} />
          </div>
        </div>

        {/* 설명 섹션 */}
        <div className="max-w-6xl mx-auto mt-8 px-4">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">상세 설명</h2>
            <div className="bg-gray-100 rounded-lg p-6">
              {animal.description ? (
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: safeParseDelta(animal.description),
                  }}
                />
              ) : (
                <p className="text-gray-500 italic">등록된 설명이 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        {/* 활동일지 섹션 */}
        <div className="max-w-6xl mx-auto mt-8 px-4">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">활동일지</h2>
            {diaries.length > 0 ? (
              <>
                <div className="space-y-4">
                  {diaries.map((diary) => (
                    <div key={diary.diaryId} className="border rounded-lg p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {diary.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(diary.writtenDate)}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm mb-3">
                        {diary.shelterName}
                      </div>
                      <hr className="border-gray-200 my-4" />
                      <div
                        className="text-gray-700 leading-relaxed px-2 py-3"
                        dangerouslySetInnerHTML={{
                          __html: diary.content
                            ? safeParseDelta(diary.content)
                            : "",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-lg font-medium text-red-800 mb-2">
                    후원을 하시면 더 많은 활동일지를 마이페이지에서 확인하실 수
                    있습니다!
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-4">
                등록된 활동일지가 없습니다.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnimalDetail;
