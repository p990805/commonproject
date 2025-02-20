import React from "react";
import { useNavigate } from "react-router-dom";

const CloseIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const cityCategoryMapping = {
  1: "서울",
  2: "경기",
  3: "인천",
  4: "강원",
  5: "충북",
  6: "대전/충남/세종",
  7: "대구/경북",
  8: "전북",
  9: "광주/전남",
  10: "부산/울산/경남",
  11: "제주",
};

const ShelterDetail = ({ shelter, onClose, regionId }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/shelter/${shelter.shelterId}`);
  };

  const displayValue = (value) => {
    return value && value.toString().trim() !== ""
      ? value
      : "등록되지 않았습니다.";
  };

  const regionDetail = regionId
    ? cityCategoryMapping[regionId] || "등록되지 않았습니다."
    : "등록되지 않았습니다.";

  const shelterName = displayValue(shelter.name);
  const uniqueNumber = displayValue(shelter.uniqueNumber);
  const phone = displayValue(shelter.phone);
  const email = displayValue(shelter.email);
  const address = displayValue(shelter.address);
  const description = displayValue(shelter.description);

  return (
    <div className="relative flex flex-col h-full bg-white">
      {/* 헤더 */}
      <div className="px-8 py-5 border-b border-gray-100">
        <div className="text-sm font-medium text-gray-500">보호소 찾기</div>
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute right-6 top-4 text-gray-400 hover:text-gray-600 p-1"
      >
        <CloseIcon />
      </button>

      {/* 메인 컨텐츠 */}
      <div className="px-8 py-8 flex-1">
        {/* 보호소 이름 */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 mb-1">
            {regionDetail} 보호소
          </h2>
          <h1 className="text-2xl font-bold text-gray-900">{shelterName}</h1>
        </div>

        {/* 상세 정보 */}
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-28 shrink-0 text-gray-500 font-medium">
              고유번호
            </div>
            <div className="text-gray-900">{uniqueNumber}</div>
          </div>

          <div className="flex items-start">
            <div className="w-28 shrink-0 text-gray-500 font-medium">
              연락처
            </div>
            <div className="text-gray-900">{phone}</div>
          </div>

          <div className="flex items-start">
            <div className="w-28 shrink-0 text-gray-500 font-medium">
              이메일
            </div>
            <div className="text-gray-900">{email}</div>
          </div>

          <div className="flex items-start">
            <div className="w-28 shrink-0 text-gray-500 font-medium">주소</div>
            <div className="text-gray-900">{address}</div>
          </div>

          <div className="flex items-start pt-2 border-t border-gray-100">
            <div className="w-28 shrink-0 text-gray-500 font-medium">
              보호소 소개
            </div>
            <div className="text-gray-900 leading-relaxed">{description}</div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="px-8 pb-8 pt-4 flex justify-end">
        <button
          onClick={handleDetailClick}
          className="px-8 py-3 bg-[#ff3b2f] hover:bg-red-400 cursor-pointer rounded-md text-white font-medium text-base transition-colors"
        >
          보호소 상세보기
        </button>
      </div>
    </div>
  );
};

export default ShelterDetail;
