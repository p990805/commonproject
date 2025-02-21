import React from "react";

const DashboardStats = ({ reservations }) => {
  // 오늘 날짜 (YYYY-MM-DD) 형태
  const today = new Date().toISOString().slice(0, 10);

  // 오늘 신청 건수: applicationDate의 날짜 부분이 오늘인 건
  const todayCount = reservations.filter((r) => r.applicationDate.slice(0, 10) === today).length;

  // 확인되지 않은 건수: 상태가 "미확인"인 건
  const pendingCount = reservations.filter((r) => r.status === "미확인").length;

  // 확인된 건수: 상태가 "미확인"이 아닌 건
  const confirmedCount = reservations.filter((r) => r.status !== "미확인").length;

  // 전체 신청 건수: 리스트 길이
  const totalCount = reservations.length;

  return (
    <div className="w-full h-[130px] bg-gradient-to-r from-[#5e9dfc] via-[#6085ef] to-[#5c6efe] rounded-[10px] shadow-[3px_3px_10px_0px_rgba(151,152,159,0.25)] flex items-center justify-between px-16 mb-12">
      <div className="flex flex-col">
        <span className="text-[13.12px] font-semibold text-[#d6fffb] mb-2">
          오늘 신청 건수
        </span>
        <div className="flex items-baseline">
          <span className="text-[32px] font-bold text-white">{todayCount}</span>
          <span className="ml-2 text-lg text-white/70">건</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[13.12px] font-semibold text-[#d6fffb] mb-2">
          확인되지 않은 건수
        </span>
        <div className="flex items-baseline">
          <span className="text-[32px] font-bold text-white">{pendingCount}</span>
          <span className="ml-2 text-lg text-white/70">건</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[13.12px] font-semibold text-[#d6fffb] mb-2">
          확인된 건수
        </span>
        <div className="flex items-baseline">
          <span className="text-[32px] font-bold text-white">{confirmedCount}</span>
          <span className="ml-2 text-lg text-white/70">건</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[13.12px] font-semibold text-[#d6fffb] mb-2">
          전체 신청 건수
        </span>
        <div className="flex items-baseline">
          <span className="text-[32px] font-bold text-white">{totalCount}</span>
          <span className="ml-2 text-lg text-white/70">건</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
