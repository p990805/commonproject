import React from "react";
import PropTypes from "prop-types";

const RegionMap = ({ selectedRegion = null, onRegionSelect = () => {} }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mt-8 mb-4 text-center">
        지역을 선택하세요
      </h1>
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        <svg viewBox="0 0 800 800" className="w-full h-auto">
          {/* 드롭 섀도우 필터 */}
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="4"
                floodColor="#000"
                floodOpacity="0.2"
              />
            </filter>
          </defs>
          <g filter="url(#shadow)" stroke="#FFFFFF" strokeWidth="2">
            {/* 서울 */}
            <path
              d="M360 240 L390 235 L400 255 L380 270 L360 260 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "서울"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("서울")}
              aria-label="서울"
            />

            {/* 경기도 */}
            <path
              d="M320 200 L420 180 L440 240 L410 280 L360 290 L330 270 L310 240 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "경기도"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("경기도")}
              aria-label="경기도"
            />

            {/* 인천 */}
            <path
              d="M340 240 L360 235 L365 250 L350 260 L340 255 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "인천"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("인천")}
              aria-label="인천"
            />

            {/* 강원도 */}
            <path
              d="M420 180 L570 150 L600 300 L520 350 L440 240 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "강원도"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("강원도")}
              aria-label="강원도"
            />

            {/* 충청북도 */}
            <path
              d="M410 280 L520 350 L500 450 L420 440 L390 400 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "충청북도"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("충청북도")}
              aria-label="충청북도"
            />

            {/* 충청남도 */}
            <path
              d="M310 320 L410 280 L390 400 L350 440 L300 400 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "충청남도"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("충청남도")}
              aria-label="충청남도"
            />

            {/* 전라북도 */}
            <path
              d="M300 400 L420 440 L400 520 L320 500 L280 460 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "전라북도"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("전라북도")}
              aria-label="전라북도"
            />

            {/* 전라남도 / 광주 */}
            <path
              d="M280 460 L400 520 L380 650 L220 600 L240 500 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "광주/전남"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("광주/전남")}
              aria-label="광주/전남"
            />

            {/* 경상북도 / 대구 */}
            <path
              d="M520 350 L600 300 L620 450 L540 520 L500 450 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "대구/경북"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("대구/경북")}
              aria-label="대구/경북"
            />

            {/* 경상남도 / 부산/울산 */}
            <path
              d="M400 520 L540 520 L560 600 L440 650 L380 650 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "부산/울산/경남"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("부산/울산/경남")}
              aria-label="부산/울산/경남"
            />

            {/* 제주 */}
            <path
              d="M260 750 L340 750 L340 780 L260 780 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "제주"
                  ? "fill-[#FEE392] scale-105"
                  : "fill-[#F5F5F5] hover:fill-[#FEE392] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("제주")}
              aria-label="제주"
            />
          </g>

          {/* 지역 이름 (필요에 따라 위치, 스타일 수정 가능) */}
          <g className="text-xs fill-gray-700 font-medium">
            <text x="370" y="255">서울</text>
            <text x="370" y="230">경기</text>
            <text x="370" y="250">인천</text>
            <text x="510" y="250">강원</text>
            <text x="450" y="400">충북</text>
            <text x="330" y="380">충남</text>
            <text x="340" y="470">전북</text>
            <text x="300" y="550">전남</text>
            <text x="550" y="420">경북</text>
            <text x="460" y="580">경남</text>
            <text x="290" y="770">제주</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

RegionMap.propTypes = {
  selectedRegion: PropTypes.string,
  onRegionSelect: PropTypes.func,
};

export default RegionMap;
