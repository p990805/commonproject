import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaCircle } from "react-icons/fa";

const ReservationState = ({ onClose }) => {
    const handleOutsideClick = (e) => {
        if (e.target.id === "modal-overlay") {
            onClose();
        }
    };

    const [selectedRegion, setSelectedRegion] = useState(""); // 기본값 설정

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
            onClick={onClose}
            className="absolute inset-0 bg-black opacity-50" />
            {/*모달 시작 */}
                <div className="relative z-10 bg-white w-[80%] max-h-[90vh] overflow-y-auto rounded shadow-md p-6">
                    {/*모달 윗부분 시작 */}
                   <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">예약 내역</h1>
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-4 text-gray-400 hover:text-gray-600 font-bold"
                            >
                            ✕                              
                        </button>
                   </div>
                   {/*모달 윗부분 끝 */}

                   {/*모달 표 부분 시작 */}
                   <div className="flex flex-col border border-gray-400">
                        <div className="flex border-b border-b-gray-400 text-center">
                           <p className="p-2 bg-gray-200 w-30  flex items-center justify-center">기간 </p>
                           <div className="p-2 flex items-center gap-2">
                            <input type="date"  className="border border-gray-400 rounded p-1"/>
                            -
                            <input type="date"  className="border border-gray-400 rounded p-1"/>
                           </div>

                        </div>

                        <div className="flex border-b border-b-gray-400">
                            <p className="p-2 bg-gray-200 w-30 flex items-center justify-center">보호소 지역</p>
                            <div className="p-2 flex items-center">
                                <select
                                    name="test"
                                    value={selectedRegion} // 기본값 적용
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                    className="border border-gray-400 rounded p-1"
                                >
                                    <option value="" disabled hidden>지역 선택</option>
                                    <option value="all">전체</option>
                                    <option value="seoul">서울</option>
                                    <option value="gwangju">광주</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-center p-2">
                            <button className="bg-neutral-700 text-white px-5 py-1">검색</button>
                        </div>

                   </div>
                   {/*모달 표 부분 끝 */}

                    {/* 테스트 데이터  시작*/}
                   <div className="flex gap-3 my-5 border  border-gray-100 rounded p-2">
                        <div>
                            <img src="/assets/corgi.png" alt="" className="w-25 h-25 rounded-xl"/>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <h1 className="text-xl font-bold">시원 산책예약</h1>
                                <div className="flex gap-1 items-center justify-center text-[8px] bg-gray-200 p-1 rounded">
                                    <FaCircle className="text-gray-500"/>
                                    <p className="text-gray-500">예약대기</p>
                                </div>
                            </div>

                            <div className="text-gray-500 flex flex-col">
                                <p>광주 동물보호센터</p>
                                <p>24.12.13 토 오후 5:00</p>
                                <button className="flex items-center">상세보기 <IoIosArrowForward className="mb-0.5"/></button>
                            </div>

                        </div>
                   </div>
                   {/* 테스트 데이터  끝*/}

                </div>

          {/*모달 끝 */}

        </div>
    );
};

export default ReservationState;
