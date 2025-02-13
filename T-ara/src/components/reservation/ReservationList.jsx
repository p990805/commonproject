// ReservationList.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

const ReservationList = ({ handleOpenModal }) => {
  return (
    <div>
      {/* 상단 헤더: 제목 및 검색 영역 */}
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-3xl font-bold">산책 동물 선택</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            className="border p-2 rounded border-gray-400"
          />
          <button className="flex items-center gap-1 border p-2 rounded border-gray-400 hover:bg-amber-100 cursor-pointer">
            <FaSearch className="w-4 h-4 text-gray-600" />
            검색
          </button>
        </div>
      </div>
      <hr  className="border-gray-300"/>

      {/* 필터 영역 */}
      <div className="mb-4">
        <div className="flex items-center justify-between border-x border-b border-gray-300">
          <div className="flex">
            <p className="border-x p-2 flex items-center border-gray-300">전체</p>
            <div>
              <select name="지역" id="지역" className="border-x p-3 border-gray-300 w-50">
                <option value="지역">지역</option>
              </select>
              <select name="종" id="종" className="border-x p-3 border-gray-300 w-50">
                <option value="종">종</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 산책 예약 동물 목록 */}
      <div className="my-5">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="border p-4 rounded border-gray-300">
            <img
              src="/assets/corgi.png"
              alt="동물 이미지"
              className="aspect-square w-full rounded-lg bg-gray-200 object-cover mb-2"
            />
            <div className="flex flex-col mb-2">
              <p className="font-bold">김시원 99</p>
              <p>익산 동물보호센터</p>
              <p>수컷</p>
            </div>
            <button
              onClick={handleOpenModal}
              className="w-full py-2 border rounded border-gray-400 hover:bg-gray-100 cursor-pointer"
            >
              산책 예약하기
            </button>
          </div>
          {/* 필요한 경우 다른 동물 카드들을 추가 */}
        </div>
      </div>

      {/* 페이징 버튼 */}
      <div className="flex justify-center my-6">
        <button className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100">
          &lt;&lt;
        </button>
        <button className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100">
          1
        </button>
        <button className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100">
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default ReservationList;
