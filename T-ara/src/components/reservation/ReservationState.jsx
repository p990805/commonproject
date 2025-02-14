import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import ReservationDetail from "./ReservationDetail"; // 경로는 프로젝트 구조에 맞게 조정하세요.

const ReservationState = () => {
  const [selectedRegion, setSelectedRegion] = useState(""); // 기본값 설정
  const [showDetail, setShowDetail] = useState(false); // 상세보기 모달 표시 여부

  const getStyles = (type) => {
    switch (type) {
      case "예약대기":
        return "bg-gray-200 text-gray-700"; // 배경 회색, 글자 어두운 회색
      case "취소":
        return "bg-red-200 text-red-700"; // 배경 연한 빨강, 글자 진한 빨강
      case "완료":
        return "bg-green-200 text-green-700"; // 배경 연한 초록, 글자 진한 초록
      default:
        return "bg-gray-300 text-gray-800"; // 기본값
    }
  };

  const handleShowDetail = () => {
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
            <input type="date" className="border border-gray-300 rounded p-1" />
            <span className="mx-2">-</span>
            <input type="date" className="border border-gray-300 rounded p-1" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-28 text-gray-700">보호소 지역</span>
            <select
              name="region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-300 rounded p-1"
            >
              <option value="" disabled hidden>
                지역 선택
              </option>
              <option value="all">전체</option>
              <option value="seoul">서울</option>
              <option value="gwangju">광주</option>
            </select>
          </div>
        </div>
      </div>

      {/* 예약 데이터 리스트 */}
      <div className="space-y-4">
        {/* 예시 데이터 항목 */}
        <div className="flex items-center gap-4 border border-gray-200 p-4 rounded">
          <img
            src="/assets/corgi.png"
            alt="동물 이미지"
            className="w-24 h-24 rounded object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold">시원 산책예약</h2>
              <div
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${getStyles(
                  "예약대기"
                )}`}
              >
                <FaCircle className="text-current" />
                <span>예약대기</span>
              </div>
            </div>
            <div className="text-gray-600">
              <p>광주 동물보호센터</p>
              <p>24.12.13 토 오후 5:00</p>
            </div>
          </div>
          <button
            className="text-red-500 hover:underline flex items-center gap-1"
            onClick={handleShowDetail}
          >
            상세보기 <IoIosArrowForward />
          </button>
        </div>
        {/* 추가 예약 항목들을 필요에 따라 여기에 렌더링 */}
      </div>

      {/* ReservationDetail 모달 (showDetail이 true일 때 표시) */}
      {showDetail && <ReservationDetail onClose={handleCloseDetail} />}
    </div>
  );
};

export default ReservationState;
