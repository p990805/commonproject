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
    <div className="h-screen bg-white">
      {selectedRegion ? (
        // 지역이 선택된 경우: 지도(왼쪽) + 리스트(오른쪽)
        <div className="max-w-7xl mx-auto h-full flex py-8 px-6 gap-8">
          {/* 왼쪽 영역: 지도 */}
          <div className="w-1/2 flex flex-col">
            <div className="flex items-center gap-4 p-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedRegion}
              </h1>
              <button
                onClick={handleRegionUnselect}
                className="bg-gray-200 px-3 py-2 rounded-md text-sm"
              >
                선택 해제
              </button>
            </div>

            <div className="w-full h-full">
              <div className="scale-75 -ml-60">
                <RegionMap
                  selectedRegion={selectedRegion}
                  onRegionSelect={handleRegionSelect}
                />
              </div>
            </div>
          </div>

          {/* 오른쪽 영역: 보호소 리스트 */}
          <div className="w-2/3 h-[600px] shadow-lg rounded-2xl border border-gray-200 overflow-auto">
            <ShelterList regionName={selectedRegion} />
          </div>
        </div>
      ) : (
        // 지역이 선택되지 않은 경우: 지도만 표시
        <div className="max-w-7xl mx-auto h-full flex justify-start pt-8 px-6">
          <div className="w-2/3">
            <h1 className="text-2xl font-bold mb-4 ml-20 mt-6">
              지역을 선택하세요
            </h1>
            <div className="scale-75 ml-10">
              <RegionMap
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterFinder;
