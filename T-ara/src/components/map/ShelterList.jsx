import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import ShelterDetail from "./ShelterDetail";

const regionMapping = {
  서울: "1",
  경기: "2",
  인천: "3",
  강원: "4",
  충북: "5",
  "대전/충남/세종": "6",
  "대구/경북": "7",
  전북: "8",
  "광주/전남": "9",
  "부산/울산/경남": "10",
  제주: "11",
};

const ShelterList = ({ regionName }) => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sheltersPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelectedShelter(null);
    setCurrentPage(1);
    setSearchTerm("");
    setSearchQuery("");
    if (!regionName) return;

    const regionId = regionMapping[regionName];
    if (!regionId) {
      setShelters([]);
      return;
    }

    setLoading(true);
    setError(null);

    api
      .get(`/shelter/namelist/${regionId}`)
      .then((res) => {
        const list = res.data.shelterList || [];
        return Promise.all(
          list.map((shelter) =>
            api
              .get(`/shelter/info/${shelter.shelterId}`)
              .then((res) => res.data.shelter)
          )
        );
      })
      .then((detailedShelters) => {
        setShelters(detailedShelters);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [regionName]);

  const filteredShelters = shelters.filter((shelter) =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastShelter = currentPage * sheltersPerPage;
  const indexOfFirstShelter = indexOfLastShelter - sheltersPerPage;
  const currentShelters = filteredShelters.slice(
    indexOfFirstShelter,
    indexOfLastShelter
  );
  const totalPages = Math.ceil(filteredShelters.length / sheltersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 border rounded-md mx-1 ${
            i === currentPage
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  if (selectedShelter) {
    return (
      <ShelterDetail
        shelter={selectedShelter}
        onClose={() => setSelectedShelter(null)}
        regionId={regionMapping[regionName]}
      />
    );
  }

  return (
    <div className="w-full h-full p-6 bg-white rounded-md flex flex-col">
      {/* 헤더 영역 - 제목과 검색창을 나란히 배치 */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-gray-600 text-lg mb-1">보호소 찾기</div>
            <div className="text-2xl font-bold text-gray-900">
              {regionName} 지역 보호소
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="w-64 px-3 py-1.5 border border-gray-200 rounded text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm hover:bg-gray-100"
              onClick={() => {
                setCurrentPage(1);
                setSearchQuery(searchTerm);
              }}
            >
              검색
            </button>
          </div>
        </div>
      </div>

      {/* 보호소 목록 영역 */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        {loading ? (
          <div>로딩중...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : currentShelters.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {currentShelters.map((shelter) => (
              <div
                key={shelter.shelterId}
                className="py-4 cursor-pointer hover:bg-gray-50 flex flex-col gap-2"
                onClick={() => setSelectedShelter(shelter)}
              >
                <div className="text-lg font-bold text-gray-900">
                  {shelter.name}
                </div>
                <div className="text-gray-600">{shelter.address}</div>
                <div className="text-gray-600">{shelter.phone}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-gray-500">등록된 보호소가 없습니다.</div>
        )}
      </div>

      {/* 페이지네이션 영역 */}
      <div className="p-4 flex justify-center items-center border-t border-gray-200">
        <div className="flex gap-1">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            className="px-3 py-1 border rounded-md mx-1 hover:bg-gray-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {renderPagination()}
          <button
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            className="px-3 py-1 border rounded-md mx-1 hover:bg-gray-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShelterList;
