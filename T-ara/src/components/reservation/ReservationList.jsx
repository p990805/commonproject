// src/components/reservation/ReservationList.jsx
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import api from "../../api";

const ReservationList = ({ handleOpenModal }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 지역 select 옵션에 따른 필터 키워드 매핑
  const regionKeywordMapping = {
    all: "",
    seoul: "서울",
    gyeongkido: "경기",
    incheon: "인천",
    gangwon: "강원",
    choongbuk: "충북",
    dejeon: "대전",
    choongnam: "충남",
    sejong: "세종",
    deagu: "대구",
    gyeongbuk: "경북",
    junbuk: "전북",
    gwangju: "광주",
    junnam: "전남",
    busan: "부산",
    ulsan: "울산",
    gyeongnam: "경남",
    jeju: "제주",
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        const response = await api.get("/walk/reservation");
        setAnimals(response.data.walkLists);
      } catch (error) {
        console.error("동물 데이터를 불러오는 중 에러 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  // 검색 및 지역 필터 적용
  const filteredAnimals = animals.filter((animal) => {
    let matchesRegion = true;
    if (region !== "all") {
      const keyword = regionKeywordMapping[region];
      matchesRegion = animal.shelterName.includes(keyword);
    }
    let matchesSearch = true;
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      matchesSearch =
        animal.animalName.toLowerCase().includes(searchLower) ||
        animal.shelterName.toLowerCase().includes(searchLower);
    }
    return matchesRegion && matchesSearch;
  });

  // 페이지네이션 관련 계산
  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
  const paginatedAnimals = filteredAnimals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-3xl font-bold">산책 동물 선택</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            className="border p-2 rounded border-gray-400"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="flex items-center gap-1 border p-2 rounded border-gray-400 hover:bg-amber-100 cursor-pointer">
            <FaSearch className="w-4 h-4 text-gray-600" />
            검색
          </button>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="mb-4">
        <div className="flex items-center justify-between border p-3 rounded border-gray-300">
          <label htmlFor="region" className="mr-2 font-bold">
            보호소 지역
          </label>
          <select
            id="region"
            name="region"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded border-gray-400"
          >
            <option value="all">전체</option>
            <option value="seoul">서울</option>
            <option value="gyeongkido">경기</option>
            <option value="incheon">인천</option>
            <option value="gangwon">강원</option>
            <option value="choongbuk">충북</option>
            <option value="dejeon">대전</option>
            <option value="choongnam">충남</option>
            <option value="sejong">세종</option>
            <option value="deagu">대구</option>
            <option value="gyeongbuk">경북</option>
            <option value="junbuk">전북</option>
            <option value="gwangju">광주</option>
            <option value="junnam">전남</option>
            <option value="busan">부산</option>
            <option value="ulsan">울산</option>
            <option value="gyeongnam">경남</option>
            <option value="jeju">제주</option>
          </select>
        </div>
      </div>
      <div className="my-5">
        {loading ? (
          <p>로딩중...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedAnimals.map((animal) => (
              <div
                key={animal.animalId}
                className="border p-4 rounded border-gray-300"
              >
                <img
                  src={animal.thumbnail || "/assets/corgi.png"}
                  alt={`${animal.animalName} 이미지`}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover mb-2"
                />
                <div className="flex flex-col mb-2">
                  <p className="font-bold">{animal.animalName}</p>
                  <p>{animal.shelterName}</p>
                  <p>{animal.gender === "M" ? "수컷" : "암컷"}</p>
                </div>
                <button
                  onClick={() =>
                    handleOpenModal(animal.animalId, animal.thumbnail)
                  }
                  className="w-full py-2 border rounded border-gray-400 hover:bg-gray-100 cursor-pointer"
                >
                  산책 예약하기
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
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
  );
};

export default ReservationList;
