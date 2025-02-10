import React, { useState, useEffect } from "react";

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

const ShelterDetail = ({ shelter, onClose }) => {
  return (
    <div className="flex flex-col h-full relative">
      <button
        onClick={onClose}
        className="absolute right-8 top-8 text-gray-400 hover:text-gray-600"
      >
        <CloseIcon />
      </button>

      <div className="p-8">
        <div className="mb-8">
          <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
            광주 / 전남지역 보호소
          </div>
          <div className="text-[#1a1a1a] text-[39.90px] font-bold leading-[59.85px]">
            {shelter.name}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              고유번호 62-613-6770121
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              연락처 062-613-6770
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              이메일 gwangjuanimals@gmail.com
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              주소 {shelter.address}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              보호소 소개
            </div>
            <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
              동물보호법과 광주광역시 동물보호조례에 의하여 광주광역시에서 유기
              <br />
              동물의 생명과 안전을 적정하게 보호,관리하여 생명 존중과 시민의
              생명
              <br />
              존중에 대한 정서함양에 이바지하기 위하여 설립되었습니다.
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <div className="p-8">
        <button className="w-[249px] h-[65px] bg-[#ff4326] rounded text-white text-xl font-bold">
          보호소 상세보기
        </button>
      </div>
    </div>
  );
};

export default ShelterDetail;
