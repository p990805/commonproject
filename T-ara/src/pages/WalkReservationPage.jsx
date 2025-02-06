import { FaSearch } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { useState } from "react";
import ReservationModal from "../components/reservation/ReservationModal";
import ReservationState from "../components/reservation/ReservationState";

const WalkReservationPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationState, setReservationStateOpen] = useState(false);

    const handleReservationState = () => {
        setReservationStateOpen(true);
    };

    const handleCloseReservationState = () => {
        setReservationStateOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full bg-white relative">
            {/* 예약현황 컴포넌트 렌더링 */}
            {reservationState && (
                <ReservationState onClose={handleCloseReservationState} />
            )}

            <div className="relative w-full flex items-center justify-end">
                <img src="/assets/walkbanner.png" alt="산책 배너"
                    className="w-full object-cover brightness-80"
                />
                <div className="absolute mt-10 right-[3%] text-lg md:text-lg font-thin text-white">
                    <p className="text-left">
                        <span className="font-semibold">유기견 산책</span>은 <br />
                        유기동물들에게 <span className="font-semibold">건강한 활동</span>을 제공하고, <br />
                        <span className="font-semibold">행복한 시간을 선물</span>하는 시간입니다.
                    </p>
                </div>
            </div>

            <div className="w-[90%] mx-auto bg-white p-5 flex flex-col justify-center">
                {/* 배너 아래 부분 */}
                <div className="flex items-center justify-between pb-5">
                    <h1 className="text-3xl font-bold ">산책 동물 선택</h1>
                    <div className="flex gap-3 items-center justify-center">
                        <input type="text" placeholder="검색어를 입력해주세요." 
                            className="border p-2 rounded border-gray-400"
                        />
                        <button className="cursor-pointer hover:bg-amber-100 flex items-center justify-center gap-1 border p-2 border-gray-400 rounded">
                            <FaSearch className="w-4 h-4 text-gray-600"/>
                            검색
                        </button>
                    </div>
                </div>
                <hr />

                {/* 메인 컨테이너 헤더 */}
                <div>
                    <div className="flex items-center justify-between border-x border-b border-gray-400">
                        <div className="flex">
                            <p className="border p-2 flex items-center border-gray-400">전체</p>
                            <div>
                                <select name="지역" id="지역" className="border p-3 border-gray-400 w-50">
                                    <option value="지역">지역</option>
                                </select>
                                <select name="종" id="종" className="border p-3 border-gray-400 w-50">
                                    <option value="종">종</option>
                                </select>
                            </div>
                        </div>
                        <button 
                            onClick={handleReservationState}
                            className="flex items-center justify-center p-2 border rounded border-gray-400 gap-2 mr-1">
                            <IoCalendarOutline className="w-5 h-5"/>
                            예약현황 보러가기
                        </button>
                    </div>
                </div>

                {/* 메인 컨테이너 컨텐츠 */}
                <div className="my-5">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <div>
                            <img src="/assets/corgi.png" alt="테스트" className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"/>
                            <div className="flex flex-col my-2">
                                <p className="font-bold">김시원 99</p>
                                <p>익산 동물보호센터</p>
                                <p>수컷</p>
                            </div>
                            <button 
                                onClick={handleOpenModal}
                                className="border border-gray-400 rounded w-full py-2 cursor-pointer">
                                산책 예약하기
                            </button>
                        </div>
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

            {/* 산책 예약 모달 */}
            <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">산책 예약</h2>
                <p>예약 관련 내용이 들어갈 자리</p>
            </ReservationModal>
        </div>
    );
};

export default WalkReservationPage;
