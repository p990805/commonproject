import React, { useState, useEffect } from "react";
import ShelterDetail from "./ShelterDetail";

const ShelterList = ({ regionName }) => {
  const [selectedShelter, setSelectedShelter] = useState(null);

  useEffect(() => {
    setSelectedShelter(null);
  }, [regionName]);

  const shelterData = [
    {
      id: 1,
      city: "광주광역시",
      name: "광주동물보호센터",
      address: "광주광역시 북구 본촌마을길 25-1 (본촌동) 광주동물보호센터",
      registrationNumber: "62-613-6770121",
      phone: "062-764-3708",
      email: "gwangjuanimals@gmail.com",
      description:
        "동물보호법과 광주광역시 동물보호조례에 의하여 광주광역시에서 유기동물의 생명과 안전을 적정하게 보호,관리하여 생명 존중과 시민의 생명존중에 대한 정서함양에 이바지하기 위하여 설립되었습니다.",
    },
    {
      id: 2,
      city: "광주광역시",
      name: "광주동물보호센터",
      address: "광주광역시 북구 본촌마을길 25-1 (본촌동) 광주동물보호센터",
      registrationNumber: "62-613-6770121",
      phone: "062-764-3708",
      email: "gwangjuanimals@gmail.com",
      description:
        "동물보호법과 광주광역시 동물보호조례에 의하여 광주광역시에서 유기동물의 생명과 안전을 적정하게 보호,관리하여 생명 존중과 시민의 생명존중에 대한 정서함양에 이바지하기 위하여 설립되었습니다.",
    },
    // ... 추가 보호소 데이터
  ];

  if (selectedShelter) {
    return (
      <ShelterDetail
        shelter={selectedShelter}
        onClose={() => setSelectedShelter(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-8">
        <div className="mb-6">
          <div className="text-[#1a1a1a]/60 text-sm mb-1">보호소 찾기</div>
          <div className="text-[#1a1a1a] text-2xl font-bold">
            {regionName}지역 보호소
          </div>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div className="text-sm">
            전체 <span className="font-bold">102</span> 건
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="w-64 px-3 py-1.5 border border-gray-200 rounded text-sm"
            />
            <button className="px-4 py-1.5 border border-gray-200 rounded text-sm">
              검색
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8">
        <div className="divide-y divide-gray-100">
          {shelterData.map((shelter) => (
            <div
              key={shelter.id}
              className="py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedShelter(shelter)}
            >
              <div className="text-sm mb-1">{shelter.city}</div>
              <div className="text-sm mb-1">{shelter.name}</div>
              <div className="text-sm text-gray-600">{shelter.address}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 flex justify-center items-center border-t border-gray-100">
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-gray-400">
            «
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400">
            ‹
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#ff4326] text-white rounded">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600">
            3
          </button>
          <span className="w-8 h-8 flex items-center justify-center">...</span>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600">
            10
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400">
            ›
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400">
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShelterList;
