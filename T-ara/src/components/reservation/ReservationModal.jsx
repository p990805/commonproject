import React, { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import CalendarModule from "./Calender";
import SmallModal from "./SmallModal";
import api from "../../api"; // API 호출을 위해 추가

function ReservationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null); // 선택한 시간 (예: "15:00")

  const handleAnswer = () => {
    setAnswerModalOpen(true);
  };

  const handleReservation = async () => {
    if (selectedDate && selectedTime) {
      // 선택한 날짜와 시간을 "YYYY-MM-DD HH:mm:ss" 형식으로 합칩니다.
      const year = selectedDate.getFullYear();
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const walk_at = `${year}-${month}-${day} ${selectedTime}:00`;

      // 여기서는 animal_id를 1로 하였으나, 필요에 따라 다른 값으로 설정하세요.
      const payload = {
        animal_id: 1,
        walk_at: walk_at,
      };

      console.log("예약 요청 payload:", payload);

      try {
        // 백엔드에 예약 요청을 보내는 API 호출 (엔드포인트와 로직은 실제 상황에 맞게 수정)
        const token = localStorage.getItem("authToken");
        const response = await api.post("/animal/walk", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        alert(response.data.message || "예약 요청이 완료되었습니다.");
        setCompleteModalOpen(true);
      } catch (error) {
        console.error("예약 오류:", error);
        alert("예약 요청에 실패하였습니다.");
      }
    } else {
      alert("예약할 날짜와 시간을 선택해주세요.");
    }
  };

  const answerMessage = (
    <div className="flex flex-col">
      <p>자세한 사항은 아래 연락처로 문의해주시기 바랍니다.</p>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <IoCallOutline />
          <p>보호소 연락처 : 062-xxx-xxxx</p>
        </div>
        <div className="flex gap-1 items-center">
          <MdAlternateEmail />
          <p>보호소 이메일 : p9090@nave.co</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      {/* 모달 컨테이너 */}
      <div className="relative z-10 bg-white w-[73%] max-h-[90vh] overflow-y-auto rounded shadow-md p-4">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>

        <div className="flex">
          {/* 왼쪽 섹션 (40%) */}
          <div className="flex flex-col w-1/2 border-r border-gray-300 gap-2 p-5">
            <img src="/assets/corgi.png" alt="예약 이미지" className="w-70 h-40" />
            <h1 className="text-xl text-gray-500 font-bold">시원</h1>
            <h1 className="text-2xl font-bold">산책 예약</h1>
            <p className="flex items-center text-gray-500 gap-1">
              <MdOutlineAccessTime className="w-6 h-6" />
              산책 가능시간 15:00 ~ 17:00
            </p>
            <p>소중한 후원 동물에게 즐거운 산책 시간을 선물하세요.</p>
            <div>
              <p className="font-bold">산책 예약 안내</p>
              <ul className="list-disc list-inside leading-relaxed text-gray-700">
                <li>산책 시간은 1시간입니다.</li>
                <li>
                  예약 가능한 시간대에 산책이 가능한지 확인 부탁드리며,
                  <br />
                  정확한 산책 시간은 보호소에서 별도로 연락을 통해 드리겠습니다.
                </li>
                <li>부득이한 사유로 예약이 불가능할 수 있는 점 양해 부탁드립니다.</li>
              </ul>
            </div>
            <div>
              <p>
                편리한 예약 시스템을 통해 반려견과 함께하는 산책 시간을 더욱
                <br />
                즐겁고 안전하게 만들어 드리겠습니다.
                <br />
                예약 후 정확한 시간 안내를 기다려 주세요.
              </p>
            </div>
          </div>

          {/* 오른쪽 섹션 (60%) */}
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

            <CalendarModule onSelectDate={setSelectedDate} />

            {/* 시간 선택 버튼 영역 */}
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

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleAnswer}
                className="underline underline-offset-2 cursor-pointer"
              >
                보호소 문의하기
              </button>
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

      {/* 첫번째 SmallModal: 날짜 확인 모달 */}
      <SmallModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="예약 날짜 확인"
        message={`선택하신 날짜는 ${
          selectedDate
            ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
            : ""
        } 입니다.\n맞습니까?`}
        onConfirm={() => {
          console.log("날짜 확인 완료");
          setAlertOpen(false);
          setCompleteModalOpen(true);
        }}
      />

      {/* 두번째 SmallModal: 예약 완료 모달 */}
      <SmallModal
        isOpen={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        title="🐕"
        message="예약 신청이 완료되었습니다."
        onConfirm={() => {
          console.log("예약 완료 확인");
          alert("예약 완료");
          setCompleteModalOpen(false);
          setAlertOpen(false);
          // 여기서 추가 로직 구현 가능 (예: 페이지 이동 등)
        }}
      />

      <SmallModal
        isOpen={answerModalOpen}
        onClose={() => setAnswerModalOpen(false)}
        title="보호소 문의하기"
        message={
          <div className="flex flex-col">
            <p>자세한 사항은 아래 연락처로 문의해주시기 바랍니다.</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <IoCallOutline />
                <p>보호소 연락처 : 062-xxx-xxxx</p>
              </div>
              <div className="flex gap-1 items-center">
                <MdAlternateEmail />
                <p>보호소 이메일 : p9090@nave.co</p>
              </div>
            </div>
          </div>
        }
        onConfirm={() => {
          setAnswerModalOpen(false);
        }}
      />
    </div>
  );
}

export default ReservationModal;
