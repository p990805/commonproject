import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import ReservationDetail from "./ReservationDetail"; // 모달 상세보기 컴포넌트 (프로젝트 구조에 맞게 조정)
import api from "../../api"; // axios를 사용하는 api 모듈

const ReservationState = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // API의 예약 상태를 화면에 사용할 텍스트로 변환하는 함수
  const mapStatus = (status) => {
    switch (status) {
      case "reserved":
        return "승인";
      case "cancelled":
        return "거절";
      case "request":
        return "예약대기";
      default:
        return status;
    }
  };

  // 날짜를 "24.12.13 토 오후 5:00" 형태로 변환 (예시)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // 상태별 배경/글자 색상을 Tailwind 클래스로 반환하는 함수
  const getStyles = (status) => {
    switch (status) {
      case "예약대기":
        return "bg-gray-200 text-gray-700";
      case "거절":
        return "bg-red-200 text-red-700";
      case "승인":
        return "bg-green-200 text-green-700";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  // API 호출: axios(api.get) 사용하여 데이터를 가져오고, 필요한 필드로 변환
  useEffect(() => {
    api
      .get("/walk/user/list")
      .then((res) => {
        const mapped = res.data.reservationList.map((item) => ({
          id: item.walkId,
          animalName: item.animalName,
          shelterName: item.shelterName,
          walkAt: item.walkAt, // 원본 날짜 문자열 (필터용)
          status: mapStatus(item.reservationStatus),
          thumbnail: item.thumbnail || "/assets/corgi.png",
        }));
        setReservations(mapped);

        // 기본 기간: 오늘부터 한 달 뒤까지 설정 (현재 날짜 기준)
        const today = new Date();
        const todayStr = today.toISOString().slice(0, 10);
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
        const oneMonthLaterStr = oneMonthLater.toISOString().slice(0, 10);
        setStartDate(todayStr);
        setEndDate(oneMonthLaterStr);

        console.log("기본 시작일:", todayStr);
        console.log("기본 종료일:", oneMonthLaterStr);
      })
      .catch((error) => {
        console.error("Error fetching reservations", error);
      });
  }, []);

  // 필터 적용: 기간 및 보호소 지역에 따라 예약 목록을 필터링
  const filteredReservations = reservations.filter((item) => {
    // 기간 필터링: startDate와 endDate가 있으면 비교 (walkAt 기준)
    if (startDate && endDate) {
      const walkDate = new Date(item.walkAt);
      const start = new Date(startDate);
      // 종료 날짜를 해당 날짜의 마지막 순간으로 설정 (23:59:59)
      const end = new Date(endDate + "T23:59:59");
      if (walkDate < start || walkDate > end) return false;
    }
    // 보호소 지역 필터링: selectedRegion이 "all"이 아니면 shelterName에 해당 키워드가 포함되어야 함
    if (selectedRegion !== "all") {
      if (selectedRegion === "seoul" && !item.shelterName.includes("서울"))
        return false;
      if (selectedRegion === "gyeongkido" && !item.shelterName.includes("경기"))
        return false;
      if (selectedRegion === "incheon" && !item.shelterName.includes("인천"))
        return false;
      if (selectedRegion === "gangwon" && !item.shelterName.includes("강원"))
        return false;
      if (selectedRegion === "choongbuk" && !item.shelterName.includes("충북"))
        return false;
      if (selectedRegion === "dejeon" && !item.shelterName.includes("대전"))
        return false;
      if (selectedRegion === "choongnam" && !item.shelterName.includes("충남"))
        return false;
      if (selectedRegion === "sejong" && !item.shelterName.includes("세종"))
        return false;
      if (selectedRegion === "deagu" && !item.shelterName.includes("대구"))
        return false;
      if (selectedRegion === "gyeongbuk" && !item.shelterName.includes("경북"))
        return false;
      if (selectedRegion === "junbuk" && !item.shelterName.includes("전북"))
        return false;
      if (selectedRegion === "gwangju" && !item.shelterName.includes("광주"))
        return false;
      if (selectedRegion === "junnam" && !item.shelterName.includes("전남"))
        return false;
      if (selectedRegion === "busan" && !item.shelterName.includes("부산"))
        return false;
      if (selectedRegion === "ulsan" && !item.shelterName.includes("울산"))
        return false;
      if (selectedRegion === "gyeongnam" && !item.shelterName.includes("경남남"))
        return false;
      if (selectedRegion === "jeju" && !item.shelterName.includes("제주"))
        return false;
    }
    return true;
  });

  // 필터가 바뀔 때 현재 페이지를 1로 초기화 (페이지네이션 충돌 방지)
  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate, selectedRegion, reservations]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleShowDetail = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div className="">
      {/* 페이지 헤더 영역 */}
      <div className="flex items-center mb-6 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold">예약 내역</h1>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 p-4 rounded">
          <div className="flex items-center gap-2">
            <span className="w-28 text-gray-700">기간</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded p-1"
            />
            <span className="mx-2">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded p-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-28 text-gray-700">보호소 지역</span>
            <select
              name="region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-300 rounded p-1"
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
      </div>

      {/* 예약 데이터 리스트 (페이지네이션 적용) */}
      <div className="space-y-4">
        {paginatedReservations.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border border-gray-200 p-4 rounded"
          >
            <img
              src={item.thumbnail}
              alt="동물 이미지"
              className="w-24 h-24 rounded object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold">
                  {`${item.animalName} 산책예약`}
                </h2>
                <div
                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${getStyles(
                    item.status
                  )}`}
                >
                  <FaCircle className="text-current" />
                  <span>{item.status}</span>
                </div>
              </div>
              <div className="text-gray-600">
                <p>{item.shelterName}</p>
                <p>{formatDate(item.walkAt)}</p>
              </div>
            </div>
            <button
              className="text-red-500 hover:underline flex items-center gap-1"
              onClick={() => handleShowDetail(item)}
            >
              상세보기 <IoIosArrowForward />
            </button>
          </div>
        ))}
      </div>

      {/* 페이지네이션 컨트롤 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded hover:bg-gray-100 ${
                currentPage === i + 1 ? "bg-red-500 text-white" : "text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}

      {/* ReservationDetail 모달 (showDetail이 true일 때 표시) */}
      {showDetail && (
        <ReservationDetail
          onClose={handleCloseDetail}
          reservation={selectedReservation}
        />
      )}
    </div>
  );
};

export default ReservationState;
