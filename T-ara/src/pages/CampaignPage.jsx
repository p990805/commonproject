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

  // 페이징 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await api.get("/campaigns");

        const transformedData = data.map((campaign, index) => {
          const startDate = new Date(campaign.startedAt);
          const endDate = new Date(campaign.endedAt);
          const now = new Date();

          return {
            id: index + 1,
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // 필터링 로직 통합
  const applyFilters = (campaignsToFilter, search, filter) => {
    let filtered = campaignsToFilter;

    // 검색어 필터링
    if (search) {
      filtered = filtered.filter((campaign) =>
        campaign.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 상태 필터링
    if (filter === "진행중") {
      filtered = filtered.filter((campaign) => campaign.status === "진행중");
    } else if (filter === "종료") {
      filtered = filtered.filter((campaign) => campaign.status === "종료");
    }

    setFilteredCampaigns(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  // 검색어 변경 시 필터링
  useEffect(() => {
    applyFilters(campaigns, searchTerm, currentFilter);
  }, [searchTerm, currentFilter, campaigns]);

  // 현재 페이지의 캠페인만 반환
  const getCurrentPageCampaigns = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCampaigns.slice(startIndex, endIndex);
  };

  // 검색어 입력 핸들러
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 페이지네이션 렌더링
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </PaginationButton>

        {startPage > 1 && (
          <>
            <PaginationButton
              onClick={() => handlePageChange(1)}
              active={currentPage === 1}
            >
              1
            </PaginationButton>
            {startPage > 2 && <span className="mx-2">...</span>}
          </>
        )}

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => (
          <PaginationButton
            key={page}
            onClick={() => handlePageChange(page)}
            active={currentPage === page}
          >
            {page}
          </PaginationButton>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="mx-2">...</span>}
            <PaginationButton
              onClick={() => handlePageChange(totalPages)}
              active={currentPage === totalPages}
            >
              {totalPages}
            </PaginationButton>
          </>
        )}

        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </PaginationButton>
      </div>
    );
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
      {/* Header */}
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

      {/* Carousel Section */}
      <Carousel />

      {/* Filter Section */}
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

        {/* Search Results Info */}
        {(searchTerm || currentFilter !== "전체") && (
          <div className="px-4 py-4 text-gray-600">
            검색결과: {filteredCampaigns.length}건
          </div>
        )}

        {/* Campaign Cards Grid */}
        <div className="px-4 py-8">
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {getCurrentPageCampaigns().map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredCampaigns.length > 0 && renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
