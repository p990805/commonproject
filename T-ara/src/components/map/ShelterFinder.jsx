import React, { useState } from "react";
import RegionMap from "./RegionMap";
import ShelterList from "./ShelterList";

const ShelterFinder = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const handleRegionUnselect = () => {
    setSelectedRegion(null);
  };

  return (
    <div className="h-[900px] bg-white">
      {selectedRegion ? (
        // 지역이 선택된 경우: 지도(왼쪽) + 리스트(오른쪽)
        <div className="max-w-[1800px] mx-auto h-full flex py-12 px-8 gap-16">
          {/* 왼쪽 영역 */}
          <div className="shrink-0 flex flex-col mr-15">
            <div className="flex items-center gap-4 p-4 ml-25">
              <h1 className="text-4xl font-bold text-[#333333] text-center items-center">
                {selectedRegion}
              </h1>
              <button
                onClick={handleRegionUnselect}
                className="bg-gray-200 px-3 py-2 rounded-md text-sm"
              >
                선택 해제
              </button>
            </div>

            <div className="w-[640px] h-full mr-50 ml-0">
              <RegionMap
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
              />
            </div>
          </div>

          {/* 오른쪽 영역: 보호소 리스트 */}
          <div className="flex-1 shadow-sm rounded-2xl border border-[#00000014]">
            <ShelterList regionName={selectedRegion} />
          </div>
        </div>
      ) : (
        // 지역이 선택되지 않은 경우: 지도만 화면 중앙 → 왼쪽으로 조금 치우치게 배치
        <div className="max-w-[1800px] mx-auto h-full flex  justify-start pl-30 pt-30">
          <div className="w-[640px] h-full">
            <h1 className="text-4xl font-black">지역을 선택하세요</h1>
            <RegionMap
              selectedRegion={selectedRegion}
              onRegionSelect={handleRegionSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterFinder;
