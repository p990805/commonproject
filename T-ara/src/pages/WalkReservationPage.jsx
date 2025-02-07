// WalkReservationPage.jsx
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import ReservationModal from "../components/reservation/ReservationModal";
import ReservationContent from "../components/reservation/ReservationContent";

const WalkReservationPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "산책 예약";
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("activeTab");
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white relative">
      {/* 배너 영역: activeTab과 관계없이 항상 표시 */}
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
                {["산책 예약", "예약현황"].map((menu) => (
                  <li className="mb-2" key={menu}>
                    <button
                      onClick={() => setActiveTab(menu)}
                      className={`
                        w-full text-left px-3 py-2 rounded transition hover:bg-gray-100 cursor-pointer
                        ${activeTab === menu ? "bg-red-500 text-white" : "bg-white text-gray-700"}
                      `}
                    >
                      {menu}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* 메인 콘텐츠 영역 */}
          <section className="flex-1 border-y border-gray-300 p-4">
            <ReservationContent
              activeTab={activeTab}
              handleOpenModal={handleOpenModal}
              setActiveTab={setActiveTab}
            />
          </section>
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
