import { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import CalendarModule from "./Calender";
import SmallModal from "./SmallModal";


function ReservationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [alertOpen, setAlertOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  const [answerModalOpen, setAnswerModalOpen] = useState(false)


  const handleAnswer =() => {
    setAnswerModalOpen(true);
  }

 
  const handleReservation = () => {
    if (selectedDate) {
      // 선택된 날짜 데이터를 활용하여 전송 로직 구현
      console.log("예약 요청 날짜:", selectedDate);
      setAlertOpen(true);

      // 예시: fetch나 axios를 사용해 POST 요청 보내기
    } else {
      alert("예약할 날짜를 선택해주세요.");
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
      <div 
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />
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
          {/* ---- 왼쪽 섹션 (40%) ---- */}
          <div className="flex flex-col w-1/2 border-r border-gray-300 gap-2 p-5">
            <img src="/assets/corgi.png" alt=""  className="w-70 h-40"/>

            <h1 className="text-xl text-gray-500 font-bold">시원</h1>
            <h1 className="text-2xl font-bold">산책 예약</h1>

            <p className="flex items-center text-gray-500 gap-1">
              <MdOutlineAccessTime className="w-6 h-6" />
              산책 가능시간 15:00 ~ 17:00
            </p>

            <p>
              소중한 후원 동물에게 즐거운 산책 시간을 선물하세요.
            </p>

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

          {/* ---- 오른쪽 섹션 (60%) ---- */}
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

            <CalendarModule  onSelectDate={setSelectedDate} />

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
              className="underline underline-offset-2 cursor-pointer">
                보호소 문의하기
              </button>
              <button 
              onClick={handleReservation}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded">
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
        message={`선택하신 날짜는 ${selectedDate ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일` : ""} 입니다.\n맞습니까?`}
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
          alert("예약 완료")
          setCompleteModalOpen(false);
          setAlertOpen(false);
          // 추가로 필요한 로직(예: 모달 전체 닫기, 페이지 이동 등)을 여기서 구현
        }}
      />

<SmallModal 
  isOpen={answerModalOpen}
  onClose={() => setAnswerModalOpen(false)}
  title="보호소 문의하기"
  message={answerMessage} // 변수 전달
  onConfirm={() => {
    setAnswerModalOpen(false);
  }}
/>



    </div>
  );
}

export default ReservationModal;
