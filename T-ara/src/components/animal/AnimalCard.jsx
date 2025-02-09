import React from "react";
import { useNavigate } from "react-router-dom";

const AnimalCard = ({ animal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animal/${animal.id}`);
  };

  return (
    <div onClick={handleClick} className="bg-white rounded-lg overflow-hidden">
      {/* 이미지 */}
      <div className="aspect-square">
        <img
          src={animal.imageUrl}
          alt={animal.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 정보 */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-base">{animal.name}</h3>
          <span className="text-sm text-gray-500">
            {animal.species}/{animal.age}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{animal.shelter}</p>
        <div className="mt-2">
          <span className="text-red-500 text-sm">
            ♥ {animal.donors} 명이 함께 후원중
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
