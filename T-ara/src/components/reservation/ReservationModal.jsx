import React, { useState, useEffect } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import CalendarModule from "./Calender";
import SmallModal from "./SmallModal";
import api from "../../api";

// 로컬 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

// 예약 확인 메시지 형식 함수 (예: "2025년 2월 26일 15:00 입니다. 맞습니까?")
function formatReservationDateMessage(selectedDate, selectedTime) {
  if (!selectedDate) return "";
  const dateString =
    typeof selectedDate === "string" ? selectedDate : formatDate(selectedDate);
  const [year, month, day] = dateString.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일 ${
    selectedTime ? selectedTime : "??:00"
  } 입니다. 맞습니까?`;
}

function ReservationModal({ isOpen, onClose, animalId, thumbnail }) {
  if (!isOpen) return null;

  const [reservationInfo, setReservationInfo] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  // 선택된 날짜를 문자열("YYYY-MM-DD")로 받습니다.
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  // animalId가 변경되면 예약 정보 API 호출
  useEffect(() => {
    if (animalId) {
      api
        .get(`/walk/reservation-info/${animalId}`)
        .then((response) => {
          if (response.data && response.data.info) {
            setReservationInfo(response.data.info);
          }
        })
        .catch((error) => {
          console.error("예약 정보 조회 에러:", error);
        });
    }
  }, [animalId]);

  const handleAnswer = () => {
    setAnswerModalOpen(true);
  };

  const handleReservation = () => {
    if (selectedDate && selectedTime) {
      setAlertOpen(true);
    } else {
      alert("예약할 날짜와 시간을 선택해주세요.");
    }
  };

  // 예약 확인 모달에서 onConfirm 시 예약 요청을 보냅니다.
  const handleConfirmReservation = async () => {
    setAlertOpen(false);
    // selectedDate가 문자열이 아니라면 변환
    const dateString =
      typeof selectedDate === "string" ? selectedDate : formatDate(selectedDate);
    const payload = {
      animalId,
      walkAt: `${dateString} ${selectedTime}:00`,
    };

    console.log("예약 요청 payload:", payload);

    try {
      const token = localStorage.getItem("authToken");
      await api.post("/walk/register", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setCompleteModalOpen(true);
    } catch (error) {
      console.error("예약 오류:", error);
      alert("예약 요청에 실패하였습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      {/* 모달 컨테이너 */}
      <div className="relative z-10 bg-white w-[73%] max-h-[90vh] overflow-y-auto rounded shadow-md p-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>
        <div className="flex">
          {/* 왼쪽 섹션 - 예약 정보 표시 */}
          <div className="flex flex-col w-1/2 border-r border-gray-300 gap-2 p-5">
            <img
              src={
                thumbnail ||
                (reservationInfo && reservationInfo.thumbnail) ||
                "/assets/corgi.png"
              }
              alt="동물 이미지"
              className="w-full h-60 object-fill rounded"
            />
            <h1 className="text-xl font-bold text-gray-700">
              {reservationInfo ? reservationInfo.animalName : "동물 이름"}
            </h1>
            <h2 className="text-2xl font-bold mb-2">산책 예약</h2>
            <p className="flex items-center text-gray-500 gap-1">
              <MdOutlineAccessTime className="w-6 h-6" />
              산책 가능 시간 15:00 ~ 17:00
            </p>
            <p className="text-gray-600">
              소중한 동물에게 즐거운 산책 시간을 선물하세요.
            </p>
            <div>
              <p className="font-bold">예약 안내</p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>산책 시간은 1시간입니다.</li>
                <li>
                  예약 가능한 시간에 산책이 가능한지 확인 부탁드리며, <br />
                  정확한 산책 시간은 보호소에서 별도로 안내드립니다.
                </li>
                <li>
                  부득이한 사유로 예약이 불가능할 수 있는 점 양해 부탁드립니다.
                </li>
              </ul>
            </div>
          </div>
          {/* 오른쪽 섹션 - 날짜 및 시간 선택 */}
          <div className="p-5 w-1/2">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">날짜를 선택하세요</h1>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center">
                  <FaCircle className="text-red-100" />
                  <p>예약 불가능</p>
                </div>
                <div className="flex gap-1 items-center">
                  <FaCircle className="text-blue-100" />
                  <p>예약 가능</p>
                </div>
              </div>
            </div>
            <CalendarModule onSelectDate={setSelectedDate} animalId={animalId} />
            <div className="w-full flex gap-7 mt-4">
              <button
                onClick={() => setSelectedTime("15:00")}
                className={`w-30 h-10 border rounded shadow-lg cursor-pointer ${
                  selectedTime === "15:00"
                    ? "bg-blue-200 border-blue-500"
                    : "hover:bg-neutral-200"
                }`}
              >
                15:00
              </button>
              <button
                onClick={() => setSelectedTime("16:00")}
                className={`w-30 h-10 border rounded shadow-lg cursor-pointer ${
                  selectedTime === "16:00"
                    ? "bg-blue-200 border-blue-500"
                    : "hover:bg-neutral-200"
                }`}
              >
                16:00
              </button>
            </div>
            <div className="font-bold flex flex-col gap-1 mt-4">
              <p>유의사항</p>
              <div className="flex items-center gap-1">
                <FaCheck />
                <p>보호소 상황에 따라 예약이 취소될 수 있습니다.</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleReservation}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
              >
                예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 예약 날짜 확인 모달 */}
      <SmallModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="예약 날짜 확인"
        message={formatReservationDateMessage(selectedDate, selectedTime)}
        onConfirm={handleConfirmReservation}
      />
      {/* 예약 완료 모달 */}
      <SmallModal
        isOpen={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        title="🐕"
        message="예약 신청이 완료되었습니다."
        onConfirm={() => {
          setCompleteModalOpen(false);
          onClose();
        }}
      />
    </div>
  );
}

export default ReservationModal;
