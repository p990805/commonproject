import React, { useState } from "react";
import RegionMap from "./RegionMap";
import ShelterList from "./ShelterList";

const ShelterFinder = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1800px] mx-auto">
        {selectedRegion ? (
          <div className="flex py-12 px-16 gap-16">
            <div>
              <h1 className="text-4xl font-bold text-[#333333] mb-8">
                {selectedRegion}
              </h1>
              <div className="w-[640px] h-[784px]">
                <RegionMap
                  selectedRegion={selectedRegion}
                  onRegionSelect={handleRegionSelect}
                />
              </div>
            </div>
            <div className="flex-1 shadow-sm rounded-2xl border border-[#00000014]">
              <ShelterList regionName={selectedRegion} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-[640px]">
              <RegionMap onRegionSelect={handleRegionSelect} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelterFinder;
