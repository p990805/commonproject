// src/components/ReservationDetail.jsx
import { useEffect, useState } from "react";
import api from "../../api";

const ReservationDetail = ({ onClose, reservation }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // reservation prop에 walkId가 있다고 가정 (예: reservation.id)
  const walkId = reservation?.id;

  useEffect(() => {
    if (!walkId) return;
    setLoading(true);
    api
      .get(`/walk/detail/${walkId}`)
      .then((res) => {
        setDetail(res.data.reservationDetail);
      })
      .catch((error) => {
        console.error("예약 상세 정보를 불러오는데 실패했습니다:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [walkId]);

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* 배경 오버레이 */}
        <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
        <div className="relative z-10 max-w-sm w-full bg-white p-5 rounded shadow-lg">
          <p className="text-center">로딩중...</p>
        </div>
      </div>
    );
  }

  // 예약 상세 정보를 불러오지 못한 경우
  if (!detail) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
        <div className="relative z-10 max-w-sm w-full bg-white p-5 rounded shadow-lg">
          <p className="text-center">예약 상세 정보를 불러오지 못했습니다.</p>
          <div className="text-center mt-4">
            <button className="bg-neutral-700 text-white p-2 w-40 rounded" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 예약일 형식 변환 (예: "2025.02.17 목 오후 3:00")
  const walkAtDate = new Date(detail.walkAt);
  const formattedWalkAt = walkAtDate.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // 예약 상태 매핑
  let statusText = "";
  if (detail.reservationStatus === "cancelled") {
    statusText = "거절";
  } else if (detail.reservationStatus === "reserved") {
    statusText = "승인";
  } else if (detail.reservationStatus === "request") {
    statusText = "예약대기";
  } else {
    statusText = detail.reservationStatus;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 배경 오버레이 - 클릭 시 모달 닫힘 */}
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative z-10 max-w-sm w-full bg-white p-5 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">예약 상세내역</h1>
        <div className="flex mb-4">
          <div className="mr-4">
            <img
              src={detail.thumbnail || "/assets/corgi.png"}
              alt="동물 이미지"
              className="w-24 h-24 rounded"
            />
          </div>
          <div className="flex flex-col text-sm">
            <p>
              예약동물 <span className="font-semibold">{detail.animalName}</span>
            </p>
            <p>
              보호소 <span className="font-semibold">{detail.shelterName}</span>
            </p>
            <p>
              예약일 <span className="font-semibold">{formattedWalkAt}</span>
            </p>
            <p>
              승인여부 <span className="font-semibold">{statusText}</span>
            </p>
          </div>
        </div>
        {detail.reservationStatus === "cancelled" && (
          <div className="mb-4">
            <p className="font-semibold mb-1">거절사유</p>
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              value={detail.content}
              readOnly
            />
          </div>
        )}
        <div className="text-center">
          <button className="bg-neutral-700 text-white p-2 w-40 rounded" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
