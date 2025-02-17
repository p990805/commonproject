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
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e"
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
              <div className="text-gray-500">보호소</div>
              <div className="col-span-4">{animal.shelterName}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">등록일시</div>
              <div className="col-span-4">{animal.createdAt.split(" ")[0]}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">품종</div>
              <div className="col-span-4">{animal.breedName}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">설명</div>
              <div className="col-span-4">{animal.description}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center border rounded-lg p-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">✉</span>
                <span>입양 문의 : 준비중</span>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <span>👥 {animal.donationNumber} 명이 함께 후원중</span>
            </div>

            <button
              onClick={handleClick}
              className="w-full bg-red-500 text-white py-4 rounded-lg font-bold hover:bg-red-600 transition-colors"
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
