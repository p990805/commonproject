import React from "react";
import { useNavigate } from "react-router-dom";

const AnimalDetailHeader = ({ animal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/donation`, {
      state: {
        animalInfo: {
          id: animal.animalId,
          animalName: animal.animalName,
          shelterName: animal.shelterName,
          shelterId: animal.shelterId,
        },
      },
    });
  };

  // 데이터가 없을 경우 로딩 또는 에러 상태 표시
  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        동물 정보를 불러올 수 없습니다.
      </div>
    );
  }
  // 성별 변환 함수
  const getGenderText = (gender) => {
    return gender === "M" ? "수컷" : "암컷";
  };

  // 중성화 상태 변환 함수
  const getNeuteringStatusText = (status) => {
    return status === "0" ? "중성화 X" : "중성화 O";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">보호동물 정보</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 이미지 */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
            <img
              src={animal.thumbnail}
              alt={animal.animalName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 오른쪽: 동물 정보 */}
        <div className="lg:w-1/2">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{animal.animalName}</h1>
          </div>

          <div className="space-y-4 border-b pb-6 mb-6">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">종</div>
              <div className="col-span-4">{animal.speciesName}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">성별</div>
              <div className="col-span-4">{getGenderText(animal.gender)}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">추정나이</div>
              <div className="col-span-4">{animal.birth.split("-")[0]}년생</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">몸무게</div>
              <div className="col-span-4">{animal.weight}kg</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">털색</div>
              <div className="col-span-4">{animal.color}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">중성화</div>
              <div className="col-span-4">
                {getNeuteringStatusText(animal.neuteringStatus)}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">등록일시</div>
              <div className="col-span-4">{animal.createdAt.split(" ")[0]}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">품종</div>
              <div className="col-span-4">{animal.breedName}</div>
            </div>
          </div>

          <div className="space-y-4 cursor-pointer hover:opacity-90 transition-all">
            <div className="text-center border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div
                onClick={() => navigate(`/shelter/${animal.shelterId}`)}
                className="flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="font-semibold text-gray-800">
                  {animal.shelterName}
                </span>
                <p>보러가기</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 text-center cursor-default">
              <span>👥 {animal.donationNumber} 명이 함께 후원중</span>
            </div>

            <button
              onClick={handleClick}
              className="w-full bg-red-500 text-white py-4 rounded-lg font-bold hover:bg-red-600 transition-colors cursor-pointer"
            >
              후원하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailHeader;
