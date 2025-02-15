import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavigation from "./SidebarNavigation";
import EditAnimalModal from "./EditAnimalModal ";
import api from "../../api";

const ShelterAnimal = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  // Search filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [protectStatus, setProtectStatus] = useState("false");
  const [breedId, setBreedId] = useState("all");
  const [animalName, setAnimalName] = useState("");

  const handleClick = () => {
    navigate(`/shelter/animal-register`);
  };

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    fetchAnimals();
  };

  const fetchAnimals = async () => {
    try {
      const params = {
        protectStatus,
        startDate: startDate || "1900-01-01",
        endDate: endDate || "2999-12-31",
        speciesId: "all",
        breedId,
        animalName,
      };

      const response = await api.get("/animal/list/shelter", { params });

      if (response.data && response.data.animalList) {
        setAnimals(response.data.animalList);
      }
    } catch (error) {
      console.error("Failed to fetch animals:", error);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleSearch = () => {
    fetchAnimals();
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allAnimalIds = animals.map((animal) => animal.animalId);
      setSelectedItems(allAnimalIds);
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
      await api.delete("/animal/delete", {
        data: { animalIds: selectedItems },
      });
      fetchAnimals();
      setSelectedItems([]);
    } catch (error) {
      console.error("Failed to delete animals:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />
      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              전체 유기 동물
            </h1>
            <button
              onClick={handleClick}
              className="flex items-center justify-center px-5 h-10 bg-[#235fd9] text-white text-sm font-medium rounded hover:bg-[#1e51b8] transition-colors"
            >
              유기동물 등록하기
            </button>
          </div>

          {/* Search Filters */}
          <div className="w-full bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7 mb-12">
            <div className="border border-[#dee1e8]">
              {/* Period Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    등록 기간
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

              {/* Search Keyword */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    검색 키워드
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex gap-4 ml-5">
                    <input
                      type="text"
                      className="w-64 h-7 px-3 bg-white border border-[#cccccc]"
                      placeholder="동물 이름 검색"
                      value={animalName}
                      onChange={(e) => setAnimalName(e.target.value)}
                    />
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

          {/* Animal List */}
          <div className="w-full bg-white shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-6">
            {/* List Header */}
            <div className="px-3 py-3 border-b border-[#dee1e8]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="!text-[#191919] text-[15px] font-semibold">
                    [
                    {selectedItems.length > 0
                      ? `${selectedItems.length}개의 항목 선택됨`
                      : `전체 항목 총 ${animals.length}건`}
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
                          selectedItems.length === animals.length &&
                          animals.length > 0
                        }
                        onChange={handleSelectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="w-[12%] p-4 text-left">동물 번호</th>
                    <th className="w-[12%] p-4 text-left">보호소 번호</th>
                    <th className="w-[12%] p-4 text-left">품종</th>
                    <th className="w-[12%] p-4 text-left">이름</th>
                    <th className="w-[12%] p-4 text-left">생년월일</th>
                    <th className="w-[12%] p-4 text-left">성별</th>
                    <th className="w-[12%] p-4 text-left">동물 상태</th>
                    <th className="w-[12%] p-4 text-left">중성화 상태</th>
                  </tr>
                </thead>
                <tbody>
                  {animals.map((animal) => (
                    <tr key={animal.animalId} className="border-b">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(animal.animalId)}
                          onChange={() => handleSelectItem(animal.animalId)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleAnimalClick(animal)}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {animal.animalId}
                        </button>
                      </td>
                      <td className="p-4">{animal.shelterId}</td>
                      <td className="p-4">{animal.breedName}</td>
                      <td className="p-4">{animal.animalName}</td>
                      <td className="p-4">{animal.birth}</td>
                      <td className="p-4">
                        {animal.gender === "M"
                          ? "수컷"
                          : animal.gender === "F"
                          ? "암컷"
                          : "미확인"}
                      </td>
                      <td className="p-4">
                        {animal.animalStatus === "protecting"
                          ? "보호중"
                          : animal.animalStatus === "adopted"
                          ? "입양완료"
                          : animal.animalStatus === "returned"
                          ? "귀가완료"
                          : animal.animalStatus === "dead"
                          ? "사망"
                          : "미확인"}
                      </td>
                      <td className="p-4">
                        {animal.neuteringStatus === "1" ? "완료" : "미완료"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditAnimalModal
          animal={selectedAnimal}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ShelterAnimal;
