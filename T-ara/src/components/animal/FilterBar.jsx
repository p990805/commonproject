import React, { useState, useEffect } from "react";
import api from "../../api"; // 백엔드 API 호출을 위한 axios 인스턴스

const FilterBar = ({
  region,
  setRegion,
  shelter,
  setShelter,
  species,
  setSpecies,
  sortOrder,
  setSortOrder,
}) => {
  const [shelterOptions, setShelterOptions] = useState([]);

  // 지역(region)이 변경되면 해당 지역의 보호소 목록을 불러옵니다.
  useEffect(() => {
    if (region !== "all") {
      api
        .get(`/shelter/namelist/${region}`)
        .then((response) => {
          // 응답 데이터의 shelterList를 상태에 저장합니다.
          setShelterOptions(response.data.shelterList);
        })
        .catch((error) => {
          console.error("Error fetching shelter list:", error);
          setShelterOptions([]);
        });
    } else {
      setShelterOptions([]);
    }
  }, [region]);

  // 지역 변경 시 보호소 선택값은 초기화("all") 처리
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setShelter("all");
  };

  return (
    <div className="relative border-y border-gray-200 py-3">
      {/* 상단을 flex로 양쪽 정렬 */}
      <div className="flex justify-between items-center">
        {/* 필터 영역 */}
        <div className="grid grid-cols-12 gap-4 text-sm text-gray-500 items-center">
          {/* 지역 필터 */}
          <div className="col-span-2">
            <select
              value={region}
              onChange={handleRegionChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="all">지역 선택</option>
              <option value="1">서울</option>
              <option value="2">경기</option>
              <option value="3">인천</option>
              <option value="4">강원</option>
              <option value="5">충북</option>
              <option value="6">대전/충남/세종</option>
              <option value="7">대구/경북</option>
              <option value="8">전북</option>
              <option value="9">광주/전남</option>
              <option value="10">부산/울산/경남</option>
              <option value="11">제주</option>
            </select>
          </div>
          {/* 보호소 필터 */}
          <div className="col-span-2">
            <select
              value={shelter}
              onChange={(e) => setShelter(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
              disabled={region === "all"}
            >
              <option value="all">
                {region !== "all" ? "보호소 선택" : "지역 선택 후 선택"}
              </option>
              {region !== "all" &&
                shelterOptions.map((option) => (
                  <option key={option.shelterId} value={option.shelterId}>
                    {option.shelterName}
                  </option>
                ))}
            </select>
          </div>
          {/* 종 필터 */}
          <div className="col-span-2">
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="all">종 선택</option>
              <option value="1">강아지</option>
              <option value="2">고양이</option>
              <option value="3">새</option>
              <option value="4">토끼</option>
              <option value="5">햄스터</option>
              <option value="6">기니피그</option>
              <option value="7">페럿</option>
              <option value="8">거북이</option>
              <option value="9">뱀</option>
              <option value="10">이구아나</option>
            </select>
          </div>
        </div>
        {/* 정렬 버튼 영역 */}
        <div className="flex space-x-4 text-sm text-gray-500">
          <button
            onClick={() => setSortOrder("newest")}
            className={`cursor-pointer hover:underline ${
              sortOrder === "newest" ? "font-bold" : ""
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={`cursor-pointer hover:underline ${
              sortOrder === "oldest" ? "font-bold" : ""
            }`}
          >
            오래된순
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
