// WalkReservationPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReservationModal from "../components/reservation/ReservationModal";
import ReservationList from "../components/reservation/ReservationList";

const WalkReservationPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "산책 예약";
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("activeTab");
    };
  }, []);

  // ReservationList에서 버튼 클릭 시, animalId를 인자로 받아 상태에 저장하고 모달 오픈
  const handleOpenModal = (animalId) => {
    setSelectedAnimalId(animalId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white relative">
      {/* 배너 영역 */}
      <div className="relative w-full flex items-center justify-end">
        <img
          src="/assets/walkbanner.png"
          alt="산책 배너"
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

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-start">
          {/* 사이드바 영역 */}
          <aside className="hidden md:block w-1/4 mr-6">
            <nav className="bg-white rounded border border-gray-300 p-4">
              <ul>
                <li className="mb-2">
                  <button
                    onClick={() => navigate("/reservation")}
                    className="w-full text-left px-3 py-2 rounded bg-red-500 text-white"
                  >
                    산책 예약
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => navigate("/reservation-status")}
                    className="w-full text-left px-3 py-2 rounded bg-white text-gray-700 hover:bg-gray-100"
                  >
                    예약현황
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* 메인 콘텐츠 영역 */}
          <section className="flex-1 border-y border-gray-300 p-4">
            <ReservationList handleOpenModal={handleOpenModal} />
          </section>
        </div>
      </div>

      {/* 산책 예약 모달 - 선택한 animalId를 prop으로 전달 */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        animalId={selectedAnimalId}
      />
    </div>
  );
};

export default WalkReservationPage;
