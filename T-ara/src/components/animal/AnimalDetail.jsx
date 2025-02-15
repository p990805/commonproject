import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnimalDetailHeader from "./AnimalDetailHeader";
import api from "../../api";

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimalDetail = async () => {
      try {
        const response = await api.get(`/animal/detail/${id}`);

        // 전체 응답 로깅
        console.log("Full API Response:", response);

        // 응답 데이터 구조 안전하게 확인
        const animalData =
          response.data?.animalInfo ||
          response.data?.data?.animalInfo ||
          response.data;

        console.log("Extracted Animal Data:", animalData);

        if (!animalData) {
          throw new Error("Animal data not found");
        }

        setAnimal(animalData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animal detail:", error);
        setError("동물 정보를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchAnimalDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
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
    <div className="min-h-screen bg-gray-50">
      <AnimalDetailHeader animal={animal} />
    </div>
  );
};

export default AnimalDetail;
