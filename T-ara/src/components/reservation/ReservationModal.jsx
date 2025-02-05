import React from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import Calender from "./Calender";

function ReservationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mx-auto w-[80%]">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-10"
        onClick={onClose}
      />
      {/* 모달 컨테이너 */}
      <div className="relative z-10 bg-white w-full rounded shadow-md p-10">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-10 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>

        <div className="flex">
          {/* ---- 왼쪽 섹션 (40%) ---- */}
          <div className="flex flex-col w-1/2 border-r border-gray-300 gap-5 p-5">
            <img src="/assets/corgi.png" alt="" />

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

            <Calender />

            <div className="font-bold flex flex-col gap-1 mt-4">
              <p>유의사항</p>
              <div className="flex items-center gap-1">
                <FaCheck />
                <p>보호소 상황에 따라 예약이 취소될 수 있습니다.</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded">
                예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;
