import React, { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";

const ShelterCampaign = () => {
  // 체크된 항목들을 관리하는 상태
  const [selectedItems, setSelectedItems] = useState([]);
  // 임시 데이터 (나중에 DB에서 가져올 데이터)
  const [donations] = useState([
    {
      id: 1,
      category: "병원비",
      amount: 150000,
      useDate: "2024-02-11",
      registerDate: "2024-02-11 14:30",
      place: "동물병원",
      receipt: "있음",
      shelter: "싸피보호소",
    },
    {
      id: 2,
      category: "사료비",
      amount: 200000,
      useDate: "2024-02-10",
      registerDate: "2024-02-10 15:20",
      place: "펫샵",
      receipt: "있음",
      shelter: "싸피보호소",
    },
  ]);

  // 전체 선택/해제 핸들러
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(donations.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  // 개별 항목 선택/해제 핸들러
  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              캠페인 후원 대시보드
            </h1>
            <button
              onClick={() =>
                (window.location.href = "/shelter/campaign-register")
              }
              className="flex items-center justify-center px-5 h-10 bg-[#2f69dd] text-white text-sm font-medium rounded hover:bg-[#1e51b8] transition-colors"
            >
              캠페인 후원 등록하기
            </button>
          </div>
          {/* Dashboard Stats */}
          <div className="w-full h-[130px] relative bg-gradient-to-r from-[#5e9dfc] via-[#6085ef] to-[#5c6efe] rounded-[10px] shadow-[3px_3px_10px_0px_rgba(151,152,159,0.25)] flex items-center justify-between px-16 mb-12">
            {/* Today's Donation Amount */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                오늘 사용한 금액
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">
                  503,165
                </span>
                <span className="!text-white/70 text-lg ml-2">원</span>
              </div>
            </div>

            {/* Total Donation Amount */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                총 사용한 금액
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">
                  623,503,165
                </span>
                <span className="!text-white/70 text-lg ml-2">원</span>
              </div>
            </div>

            {/* Today's Donor Count */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                오늘 후원자 수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">15</span>
                <span className="!text-white/70 text-lg ml-2">명</span>
              </div>
            </div>

            {/* Total Donor Count */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                전체 후원자 수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">255</span>
                <span className="!text-white/70 text-lg ml-2">명</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7 mb-12">
            <div className="border border-[#dee1e8]">
              {/* Period Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    기간
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex items-center ml-5">
                    <input
                      type="date"
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      defaultValue="2024-10-23"
                    />
                    <span className="mx-4 !text-[#575757]">-</span>
                    <input
                      type="date"
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      defaultValue="2025-01-23"
                    />
                  </div>
                </div>
              </div>

              {/* Search Keyword */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    검색 키워드
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex gap-4 ml-5">
                    <select className="w-24 h-7 px-3 bg-white border border-[#cccccc] text-[#575757] text-xs">
                      <option>전체</option>
                    </select>
                    <input
                      type="text"
                      className="w-64 h-7 px-3 bg-white border border-[#cccccc]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-5">
              <button className="w-[68px] h-[33px] bg-[#191919] text-white text-xs font-normal font-['Roboto'] hover:bg-[#666]">
                검색
              </button>
            </div>
          </div>
          {/* Donation List Title */}
          <div className="!text-[#191919] text-lg font-bold font-['Roboto'] leading-tight mb-6">
            후원금 사용 전체 목록
          </div>

          {/* Donation List Table */}
          <div className="w-full bg-white shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-6">
            {/* List Header */}
            <div className="px-3 py-3 border-b border-[#dee1e8]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="!text-[#191919] text-[15px] font-semibold">
                    [
                  </span>
                  <div className="mx-1">
                    <span className="!text-[#191919] text-sm font-semibold">
                      {selectedItems.length > 0
                        ? `${selectedItems.length}개의 항목 선택됨`
                        : `전체 항목 총 ${donations.length}건`}
                    </span>
                  </div>
                  <span className="!text-[#191919] text-[15px] font-semibold">
                    ]
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  {selectedItems.length > 0 && (
                    <div className="flex gap-2">
                      {selectedItems.length === 1 && (
                        <button className="px-4 py-1.5 bg-blue-500 text-white rounded text-xs">
                          수정
                        </button>
                      )}
                      <button className="px-4 py-1.5 bg-red-500 text-white rounded text-xs">
                        삭제
                      </button>
                    </div>
                  )}
                  <select className="w-[131px] h-7 px-3 border border-[#cccccc] !text-[#191919] text-xs">
                    <option>최신순</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table Container with margin */}
            <div className="mx-4 my-4">
              {/* Table Header */}
              <div className="w-full bg-[#f0f3fc] border-t border-[#dee1e8]">
                <div className="flex">
                  <div className="w-[4%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[10.31px] font-medium text-center flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-[#767676] rounded-sm"
                      checked={selectedItems.length === donations.length}
                      onChange={handleSelectAll}
                    />
                  </div>
                  <div className="w-[10%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    캠페인 후원 번호
                  </div>
                  <div className="w-[20%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    제목
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    목표금액
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    달성금액
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    시작일시
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    마감일시
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    달성상태
                  </div>
                  <div className="w-[14%] p-4 border-r border-[#dee1e8] !text-[#191919] text-[13px] font-medium text-center">
                    담당 보호소
                  </div>
                </div>
              </div>
              {/* 테이블 본문 */}
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex border-b border-[#dee1e8]"
                >
                  <div className="w-[4%] p-4 border-r border-[#dee1e8] flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-[#767676] rounded-sm"
                      checked={selectedItems.includes(donation.id)}
                      onChange={() => handleSelectItem(donation.id)}
                    />
                  </div>
                  <div className="w-[10%] p-4 border-r border-[#dee1e8] text-center">
                    {donation.id}
                  </div>
                  <div className="w-[20%] p-4 border-r border-[#dee1e8] text-center">
                    {donation.category}
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] text-center">
                    {donation.amount.toLocaleString()}원
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] text-center">
                    {donation.useDate}
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] text-center">
                    {donation.registerDate}
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] text-center">
                    {donation.place}
                  </div>
                  <div className="w-[12%] p-4 border-r border-[#dee1e8] text-center">
                    {donation.receipt}
                  </div>
                  <div className="w-[14%] p-4 border-r border-[#dee1e8] text-center">
                    {donation.shelter}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterCampaign;
