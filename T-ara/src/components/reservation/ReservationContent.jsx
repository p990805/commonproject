import ReservationList from "./ReservationList";
import ReservationState from "./ReservationState";

const ReservationContent = ({ activeTab, handleOpenModal, setActiveTab }) => {
  return (
    <>
      {activeTab === "산책 예약" ? (
        <ReservationList handleOpenModal={handleOpenModal} />
      ) : (
        <ReservationState onClose={() => setActiveTab("산책 예약")} />
      )}
    </>
  );
};

export default ReservationContent;
