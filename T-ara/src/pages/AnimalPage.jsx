import React, { useState, useEffect } from "react";
import AnimalCard from "../components/animal/AnimalCard";
import api from "../api";

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AnimalPage = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get("/animal/list/user");
        const data = response.data.message;
        console.log(data);
        setAnimals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animals:", error);
        setError("Failed to load animals. Please try again later.");
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const toggleDropdown = (type) => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 배너 섹션 */}
      <div
        className="relative h-72 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e')",
        }}
      >
        <div className="absolute inset-0 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h1 className="text-3xl font-bold mb-2">보호중인 동물</h1>
            <p className="text-sm">
              현재 대한민국에서 보호 중인 동물들을 소개합니다.
              <br />
              당신의 작은 관심이 큰 힘이 됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">유기동물 후원하기</h2>
          <div className="relative w-72">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="w-full h-10 px-4 pr-10 border border-gray-300 rounded"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* 필터 헤더 */}
        <div className="relative border-y border-gray-200">
          <div className="grid grid-cols-12 text-sm text-gray-500">
            {/* 전체 */}
            <div className="col-span-1">
              <button className="w-full py-3 px-4 text-left hover:bg-gray-50">
                전체
              </button>
            </div>

            {/* 지역 필터 */}
            <div className="col-span-2 relative">
              <button
                onClick={() => toggleDropdown("region")}
                className="w-full py-3 px-4 text-left hover:bg-gray-50 flex items-center justify-between"
              >
                <span>지역</span>
                <span className="ml-2">▼</span>
              </button>
              {activeDropdown === "region" && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg z-10">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                    서울
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                    경기
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                    인천
                  </button>
                </div>
              )}
            </div>

            {/* 보호소 필터 */}
            <div className="col-span-2 relative">
              <button
                onClick={() => toggleDropdown("shelter")}
                className="w-full py-3 px-4 text-left hover:bg-gray-50 flex items-center justify-between"
              >
                <span>보호소</span>
                <span className="ml-2">▼</span>
              </button>
              {activeDropdown === "shelter" && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg z-10">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                    서울 보호소
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                    경기 보호소
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                    인천 보호소
                  </button>
                </div>
              )}
            </div>

            {/* 종 필터 */}
            <div className="col-span-2 relative">
              <button
                onClick={() => toggleDropdown("species")}
                className="w-full py-3 px-4 text-left hover:bg-gray-50 flex items-center justify-between"
              >
                <span>종</span>
                <span className="ml-2">▼</span>
              </button>
              {activeDropdown === "species" && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg z-10">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                    강아지
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                    고양이
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                    기타
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {animals.map((animal, index) => (
            <AnimalCard key={animal.id || index} animal={animal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimalPage;
