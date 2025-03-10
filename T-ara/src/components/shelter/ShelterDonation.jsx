import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import SidebarNavigation from "./SidebarNavigation";
import DonationDetailModal from "./DonationDetailModal";

const ShelterDonation = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  // 검색 상태 추가
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return "0";
    const numAmount = Number(amount);
    if (isNaN(numAmount)) return "0";
    return numAmount.toLocaleString("ko-KR");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("ko-KR");
  };

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const donationsResponse = await api.get("/analyze/list");
      const donationsList = donationsResponse.data.donationHistoryList || [];
      setDonations(donationsList);
      setFilteredDonations(donationsList);
    } catch (error) {
      console.error("후원 데이터 조회 오류:", error);
      toast.error("후원 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      // 기간 필터 (yyyy-mm-dd 형식)
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      // 후원 종류 필터 (general/monthly)
      if (searchType === "donationCategory" && searchKeyword) {
        queryParams.append("donationCategory", searchKeyword);
      }

      // 후원 대상 종류 필터 (animal/shelter)
      if (searchType === "relationalCategory" && searchKeyword) {
        queryParams.append("dataSource", searchKeyword); // relationalCategory -> dataSource로 변경
      }

      // 후원 대상명 검색
      if (searchType === "relationalName" && searchKeyword) {
        queryParams.append("relationalName", searchKeyword); // keyword -> relationalName으로 변경
      }

      const donationsResponse = await api.get(
        `/analyze/list?${queryParams.toString()}`
      );

      const donationsList = donationsResponse.data.donationHistoryList || [];
      setDonations(donationsList);
      setFilteredDonations(donationsList);
    } catch (error) {
      console.error("후원 데이터 조회 오류:", error);
      toast.error("후원 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredDonations.map((item) => item.donationHistoryId));
    } else {
      setSelectedItems([]);
    }
  };

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
          <div className="mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              후원금 대시보드
            </h1>
          </div>
          {/* Dashboard Stats */}
          <div className="w-full h-[130px] relative bg-gradient-to-r from-[#5e9dfc] via-[#6085ef] to-[#5c6efe] rounded-[10px] shadow-[3px_3px_10px_0px_rgba(151,152,159,0.25)] flex items-center justify-between px-16 mb-12">
            {/* Today's Donation Amount */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                오늘 후원받은 금액
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">
                  {formatAmount(
                    donations.reduce((sum, donation) => {
                      const donationDate = new Date(
                        donation.createdAt
                      ).toLocaleDateString();
                      const today = new Date().toLocaleDateString();
                      if (donationDate === today) {
                        return sum + Number(donation.donationAmount);
                      }
                      return sum;
                    }, 0)
                  )}
                </span>
                <span className="!text-white/70 text-lg ml-2">원</span>
              </div>
            </div>

            {/* Total Donation Amount */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                총 후원받은 금액
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">
                  {formatAmount(
                    donations.reduce(
                      (sum, donation) => sum + Number(donation.donationAmount),
                      0
                    )
                  )}
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
                <span className="!text-white text-[32px] font-bold">
                  {
                    donations.filter((donation) => {
                      const donationDate = new Date(
                        donation.createdAt
                      ).toLocaleDateString();
                      const today = new Date().toLocaleDateString();
                      return donationDate === today;
                    }).length
                  }
                </span>
                <span className="!text-white/70 text-lg ml-2">명</span>
              </div>
            </div>

            {/* Total Donor Count */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                전체 후원자 수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">
                  {donations.length}
                </span>
                <span className="!text-white/70 text-lg ml-2">명</span>
              </div>
            </div>
          </div>

          {/* 검색 필터 */}
          <div className="w-full bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7 mb-12">
            <div className="border border-[#dee1e8]">
              {/* 기간 필터 */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal">
                    기간
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex items-center ml-5">
                    <input
                      type="date"
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="mx-4 !text-[#575757]">-</span>
                    <input
                      type="date"
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* 후원 종류 필터 */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal">
                    후원 종류
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex items-center ml-5">
                    <select
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      value={
                        searchType === "donationCategory" ? searchKeyword : ""
                      }
                      onChange={(e) => {
                        setSearchType("donationCategory");
                        setSearchKeyword(e.target.value);
                      }}
                    >
                      <option value="">전체</option>
                      <option value="general">일반 후원</option>
                      <option value="monthly">정기 후원</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 후원 대상 종류 */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal">
                    후원 대상 종류
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex items-center ml-5">
                    <select
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      value={
                        searchType === "relationalCategory" ? searchKeyword : ""
                      }
                      onChange={(e) => {
                        setSearchType("relationalCategory");
                        setSearchKeyword(e.target.value);
                      }}
                    >
                      <option value="">전체</option>
                      <option value="animal">동물</option>
                      <option value="shelter">보호소</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 후원자명 검색 */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal">
                    후원대상명
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex items-center ml-5">
                    <input
                      type="text"
                      className="w-64 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      value={
                        searchType === "relationalName" ? searchKeyword : ""
                      }
                      onChange={(e) => {
                        setSearchType("relationalName");
                        setSearchKeyword(e.target.value);
                      }}
                      placeholder="후원대상명을 입력하세요"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 검색 버튼 */}
            <div className="flex justify-center mt-5">
              <button
                onClick={handleSearch}
                className="w-[68px] h-[33px] bg-[#191919] text-white text-xs font-normal hover:bg-[#666]"
              >
                검색
              </button>
            </div>
          </div>

          {/* 후원 목록 제목 */}
          <div className="!text-[#191919] text-lg font-bold leading-tight mb-6">
            후원 전체 목록
          </div>

          {/* 후원 목록 테이블 */}
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
                    <th className="w-[10%] p-4 text-left">후원 번호</th>
                    <th className="w-[12%] p-4 text-left">후원자 닉네임</th>
                    <th className="w-[10%] p-4 text-left">회원 번호</th>
                    <th className="w-[12%] p-4 text-left">후원 종류</th>
                    <th className="w-[12%] p-4 text-left">후원 대상</th>
                    <th className="w-[12%] p-4 text-left">후원 금액</th>
                    <th className="w-[14%] p-4 text-left">후원 일시</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        로딩중...
                      </td>
                    </tr>
                  ) : filteredDonations.length > 0 ? (
                    filteredDonations.map((donation) => (
                      <tr key={donation.donationHistoryId} className="border-b">
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(
                              donation.donationHistoryId
                            )}
                            onChange={() =>
                              handleSelectItem(donation.donationHistoryId)
                            }
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDonationClick(donation)}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {donation.donationHistoryId}
                          </button>
                        </td>
                        <td className="p-4">{donation.userName || "-"}</td>
                        <td className="p-4">{donation.userId || "-"}</td>
                        <td className="p-4">
                          {donation.donationCategory === "general"
                            ? "일반 후원"
                            : donation.donationCategory === "monthly"
                            ? "정기 후원"
                            : donation.donationCategory === "campaign"
                            ? "캠페인 후원"
                            : "-"}
                        </td>
                        <td className="p-4">
                          {donation.relationalName || "-"}
                        </td>
                        <td className="p-4">
                          {formatAmount(donation.donationAmount)}원
                        </td>
                        <td className="p-4">
                          {formatDate(donation.createdAt) || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        후원 내역이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* 상세 모달 */}
      {selectedDonation && (
        <DonationDetailModal
          donation={selectedDonation}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedDonation(null);
          }}
          formatAmount={formatAmount} // formatAmount 함수를 props로 전달
        />
      )}
    </div>
  );
};

export default ShelterDonation;
