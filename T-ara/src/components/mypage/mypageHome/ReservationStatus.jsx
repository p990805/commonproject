import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api"; // axios를 사용하는 api 모듈

const ReservationStatus = () => {
  const [reservations, setReservations] = useState([]);

  // API의 예약 상태를 화면에 사용할 텍스트로 변환하는 함수
  const mapStatus = (status) => {
    switch (status) {
      case "reserved":
        return "승인";
      case "cancelled":
        return "거절";
      case "pending":
        return "예약대기";
      default:
        return status;
    }
  };

  // 날짜를 "24.12.13 토 오후 5:00"와 비슷한 형식으로 변환 (예시)
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

  useEffect(() => {
    api
      .get("/walk/user/list")
      .then((res) => {
        // axios는 res.data에 이미 파싱된 데이터를 담아서 반환합니다.
        const mapped = res.data.reservationList.map((item) => ({
          id: item.walkId,
          name: item.animalName,
          date: formatDate(item.walkAt),
          status: mapStatus(item.reservationStatus),
        }));
        setReservations(mapped);
      })
      .catch((error) => {
        console.error("Error fetching reservations", error);
      });
  }, []);

  // 상태에 따른 Tailwind CSS 클래스 지정 함수
  const getStatusColor = (status) => {
    switch (status) {
      case "예약대기":
        return "bg-gray-100 text-gray-600";
      case "승인":
        return "bg-green-100 text-green-600";
      case "거절":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm">
      {/* 상단 영역: 제목과 "+더보기" 링크 */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">산책 예약현황</h2>
        <Link
          to="/reservation"
          className="text-gray-400 hover:underline text-sm font-medium"
        >
          +더보기
        </Link>
      </div>

      {/* 예약 목록 영역 - 최대 5개만 표시, 데이터가 없으면 안내 메시지 표시 */}
      <div className="space-y-2">
        {reservations.length === 0 ? (
          <div className="text-center text-gray-500 py-2">
            예약된 내역이 없습니다.
          </div>
        ) : (
          reservations.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b p-2"
            >
              {/* 왼쪽: [동물명] 날짜/시간 */}
              <div className="flex items-center space-x-2">
                <span className="font-semibold">[{item.name}]</span>
                <span className="text-gray-700">{item.date}</span>
              </div>

              {/* 오른쪽: 상태 표시 */}
              <div>
                <span
                  className={`px-2 py-1 rounded text-[8px] ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReservationStatus;
