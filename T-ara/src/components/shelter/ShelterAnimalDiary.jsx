import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavigation from "./SidebarNavigation";
import EditDiaryModal from "./EditDiaryModal";
import api from "../../api";

const ShelterAnimalDiary = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [animals, setAnimals] = useState([]);

  // Search filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [animalId, setAnimalId] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const handleClick = () => {
    navigate("/shelter/diary-register");
  };

  const handleDiaryClick = (diary) => {
    setSelectedDiary(diary);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    fetchDiaries();
  };

  const fetchAnimals = async () => {
    try {
      const response = await api.get("/diary/shelter/list");
      if (response.data && response.data.animalList) {
        setAnimals(response.data.animalList);
      }
    } catch (error) {
      console.error("Failed to fetch animals:", error);
    }
  };

  const fetchDiaries = useCallback(async () => {
    try {
      const params = {
        animalId: animalId === "all" ? null : animalId,
        startDate: startDate || "1900-01-01",
        endDate: endDate || "2999-12-31",
        page: currentPage,
        size: itemsPerPage,
        deleteStatus: 1, // Only fetch non-deleted diaries
      };

      const response = await api.get("/diary/shelter/list", { params });

      if (response.data) {
        setDiaries(response.data.diaryList || []);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error("Failed to fetch diaries:", error);
      setDiaries([]);
    }
  }, [animalId, startDate, endDate, currentPage]);

  useEffect(() => {
    fetchDiaries();
    fetchAnimals();
  }, [fetchDiaries]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDiaries();
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allDiaryIds = diaries.map((diary) => diary.diaryId);
      setSelectedItems(allDiaryIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedItems.map((diaryId) => api.get(`/diary/delete/${diaryId}`))
      );
      fetchDiaries();
      setSelectedItems([]);
      alert("선택된 일지가 삭제되었습니다.");
    } catch (error) {
      console.error("Failed to delete diaries:", error);
      alert("일지 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />
      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              동물 일지 관리
            </h1>
            <button
              onClick={handleClick}
              className="flex items-center justify-center px-5 h-10 bg-[#235fd9] text-white text-sm font-medium rounded hover:bg-[#1e51b8] transition-colors"
            >
              동물일지 작성하기
            </button>
          </div>

          {/* Search Filters */}
          <div className="w-full bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7 mb-12">
            <div className="border border-[#dee1e8]">
              {/* Period Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    작성 기간
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

              {/* Animal Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    동물 선택
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex gap-4 ml-5">
                    <select
                      value={animalId}
                      onChange={(e) => setAnimalId(e.target.value)}
                      className="w-64 h-7 px-3 bg-white border border-[#cccccc] text-[#191919] text-xs"
                    >
                      <option value="all">전체</option>
                      {animals.map((animal) => (
                        <option key={animal.animalId} value={animal.animalId}>
                          {animal.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-5">
              <button
                onClick={handleSearch}
                className="w-[68px] h-[33px] bg-[#191919] text-white text-xs font-normal font-['Roboto'] hover:bg-[#666]"
              >
                검색
              </button>
            </div>
          </div>

          {/* Diary List */}
          <div className="w-full bg-white shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-6">
            {/* List Header */}
            <div className="px-3 py-3 border-b border-[#dee1e8]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="!text-[#191919] text-[15px] font-semibold">
                    [
                    {selectedItems.length > 0
                      ? `${selectedItems.length}개의 항목 선택됨`
                      : `전체 항목 총 ${diaries.length}건`}
                    ]
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  {selectedItems.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="px-4 py-1.5 bg-red-500 text-white rounded text-xs"
                    >
                      삭제
                    </button>
                  )}
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
                          selectedItems.length === diaries.length &&
                          diaries.length > 0
                        }
                        onChange={handleSelectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="w-[10%] p-4 text-left">일지 번호</th>
                    <th className="w-[10%] p-4 text-left">동물 번호</th>
                    <th className="w-[10%] p-4 text-left">동물 이름</th>
                    <th className="w-[10%] p-4 text-left">제목</th>
                    <th className="w-[10%] p-4 text-left">작성일자</th>
                    <th className="w-[10%] p-4 text-left">등록일시</th>
                    <th className="w-[10%] p-4 text-left">삭제 상태</th>
                  </tr>
                </thead>
                <tbody>
                  {diaries.map((diary) => (
                    <tr key={diary.diaryId} className="border-b">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(diary.diaryId)}
                          onChange={() => handleSelectItem(diary.diaryId)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDiaryClick(diary)}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {diary.diaryId}
                        </button>
                      </td>
                      <td className="p-4">{diary.animalId}</td>
                      <td className="p-4">{diary.animalName}</td>
                      <td className="p-4">{diary.title}</td>
                      <td className="p-4">{diary.writtenDate}</td>
                      <td className="p-4">{diary.createdAt}</td>
                      <td className="p-4">
                        {diary.deleteStatus === 1 ? "활성" : "삭제됨"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditDiaryModal
          diary={selectedDiary}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ShelterAnimalDiary;
