import React, { useState, useEffect } from "react";
import api from "../api";
import BannerSection from "../components/animal/BannerSection";
import SearchBar from "../components/animal/SearchBar";
import FilterBar from "../components/animal/FilterBar";
import AnimalGrid from "../components/animal/AnimalGrid";

const AnimalPage = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 필터 상태 (백엔드에서는 기본값 "all" 사용)
  const [region, setRegion] = useState("all");
  const [shelter, setShelter] = useState("all");
  const [species, setSpecies] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  // 정렬 상태: "newest" (animalId 높은 순) / "oldest" (낮은 순)
  const [sortOrder, setSortOrder] = useState("newest");

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const animalsPerPage = 16; // 4*4 grid

  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const response = await api.get("/animal/list/user", {
        params: {
          cityCategoryId: region,
          shelterId: shelter,
          speciesId: species,
          keyword: searchValue,
        },
      });
      let fetchedAnimals = response.data.message;
      // console.log(fetchedAnimals);

      // animalId를 기준으로 정렬 (정렬 상태에 따라)
      if (sortOrder === "newest") {
        fetchedAnimals.sort((a, b) => Number(b.animalId) - Number(a.animalId));
      } else {
        fetchedAnimals.sort((a, b) => Number(a.animalId) - Number(b.animalId));
      }

      setAnimals(fetchedAnimals);
      setError(null);
      // 필터나 검색 시 페이지를 1로 초기화
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching animals:", err);
      setError("Failed to load animals. Please try again later.");
    }
    setLoading(false);
  };

  // 필터 또는 정렬 상태, 검색어 변경 시 재요청
  useEffect(() => {
    fetchAnimals();
  }, [region, shelter, species, sortOrder]);

  const handleSearch = () => {
    fetchAnimals();
  };

  // 페이지네이션 관련 계산
  const indexOfLastAnimal = currentPage * animalsPerPage;
  const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage;
  const currentAnimals = animals.slice(indexOfFirstAnimal, indexOfLastAnimal);
  const totalPages = Math.ceil(animals.length / animalsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 페이지 변경 시 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BannerSection />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">유기동물 후원하기</h2>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearch={handleSearch}
          />
        </div>
        <FilterBar
          region={region}
          setRegion={setRegion}
          shelter={shelter}
          setShelter={setShelter}
          species={species}
          setSpecies={setSpecies}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        {/* 한 페이지에 currentAnimals(최대 16개)를 전달 */}
        <AnimalGrid animals={currentAnimals} />

        {/* 페이지네이션 컨트롤 */}
        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
};

export default AnimalPage;
