import React from "react";
import Carousel from "../components/campaign/Carousel";
import CampaignCard from "../components/campaign/CampaignCard";

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const campaignData = [
  {
    id: 1,
    title: "불법 번식장에서 구조된 이름모를 강아지에게 입을 옷을 선물해주세요!",
    achievement: 3601,
    location: "광주 무슨무슨 보호소",
    amount: "1,800만 원",
    daysLeft: 11,
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  },
  {
    id: 2,
    title: "이름모를 강아지가 살을 찌울 수 있도록 맛있는 것을 선물해주세요!",
    achievement: 7649,
    location: "서울 보호소",
    amount: "3,824만 원",
    daysLeft: 18,
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  },
  {
    id: 3,
    title: "이름 모를 강아지가 깨끗한 물을 마실 수 있도록 후원해주세요!",
    achievement: 1790,
    location: "대심 보호소",
    amount: "895만 원",
    daysLeft: 6,
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  },
  {
    id: 4,
    title: "웁은 ft 개발자 육성소 ssfay 생들의 모금 캠페인 진행 중",
    achievement: 36835,
    location: "SSAFY",
    amount: "1.8억 원",
    daysLeft: 10,
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  },
];

const CampaignPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">캠페인 후원</h1>
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-md"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <Carousel />

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="border-b border-gray-200">
          <div className="px-4 flex justify-between items-center h-14">
            <div className="flex gap-8">
              <button className="text-gray-700 font-medium px-2 py-4 border-b-2 border-transparent hover:border-gray-300">
                전체
              </button>
              <button className="text-gray-700 font-medium px-2 py-4 border-b-2 border-transparent hover:border-gray-300">
                강아지
              </button>
              <button className="text-gray-700 font-medium px-2 py-4 border-b-2 border-transparent hover:border-gray-300">
                고양이
              </button>
              <button className="text-gray-700 font-medium px-2 py-4 border-b-2 border-transparent hover:border-gray-300">
                기타
              </button>
            </div>
            <select className="border border-gray-300 rounded px-3 py-2 text-sm">
              <option>지역 선택</option>
              <option>서울</option>
              <option>경기</option>
              <option>인천</option>
            </select>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {campaignData.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
