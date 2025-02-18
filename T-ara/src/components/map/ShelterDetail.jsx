import React from "react";
import { useNavigate } from "react-router-dom";

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// cityCategoryId에 따른 지역명을 매핑하는 객체
const cityCategoryMapping = {
  "1": "서울",
  "2": "경기",
  "3": "인천",
  "4": "강원",
  "5": "충북",
  "6": "대전/충남/세종",
  "7": "대구/경북",
  "8": "전북",
  "9": "광주/전남",
  "10": "부산/울산/경남",
  "11": "제주",
};

const ShelterDetail = ({ shelter, onClose,regionId }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    // shelter.id 대신 shelter.shelterId를 사용합니다.
    navigate(`/shelter/${shelter.shelterId}`);
  };

  // 값이 null, undefined, 또는 공백이면 기본값 반환하는 함수
  const displayValue = (value) => {
    return value && value.toString().trim() !== "" ? value : "등록되지 않았습니다.";
  };

  const regionDetail = regionId
    ? cityCategoryMapping[regionId] || "등록되지 않았습니다."
    : "등록되지 않았습니다.";
    console.log("shelter 디버깅용" ,shelter);
    console.log("지역번호" ,regionDetail);
    console.log(regionId);
  const shelterName = displayValue(shelter.name);
  const uniqueNumber = displayValue(shelter.uniqueNumber);
  const phone = displayValue(shelter.phone);
  const email = displayValue(shelter.email);
  const address = displayValue(shelter.address);
  const description = displayValue(shelter.description);

  return (
    <div className="flex flex-col h-full relative">
      <button
        onClick={onClose}
        className="absolute right-8 top-8 text-gray-400 hover:text-gray-600"
      >
        <CloseIcon />
      </button>

      <div className="p-8">
        {/* 헤더 영역: 지역 및 보호소 이름 */}
        <div className="mb-8">
          <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
            {regionDetail} 보호소
          </div>
          <div className="text-[#1a1a1a] text-[39.90px] font-bold leading-[59.85px]">
            {shelterName}
          </div>
        </div>

        {/* 상세 정보 영역 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              고유번호: {uniqueNumber}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              연락처: {phone}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              이메일: {email}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              주소: {address}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              보호소 소개:
            </div>
            <div className="text-[#1a1a1a] text-[22.80px] font-bold leading-[34.20px]">
              {description}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1" />
      {/* 보호소 상세보기 버튼 */}
      <div className="p-8">
        <button
          onClick={handleDetailClick}
          className="w-[249px] h-[65px] bg-[#ff4326] rounded text-white text-xl font-bold"
        >
          보호소 상세보기
        </button>
      </div>
    </div>
  );
};

export default ShelterDetail;
