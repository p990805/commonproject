import React, { useState, useEffect } from "react";
import Carousel from "../components/campaign/Carousel";
import CampaignCard from "../components/campaign/CampaignCard";
import api from "../api";

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

const PaginationButton = ({ children, onClick, disabled, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 mx-1 rounded ${
      disabled
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : active
        ? "bg-blue-50 text-blue-600 border border-blue-300"
        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
    }`}
  >
    {children}
  </button>
);

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 16; // 4*4 grid와 동일하게 설정

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await api.get("/campaigns");

        const transformedData = data.map((campaign) => {
          const startDate = new Date(campaign.startedAt);
          const endDate = new Date(campaign.endedAt);
          const now = new Date();

          return {
            id: campaign.campaignId.toString(),
            title: campaign.title,
            imageUrl: campaign.imageUrl,
            shelterName: campaign.shelterName,
            targetAmount: campaign.targetAmount,
            achievedAmount: campaign.achievedAmount,
            startedAt: campaign.startedAt,
            endedAt: campaign.endedAt,
            donatePersonNum: campaign.donatePersonNum || 0,
            status: now >= startDate && now <= endDate ? "진행중" : "종료",
          };
        });

        setCampaigns(transformedData);
        applyFilters(transformedData, searchTerm, currentFilter);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError(error.message || "캠페인을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const applyFilters = (campaignsToFilter, search, filter) => {
    let filtered = campaignsToFilter;

    if (search) {
      filtered = filtered.filter((campaign) =>
        campaign.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "진행중") {
      filtered = filtered.filter((campaign) => campaign.status === "진행중");
    } else if (filter === "종료") {
      filtered = filtered.filter((campaign) => campaign.status === "종료");
    }

    setFilteredCampaigns(filtered);
    setCurrentPage(1); // 필터 변경시 첫 페이지로 이동
  };

  useEffect(() => {
    applyFilters(campaigns, searchTerm, currentFilter);
  }, [searchTerm, currentFilter, campaigns]);

  // 현재 페이지의 캠페인들을 가져오는 로직
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );
  const totalPages = Math.ceil(filteredCampaigns.length / campaignsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">캠페인 후원</h1>
          <div className="relative w-[400px]">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="캠페인 제목을 입력해주세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-md"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>

      <Carousel />

      <div className="max-w-7xl mx-auto mt-8">
        <div className="border-b border-gray-200">
          <div className="px-4 flex justify-between items-center h-14">
            <div className="flex gap-8">
              <button
                onClick={() => handleFilterChange("전체")}
                className={`text-gray-700 font-medium px-2 py-4 border-b-2 ${
                  currentFilter === "전체"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                전체
              </button>
              <button
                onClick={() => handleFilterChange("진행중")}
                className={`text-gray-700 font-medium px-2 py-4 border-b-2 ${
                  currentFilter === "진행중"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                진행중
              </button>
              <button
                onClick={() => handleFilterChange("종료")}
                className={`text-gray-700 font-medium px-2 py-4 border-b-2 ${
                  currentFilter === "종료"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                종료
              </button>
            </div>
          </div>
        </div>

        {(searchTerm || currentFilter !== "전체") && (
          <div className="px-4 py-4 text-gray-600">
            검색결과: {filteredCampaigns.length}건
          </div>
        )}

        <div className="px-4 py-8">
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {currentCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNumber
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
