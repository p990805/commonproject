import React from "react";

const ShelterList = ({ regionName }) => {
  const shelterData = [
    {
      city: "광주광역시",
      name: "광주동물보호센터",
      address: "광주광역시 북구 본촌마을길 25-1 (본촌동) 광주동물보호센터",
    },
    {
      city: "광주광역시",
      name: "광주동물보호센터",
      address: "광주광역시 북구 본촌마을길 25-1 (본촌동) 광주동물보호센터",
    },
    {
      city: "광주광역시",
      name: "광주동물보호센터",
      address: "광주광역시 북구 본촌마을길 25-1 (본촌동) 광주동물보호센터",
    },
    {
      city: "광주광역시",
      name: "광주동물보호센터",
      address: "광주광역시 북구 본촌마을길 25-1 (본촌동) 광주동물보호센터",
    },
  ];

  return (
    <div className="w-full h-[830px] bg-white rounded-3xl border border-[#1a1a1a]/10 overflow-hidden">
      <div className="p-8">
        <div className="mb-8">
          <div className="text-[#1a1a1a]/60 text-[22.80px] font-bold leading-[34.20px]">
            보호소 찾기
          </div>
          <div className="text-[#1a1a1a] text-[39.90px] font-bold leading-[59.85px]">
            {regionName}지역 보호소
          </div>
        </div>

        <div className="border-b border-black pb-5 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[#1a202c] text-base font-normal">
                전체{" "}
              </span>
              <span className="text-[#1a202c] text-base font-bold">102</span>
              <span className="text-[#1a202c] text-base font-normal"> 건</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="검색어를 입력해주세요"
                className="w-[300px] h-10 px-3 bg-white rounded border border-[#cbcfd2] text-base"
              />
              <button className="w-20 h-10 px-4 py-2.5 bg-white rounded border border-[#cfd4dc] text-[#344053] text-sm font-medium">
                검색
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {shelterData.map((shelter, index) => (
            <div key={index} className="border-b border-[#999999] py-7">
              <div className="text-[#1a202c] text-sm leading-[21px] mb-2">
                {shelter.city}
              </div>
              <div className="text-[#1a202c] text-sm leading-[21px] mb-2">
                {shelter.name}
              </div>
              <div className="text-[#1a202c] text-sm leading-[21px]">
                {shelter.address}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-1">
          {["<<", "<", "1", "2", "3", "...", "10", ">", ">>"].map(
            (item, index) => (
              <button
                key={index}
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  item === "1"
                    ? "bg-[#ff4326] text-white"
                    : "border border-[#f1f1f1] text-[#333333]"
                } ${item === "..." ? "border-none" : ""}`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterList;
