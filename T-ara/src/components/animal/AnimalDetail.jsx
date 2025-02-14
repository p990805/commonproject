import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnimalDetailHeader from "./AnimalDetailHeader";

const dummyData = [
  {
    id: 1,
    name: "포메라니안",
    breed: "포메라니안",
    species: "강아지",
    age: "1999년생",
    shelter: "서울 보호소",
    imageUrl: "https://images.unsplash.com/photo-1545231027-637d2f6210f8",
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
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5",
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
    imageUrl: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91",
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
    imageUrl: "https://images.unsplash.com/photo-1508532566027-b2032cd8a715",
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

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    // URL의 id와 일치하는 동물 찾기
    const foundAnimal = dummyData.find((animal) => animal.id === Number(id));
    setAnimal(foundAnimal);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimalDetailHeader animal={animal} />
    </div>
  );
};

export default AnimalDetail;
