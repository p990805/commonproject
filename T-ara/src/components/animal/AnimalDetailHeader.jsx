import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnimalDetailHeader = ({ animal }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/donation`);
  };

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 이미지 */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
            <img
              src={animal.imageUrl}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 오른쪽: 동물 정보 */}
        <div className="lg:w-1/2">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold">{animal.name}</h1>
              <span className="text-gray-500">{animal.code}</span>
            </div>
            <button onClick={toggleLike} className="text-red-500 text-2xl">
              {isLiked ? "♥" : "♡"}
            </button>
          </div>

          <div className="space-y-4 border-b pb-6 mb-6">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">종</div>
              <div className="col-span-4">{animal.species}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">성별</div>
              <div className="col-span-4">{animal.gender}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">추정나이</div>
              <div className="col-span-4">{animal.age}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">몸무게</div>
              <div className="col-span-4">{animal.weight}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">털색</div>
              <div className="col-span-4">{animal.color}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">중성화</div>
              <div className="col-span-4">{animal.neutered}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">보호소</div>
              <div className="col-span-4">{animal.shelter}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">등록일시</div>
              <div className="col-span-4">{animal.registeredDate}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">품종</div>
              <div className="col-span-4">{animal.breed}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-500">설명</div>
              <div className="col-span-4">{animal.description}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center py-4 border rounded-lg">
              <p className="text-gray-500">후원자 분들 (3명)</p>
              <div className="flex justify-center gap-4 mt-2">
                <div className="text-red-500">
                  ♥<br />
                  박주현
                </div>
                <div className="text-red-500">
                  ♥<br />
                  박주현
                </div>
                <div className="text-red-500">
                  ♥<br />
                  박주현
                </div>
              </div>
            </div>

            <div className="text-center border rounded-lg p-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">✉</span>
                <span>입양 문의 : {animal.contactNumber}</span>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <span>👥 {animal.donors} 명이 함께 후원중</span>
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
