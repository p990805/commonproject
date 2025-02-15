import React from "react";
import { useNavigate } from "react-router-dom";

const AnimalCard = ({ animal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animal/${animal.animalId}`);
  };

  // 성별 표시 변환
  const getGenderText = (gender) => {
    return gender === "M" ? "수컷" : gender === "F" ? "암컷" : "성별 미상";
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* 이미지 */}
      <div className="aspect-square relative">
        <img
          src={
            animal.thumbnail ||
            "https://img.icons8.com/?size=100&id=j1UxMbqzPi7n&format=png"
          }
          alt={animal.animalName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/default-animal.jpg";
          }}
        />
      </div>

      {/* 정보 */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-base">{animal.animalName}</h3>
          <span className="text-sm text-gray-500">
            {animal.speciesName}/{animal.birth.split("-")[0]}년생
          </span>
        </div>
        <div className="flex justify-between items-end mt-2">
          <span className="text-sm text-gray-600">{animal.breedName}</span>
          <span className="text-sm text-gray-600">{animal.shelterName}</span>
        </div>
        <div className="mt-2">
          <span className="text-red-500 text-sm">
            ♥ {animal.donationNumber || 0}명이 함께 후원중
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
