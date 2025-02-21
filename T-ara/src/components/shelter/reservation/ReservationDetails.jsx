import React from "react";
import api from "../../../api";

const ReservationDetails = ({
  selectedReservation,
  setSelectedReservation,
  onUpdateReservation,
}) => {
  // API로 보낼 때 "거절"을 "rejected"로 변환하도록 변경
  const mapStatusToApi = (status) => {
    switch (status) {
      case "승인":
        return "approved";
      case "거절":
        return "rejected";
      case "미확인":
        return "pending";
      default:
        return status;
    }
  };

  const handleSend = () => {
    const payload = {
      walkId: selectedReservation.walkId,
      reservationApprovalStatus: mapStatusToApi(selectedReservation.status),
      content: selectedReservation.rejectReason,
    };

    api.post("/walk/manage-status", payload)
      .then((res) => {
        console.log("예약 상태 업데이트 성공:", res.data);
        // API 업데이트 성공 후, 부모 상태를 즉시 갱신하여 화면에 반영
        const updatedReservation = {
          ...selectedReservation,
          // 만약 API 응답에 추가 업데이트 데이터가 있다면 반영 가능
          // 여기서는 단순히 현재 선택된 예약의 상태를 사용합니다.
        };
        onUpdateReservation(updatedReservation);
      })
      .catch((err) => {
        console.error("예약 상태 업데이트 실패:", err);
      });
  };

  return (
    <div className="mt-6 mx-6 pb-6">
      <div className="border border-[#dee1e8]">
        {/* 받으시는 분 */}
        <div className="flex">
          <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
            <span className="ml-5 text-[10.31px] text-[#191919] font-normal">
              받으시는 분
            </span>
          </div>
          <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
            <div className="ml-5 text-sm text-[#667084]">
              {selectedReservation.applicantName} 님
            </div>
          </div>
        </div>

        {/* 승인 여부 */}
        <div className="flex">
          <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
            <span className="ml-5 text-[10.31px] text-[#191919] font-normal">
              승인 여부
            </span>
          </div>
          <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
            <div className="flex gap-6 ml-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="approval"
                  value="승인"
                  className="w-3 h-3 border-[#767676]"
                  checked={selectedReservation.status === "승인"}
                  onChange={() =>
                    setSelectedReservation({
                      ...selectedReservation,
                      status: "승인",
                      rejectReason: "",
                    })
                  }
                />
                <span className="text-[11px] text-[#575757]">승인</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="approval"
                  value="거절"
                  className="w-3 h-3 border-[#767676]"
                  checked={selectedReservation.status === "거절"}
                  onChange={() =>
                    setSelectedReservation({
                      ...selectedReservation,
                      status: "거절",
                    })
                  }
                />
                <span className="text-[11px] text-[#575757]">거절</span>
              </label>
            </div>
          </div>
        </div>

        {/* 거절 사유 */}
        <div className="flex">
          <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
            <span className="ml-5 text-[10.31px] text-[#191919] font-normal">
              거절 사유
            </span>
          </div>
          <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
            <div className="ml-5">
              <input
                type="text"
                className="w-60 h-7 px-2 border border-[#cccccc]"
                value={selectedReservation.rejectReason}
                onChange={(e) =>
                  setSelectedReservation({
                    ...selectedReservation,
                    rejectReason: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 mb-6">
        <button
          onClick={handleSend}
          className="w-[68px] h-[33px] bg-[#191919] text-xs text-white hover:bg-[#666]"
        >
          보내기
        </button>
      </div>
    </div>
  );
};

export default ReservationDetails;
