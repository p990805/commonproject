import { useState, useEffect } from "react";
import SidebarNavigation from "./SidebarNavigation";
import DashboardStats from "./reservation/DashboardStats";
import SearchFilters from "./reservation/SearchFilters";
import ReservationTable from "./reservation/ReservationTable";
import ReservationDetails from "./reservation/ReservationDetails";
import CantReservation from "./reservation/CantReservation";
import api from "../../api"; 

const ShelterWalkReservation = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);

  // API의 상태 값을 컴포넌트에서 사용하는 값으로 변환 (일관되게 "거절"로)
  const mapStatus = (status) => {
    switch (status) {
      case "pending":
        return "미확인";
      case "approved":
        return "승인";
      case "rejected":
        return "거절"; // API의 "rejected"를 "거절"로 변환
      default:
        return status;
    }
  };

  useEffect(() => {
    api
      .get("/walk/shelter/list")
      .then((res) => {
        console.log("Axios 응답 객체:", res);
        return res.data;
      })
      .then((data) => {
        const transformedReservations = data.reservationList.map((item) => ({
          walkId: item.walkId,
          applicationDate: item.createdAt,
          animalName: item.animalName,
          reservationDate: item.walkAt,
          applicantName: item.userName,
          status: mapStatus(item.reservationApprovalStatus),
          rejectReason: item.content || "",
        }));
        setReservations(transformedReservations);
        setFilteredReservations(transformedReservations);
      })
      .catch((err) =>
        console.error("Failed to fetch reservations", err)
      );
  }, []);

  // 검색 필터 기준을 받아 예약 목록을 필터링하는 함수 (ReservationTable에 전달)
  const handleSearch = ({ startDate, endDate, categories, searchField, keyword }) => {
    const filtered = reservations.filter((r) => {
      // 날짜 필터: applicationDate(YYYY-MM-DD) 비교
      const appDate = r.applicationDate.slice(0, 10);
      if (appDate < startDate || appDate > endDate) return false;

      // 분류 필터: 선택된 카테고리가 있으면 해당 상태와 일치해야 함
      const selectedStatuses = Object.entries(categories)
        .filter(([_, selected]) => selected)
        .map(([status]) => status);
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(r.status)) return false;

      // 검색 키워드 필터: 키워드가 있을 경우 applicantName 또는 animalName에 포함되어야 함 (대소문자 무시)
      if (keyword.trim() !== "") {
        const lowerKeyword = keyword.toLowerCase();
        if (
          !r.applicantName.toLowerCase().includes(lowerKeyword) &&
          !r.animalName.toLowerCase().includes(lowerKeyword)
        )
          return false;
      }
      return true;
    });
    setFilteredReservations(filtered);
  };

  // 예약 업데이트 후 부모 상태를 갱신하는 함수
  const updateReservation = (updatedReservation) => {
    setReservations((prev) =>
      prev.map((r) => (r.walkId === updatedReservation.walkId ? updatedReservation : r))
    );
    setFilteredReservations((prev) =>
      prev.map((r) => (r.walkId === updatedReservation.walkId ? updatedReservation : r))
    );
    setSelectedReservation(updatedReservation);
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mx-4">
          <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
            산책예약 신청 대시보드
          </h1>
          {/* DashboardStats는 전체 예약(reservations)으로 통계를 계산 */}
          <DashboardStats reservations={reservations} />
          <SearchFilters onSearch={handleSearch} />
        </div>

        <div className="flex-1 p-6">
          <CantReservation />
        </div>

        <div className="flex-1 p-6">
          <h1 className="text-lg font-bold text-[#191919] mb-4">신청 목록</h1>
          <ReservationTable
            reservations={filteredReservations}
            onSelectReservation={setSelectedReservation}
          />
          {selectedReservation && (
            <ReservationDetails
              selectedReservation={selectedReservation}
              setSelectedReservation={setSelectedReservation}
              onUpdateReservation={updateReservation}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterWalkReservation;
