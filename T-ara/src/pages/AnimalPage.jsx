import React, { useState, useEffect } from "react";
import AnimalCard from "../components/animal/AnimalCard";

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

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // 실제 API 호출로 대체될 부분
        const dummyData = [
          {
            id: 1,
            name: "포메라니안",
            breed: "포메라니안",
            species: "강아지",
            age: "1999년생",
            shelter: "서울 보호소",
            imageUrl:
              "https://images.unsplash.com/photo-1545231027-637d2f6210f8",
            donors: 10,
            code: "D2023072601",
            gender: "수컷",
            weight: "2.8kg",
            color: "화이트",
            neutered: "중성화 X",
            registeredDate: "2025.01.23",
            description:
              "포메라니안은 적은 체구에 활발한 털과 귀여운 외모를 가진 활발한 반려견입니다. 사람을 좋아하고 애정이 깊어 주인과의 유대가 강하며, 지능적이고 똑똑이 잘 됩니다.",
            contactNumber: "02-000-0000",
          },
          {
            id: 2,
            name: "코숏",
            breed: "코숏",
            species: "고양이",
            age: "2001년생",
            shelter: "경기 보호소",
            imageUrl:
              "https://images.unsplash.com/photo-1573865526739-10659fec78a5",
            donors: 9,
            code: "D2023072602",
            gender: "암컷",
            weight: "3.2kg",
            color: "삼색",
            neutered: "중성화 O",
            registeredDate: "2025.01.24",
            description:
              "온순하고 사람을 좋아하는 고양이입니다. 다른 고양이들과도 잘 지내며, 깨끗한 생활습관을 가지고 있습니다.",
            contactNumber: "031-000-0000",
          },
          {
            id: 3,
            name: "코숏 아기고양이",
            breed: "코숏",
            species: "고양이",
            age: "2022년생",
            shelter: "인천 보호소",
            imageUrl:
              "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91",
            donors: 8,
            code: "D2023072603",
            gender: "수컷",
            weight: "1.5kg",
            color: "치즈",
            neutered: "중성화 X",
            registeredDate: "2025.01.25",
            description:
              "장난기 많고 활발한 아기고양이입니다. 사람의 손길을 좋아하며 호기심이 많습니다.",
            contactNumber: "032-000-0000",
          },
          {
            id: 4,
            name: "말티즈",
            breed: "말티즈",
            species: "강아지",
            age: "2010년생",
            shelter: "부산 보호소",
            imageUrl:
              "https://images.unsplash.com/photo-1508532566027-b2032cd8a715",
            donors: 7,
            code: "D2023072604",
            gender: "암컷",
            weight: "3.5kg",
            color: "화이트",
            neutered: "중성화 O",
            registeredDate: "2025.01.26",
            description:
              "조용하고 온순한 성격의 말티즈입니다. 산책을 좋아하며 기본적인 훈련이 되어있습니다.",
            contactNumber: "051-000-0000",
          },
        ];

        setAnimals(dummyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animals:", error);
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const toggleDropdown = (type) => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 배너 섹션 */}
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e')",
        }}
      >
        <div className="absolute inset-0 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h1 className="text-3xl font-bold mb-2">보호중인 동물</h1>
            <p className="text-sm">
              현재 대한민국서 보호 중인 동물들을 소개합니다.
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
          <div className="relative w-[300px]">
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
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimalPage;
