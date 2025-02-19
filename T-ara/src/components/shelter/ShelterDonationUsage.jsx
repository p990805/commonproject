import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavigation from "./SidebarNavigation";
import api from "../../api";
import DonationUsageModal from "./DonationUsageModal";

const ShelterDonationUsage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shelter/usage-register`);
  };

  // 체크된 항목들을 관리하는 상태
  const [selectedItems, setSelectedItems] = useState([]);
  // API로부터 가져온 후원금 사용 데이터
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 데이터 불러오기
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await api.get("/shelter/donation/expense/list");
        setDonations(response.data);
      } catch (error) {
        console.error("후원금 사용 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchDonations();
  }, []);

  // 전체 선택/해제 핸들러
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(donations.map((item) => item.expenseId));
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

  const handleDonationClick = (donation) => {
    setSelectedDonation(donation);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mx-4">
          {/* Dashboard Title */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              후원금 사용 대시보드
            </h1>
            <button
              onClick={handleClick}
              className="flex items-center justify-center px-5 h-10 bg-[#235fd9] text-white text-sm font-medium rounded hover:bg-[#1e51b8] transition-colors"
            >
              후원금 사용 등록하기
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

          {/* Search Filters */}
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

              {/* Category Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    사용 카테고리
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex gap-4 ml-5">
                    <select className="w-24 h-7 px-3 bg-white border border-[#cccccc] text-[#575757] text-xs">
                      <option>전체</option>
                    </select>
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

          {/* 테이블 */}
          <div className="w-full bg-white shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-6">
            {/* 리스트 헤더 */}
            <div className="px-3 py-3 border-b border-[#dee1e8]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="!text-[#191919] text-[15px] font-semibold">
                    [
                    {selectedItems.length > 0
                      ? `${selectedItems.length}개의 항목 선택됨`
                      : `전체 항목 총 ${donations.length}건`}
                    ]
                  </span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f0f3fc]">
                  <tr>
                    <th className="w-[4%] p-4 text-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.length === donations.length &&
                          donations.length > 0
                        }
                        onChange={handleSelectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="w-[10%] p-4 text-left">사용 번호</th>
                    <th className="w-[15%] p-4 text-left">사용 카테고리</th>
                    <th className="w-[15%] p-4 text-left">사용 금액</th>
                    <th className="w-[15%] p-4 text-left">사용 일자</th>
                    <th className="w-[40%] p-4 text-left">사용처</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.expenseId} className="border-b">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(donation.expenseId)}
                          onChange={() => handleSelectItem(donation.expenseId)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDonationClick(donation)}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {donation.expenseId}
                        </button>
                      </td>
                      <td className="p-4">{donation.categoryName}</td>
                      <td className="p-4">
                        {donation.amount.toLocaleString()}원
                      </td>
                      <td className="p-4">{donation.expenseDate}</td>
                      <td className="p-4">{donation.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 모달 */}
      {selectedDonation && (
        <DonationUsageModal
          donation={selectedDonation}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedDonation(null);
          }}
        />
      )}
    </div>
  );
};

export default ShelterDonationUsage;
