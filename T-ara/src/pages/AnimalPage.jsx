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

  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const response = await api.get("/animal/list/user", {
        params: {
          cityCategoryId: region, // 예: "서울", "경기", "all" 등
          shelterId: shelter,      // 예: "서울 보호소", "all" 등
          speciesId: species,      // 예: "강아지", "all" 등
          keyword: searchValue,
        },
      });
      setAnimals(response.data.message);
      setError(null);
    } catch (err) {
      console.error("Error fetching animals:", err);
      setError("Failed to load animals. Please try again later.");
    }
    setLoading(false);
  };

  // 검색 버튼 클릭 시 또는 필터 상태, 검색어 변경 시 동물 목록 재요청
  useEffect(() => {
    fetchAnimals();
  }, [region, shelter, species]);

  const handleSearch = () => {
    fetchAnimals();
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
        />
        <AnimalGrid animals={animals} />
      </div>
    </div>
  );
};

export default AnimalPage;
