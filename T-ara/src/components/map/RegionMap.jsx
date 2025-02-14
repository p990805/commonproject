import React from "react";
import PropTypes from "prop-types";

const RegionMap = ({ selectedRegion = null, onRegionSelect = () => {} }) => {
  return (
    <div className="w-full h-full">
      {/* 선택된 지역이 없으면 안내 문구 출력 */}
      {!selectedRegion && (
        <h1 className="text-4xl font-bold mb-6 text-center">
          지역을 선택하세요.
        </h1>
      )}

      <div className="w-full h-full">
        <svg viewBox="200 100 500 700" className="w-full h-full">
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

          {/* 그룹에 shadow 필터와 흰색 테두리를 적용 */}
          <g filter="url(#shadow)" stroke="#FFFFFF" strokeWidth="2">
            {/* 서울 */}
            <path
              d="M360 240 L390 235 L400 255 L380 270 L360 260 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "서울"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("서울")}
              aria-label="서울"
            />

            {/* 경기도 */}
            <path
              d="M320 200 L420 180 L440 240 L410 280 L360 290 L330 270 L310 240 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "경기도"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("경기도")}
              aria-label="경기도"
            />

            {/* 인천 */}
            <path
              d="M340 240 L360 235 L365 250 L350 260 L340 255 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "인천"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("인천")}
              aria-label="인천"
            />

            {/* 강원도 */}
            <path
              d="M420 180 L570 150 L600 300 L520 350 L440 240 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "강원도"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("강원도")}
              aria-label="강원도"
            />

            {/* 충청북도 */}
            <path
              d="M410 280 L520 350 L500 450 L420 440 L390 400 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "충청북도"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("충청북도")}
              aria-label="충청북도"
            />

            {/* 충청남도 (대전/세종 포함) */}
            <path
              d="M310 320 L410 280 L390 400 L350 440 L300 400 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "충청남도"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("충청남도")}
              aria-label="충청남도"
            />

            {/* 전라북도 */}
            <path
              d="M300 400 L420 440 L400 520 L320 500 L280 460 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "전라북도"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("전라북도")}
              aria-label="전라북도"
            />

            {/* 전라남도 / 광주 */}
            <path
              d="M280 460 L400 520 L380 650 L220 600 L240 500 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "광주/전남"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("광주/전남")}
              aria-label="광주/전남"
            />

            {/* 대구 / 경북 */}
            <path
              d="M520 350 L600 300 L620 450 L540 520 L500 450 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "대구/경북"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("대구/경북")}
              aria-label="대구/경북"
            />

            {/* 부산/경남 */}
            <path
              d="M400 520 L540 520 L560 600 L440 650 L380 650 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "부산/경남"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("부산/경남")}
              aria-label="부산/경남"
            />

            {/* 제주 */}
            <path
              d="M260 750 L340 750 L340 780 L260 780 Z"
              className={`cursor-pointer transition-transform duration-300 ${
                selectedRegion === "제주"
                  ? "fill-[#FFCC80] scale-105"
                  : "fill-[#E0E0E0] hover:fill-[#FFCC80] hover:scale-105"
              }`}
              onClick={() => onRegionSelect("제주")}
              aria-label="제주"
            />
          </g>

          {/* SVG 하단에 각 지역 이름 텍스트 */}
          <g className="text-[15px] fill-[#999999] font-bold">
            <text x="370" y="255">서울</text>
            <text x="370" y="230">경기</text>
            <text x="370" y="250">인천</text>
            <text x="510" y="250">강원</text>
            <text x="450" y="400">충북</text>
            <text x="330" y="380">대전/충남/세종</text>
            <text x="340" y="470">전북</text>
            <text x="300" y="550">광주/전남</text>
            <text x="550" y="420">대구/경북</text>
            <text x="460" y="580">부산/울산/경남</text>
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
