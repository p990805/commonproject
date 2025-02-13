import React from "react";

const AlertDetail = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-[720px] h-[575px] bg-white border border-black/10 rounded-[16px] shadow-[20px_20px_20px_rgba(0,0,0,0.08)] p-8 flex flex-col gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-[10px] top-[10px] w-[24px] h-[24px] bg-[#E5E5E5] rounded-full flex items-center justify-center"
        >
          <span className="w-[10px] h-[10px] bg-black"></span>
        </button>

        {/* 프로필 섹션 */}
        <div className="flex items-start gap-[11.89px] w-full">
          <img
            src={alert.senderImage || "/default-profile.png"}
            alt="프로필"
            className="w-[48px] h-[48px] bg-[#F2F4F6]"
          />
          <div className="flex flex-col justify-center flex-grow">
            <div className="text-[18px] leading-[120%] text-[#0E0E10]">
              {alert.sender}
            </div>
            <div className="text-[18px] leading-[120%] text-[#0E0E10]">
              {alert.date}
            </div>
          </div>
        </div>

        {/* 제목 입력 섹션 */}
        <div
          className="w-full h-[48px] bg-white border border-[#ACACAC] rounded-[8px] 
          flex items-center px-4"
        >
          <span className="text-[16px] text-black">
            {alert.title || "상세 예약 안내: 렉스 산책 예약 불가"}
          </span>
        </div>

        {/* 내용 입력 섹션 */}
        <div
          className="w-full h-[220px] bg-white border border-[#ACACAC] rounded-[8px] 
          flex items-start p-4"
        >
          <span className="text-[16px] text-black">
            {alert.detail || alert.content}
          </span>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex justify-center items-center w-full gap-4">
          <button
            onClick={onClose}
            className="w-[160px] h-[48px] bg-[#545455] border border-black rounded-[8px] 
            flex justify-center items-center"
          >
            <span className="text-[16px] text-[#F5F5F5]">닫기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetail;
