import React, { useState } from "react";
import RegionMap from "./RegionMap";
import ShelterList from "./ShelterList";

const ShelterFinder = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1">
        <div className="container mx-auto px-4">
          {selectedRegion ? (
            <div className="flex px-16 py-8">
              <div className="w-[600px]">
                <RegionMap
                  selectedRegion={selectedRegion}
                  onRegionSelect={handleRegionSelect}
                />
              </div>
              <div className="w-2/3">
                <ShelterList regionName={selectedRegion} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <div className="w-[600px]">
                <RegionMap onRegionSelect={handleRegionSelect} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterFinder;
