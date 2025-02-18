import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api"; // axios를 사용하는 api 모듈
import ShelterDetail from "./ShelterDetail"; // ShelterDetail 컴포넌트 경로 확인

// 지역 이름을 API의 지역번호로 매핑하는 객체
const regionMapping = {
  "서울": "1",
  "경기": "2",
  "인천": "3",
  "강원": "4",
  "충북": "5",
  "대전/충남/세종": "6",
  "대구/경북": "7",
  "전북": "8",
  "광주/전남": "9",
  "부산/울산/경남": "10",
  "제주": "11",
};

const ShelterList = ({ regionName }) => {
  // 전체 보호소 목록 (상세정보 포함)
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedShelter, setSelectedShelter] = useState(null);
  
  // 클라이언트 사이드 페이징: 한 페이지에 5개씩
  const [currentPage, setCurrentPage] = useState(1);
  const sheltersPerPage = 5;

  // 검색어 관련 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // regionName 변경 시 보호소 선택, 페이지 번호, 검색어 리셋 후 데이터 재호출
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

    // 전체 보호소 목록 호출 (페이지네이션 파라미터 없이 전체 데이터 조회)
    api.get(`/shelter/namelist/${regionId}`)
      .then((res) => {
        const list = res.data.shelterList || [];
        // 각 보호소의 상세정보를 병렬로 호출
        return Promise.all(
          list.map((shelter) =>
            api.get(`/shelter/info/${shelter.shelterId}`)
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

  // 검색어가 적용된 보호소 목록 (이름 기준, 대소문자 구분 없이)
  const filteredShelters = shelters.filter((shelter) =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 현재 페이지에 표시할 보호소 계산
  const indexOfLastShelter = currentPage * sheltersPerPage;
  const indexOfFirstShelter = indexOfLastShelter - sheltersPerPage;
  const currentShelters = filteredShelters.slice(indexOfFirstShelter, indexOfLastShelter);
  const totalPages = Math.ceil(filteredShelters.length / sheltersPerPage);

  // 페이지네이션 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 border rounded-md mx-1 ${
            i === currentPage ? "bg-red-500 text-white" : "bg-white text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  // 보호소 상세보기 렌더링
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
    <div className="w-full p-6 bg-white rounded-md shadow-md flex flex-col h-full">
      {/* 헤더 및 검색 영역 */}
      <div className="p-8">
        <div className="mb-6">
          <div className="text-[#1a1a1a]/60 text-xl mb-1 font-semibold">
            보호소 찾기
          </div>
          <div className="text-[#1a1a1a] text-2xl font-bold">
            {regionName} 지역 보호소
          </div>
        </div>
        {/* 검색창 (검색 버튼 클릭 시 검색어를 적용) */}
        <div className="flex justify-end items-center pb-4 border-b border-black">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="w-64 px-3 py-1.5 border border-gray-200 rounded text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="px-4 py-1.5 border border-gray-200 rounded text-sm cursor-pointer hover:bg-neutral-200"
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
      <div className="flex-1 overflow-auto px-8">
        {loading ? (
          <div>로딩중...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : currentShelters.length > 0 ? (
          <div className="divide-y divide-black">
            {currentShelters.map((shelter) => (
              <div
                key={shelter.shelterId}
                className="py-4 cursor-pointer hover:bg-gray-50 flex flex-col gap-3"
                onClick={() => setSelectedShelter(shelter)}
              >
                <div className="text-xl font-bold mb-1">{shelter.name}</div>
                <div className="text-md mb-1">{shelter.address}</div>
                <div className="text-md">{shelter.phone}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4">등록된 보호소가 없습니다.</div>
        )}
      </div>
      {/* 페이지네이션 영역 */}
      <div className="p-4 flex justify-center items-center border-t border-gray-100">
        <div className="flex gap-1">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            className="px-3 py-1 border rounded-md mx-1"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {renderPagination()}
          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            className="px-3 py-1 border rounded-md mx-1"
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
