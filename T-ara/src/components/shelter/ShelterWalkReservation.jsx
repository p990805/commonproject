import React, { useState } from "react";
import SidebarNavigation from "../SidebarNavigation";

const ShelterWalkReservation = () => {
  // 예시 데이터 - 나중에 DB에서 가져올 데이터
  const reservations = [
    {
      applicationDate: "2025.01.24",
      animalName: "코코",
      reservationDate: "2025.01.28",
      applicantName: "박주찬",
      status: "취소",
      rejectReason: "코코 예방접종",
    },
    {
      applicationDate: "2025.01.23",
      animalName: "맥스",
      reservationDate: "2025.01.28",
      applicantName: "김가연",
      status: "승인",
      rejectReason: "",
    },
    {
      applicationDate: "2025.01.22",
      animalName: "뭉치",
      reservationDate: "2025.01.26",
      applicantName: "김시원",
      status: "미확인",
      rejectReason: "",
    },
    {
      applicationDate: "2025.01.21",
      animalName: "초코",
      reservationDate: "2025.01.26",
      applicantName: "박시현",
      status: "승인",
      rejectReason: "",
    },
    {
      applicationDate: "2025.01.21",
      animalName: "코코",
      reservationDate: "2025.01.25",
      applicantName: "손서현",
      status: "미확인",
      rejectReason: "",
    },
    {
      applicationDate: "2025.01.20",
      animalName: "맥스",
      reservationDate: "2025.01.25",
      applicantName: "장희주",
      status: "미확인",
      rejectReason: "",
    },
  ];

  const [selectedReservation, setSelectedReservation] = useState(null);

  const getStatusStyle = (status) => {
    switch (status) {
      case "취소":
        return "bg-[#d9291d]/20 text-[#b22117]";
      case "승인":
        return "bg-[#ebfdf2] text-[#037847]";
      case "미확인":
        return "bg-[#f2f3f6] text-[#364153]";
      default:
        return "";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mx-4">
          {/* Dashboard Title */}
          <div className="mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              산책예약 신청 대시보드
            </h1>
          </div>
          {/* Dashboard Stats */}
          <div className="w-full h-[130px] relative bg-gradient-to-r from-[#5e9dfc] via-[#6085ef] to-[#5c6efe] rounded-[10px] shadow-[3px_3px_10px_0px_rgba(151,152,159,0.25)] flex items-center justify-between px-16 mb-12">
            {/* Today's Donation Amount */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                오늘 신청 건수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">16</span>
                <span className="!text-white/70 text-lg ml-2">건</span>
              </div>
            </div>

            {/* Total Donation Amount */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                확인되지 않은 건수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">3</span>
                <span className="!text-white/70 text-lg ml-2">건</span>
              </div>
            </div>

            {/* Today's Donor Count */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                확인된 건수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">15</span>
                <span className="!text-white/70 text-lg ml-2">건</span>
              </div>
            </div>

            {/* Total Donor Count */}
            <div className="flex flex-col">
              <span className="!text-[#d6fffb] text-[13.12px] font-semibold mb-2">
                전체 신청 건수
              </span>
              <div className="flex items-baseline">
                <span className="!text-white text-[32px] font-bold">255</span>
                <span className="!text-white/70 text-lg ml-2">건</span>
              </div>
            </div>
          </div>

          {/* Search Filters */}
          <div className="w-full bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7 mb-12">
            <div className="border border-[#dee1e8]">
              {/* Period Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    기간
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex items-center ml-5">
                    <input
                      type="date"
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      defaultValue="2024-10-23"
                    />
                    <span className="mx-4 !text-[#575757]">-</span>
                    <input
                      type="date"
                      className="w-32 h-[25.64px] px-3 bg-white border border-[#cccccc] text-[#575757] text-xs"
                      defaultValue="2025-01-23"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    분류
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex gap-4 ml-5">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-[13px] h-[13px] border border-[#767676] rounded-sm"
                      />
                      <span className="!text-[#575757] text-xs font-medium">
                        미확인
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-[13px] h-[13px] border border-[#767676] rounded-sm"
                      />
                      <span className="!text-[#575757] text-xs font-medium">
                        승인
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-[13px] h-[13px] border border-[#767676] rounded-sm"
                      />
                      <span className="!text-[#575757] text-xs font-medium">
                        거절
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Search Keyword */}
              <div className="flex">
                <div className="w-40 h-[50px] bg-[#f0f3fc] border border-[#dee1e8] flex items-center">
                  <span className="ml-5 !text-[#191919] text-[10.31px] font-normal font-['Roboto']">
                    검색 키워드
                  </span>
                </div>
                <div className="flex-1 h-[50px] border border-[#dee1e8] flex items-center">
                  <div className="flex gap-4 ml-5">
                    <select className="w-24 h-7 px-3 bg-white border border-[#cccccc] text-[#575757] text-xs">
                      <option>전체</option>
                    </select>
                    <input
                      type="text"
                      className="w-64 h-7 px-3 bg-white border border-[#cccccc]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-5">
              <button className="w-[68px] h-[33px] bg-[#191919] text-white text-xs font-normal font-['Roboto'] hover:bg-[#666]">
                검색
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <h1 className="text-lg font-bold text-[#191919] mb-4">신청 목록</h1>

          <div className="bg-white shadow rounded-lg">
            {/* 헤더 섹션 */}
            <div className="p-6 border-b border-[#dee1e8] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">전체 항목 총</span>
                <span className="text-sm font-bold text-[#235fd9]">6</span>
                <span className="text-sm font-semibold">건</span>
              </div>
              <div className="relative">
                <select className="w-32 h-7 px-4 text-sm border border-[#cccccc] rounded appearance-none">
                  <option>최신순</option>
                </select>
              </div>
            </div>

            {/* 테이블 */}
            <div className="overflow-x-auto pb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#fbfcfc] text-xs text-[#667084]">
                    <th className="px-6 py-3 font-medium text-left">
                      신청일자
                    </th>
                    <th className="px-6 py-3 font-medium text-left">
                      유기동물명
                    </th>
                    <th className="px-6 py-3 font-medium text-left">
                      예약일자
                    </th>
                    <th className="px-6 py-3 font-medium text-left">
                      신청자명
                    </th>
                    <th className="px-6 py-3 font-medium text-left">
                      승인 상태
                    </th>
                    <th className="px-6 py-3 font-medium text-left">
                      거절사유
                    </th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#eaecf0] cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedReservation(reservation)}
                    >
                      <td className="px-6 py-3 text-sm text-[#667085]">
                        {reservation.applicationDate}
                      </td>
                      <td className="px-6 py-3 text-sm text-[#667084]">
                        {reservation.animalName}
                      </td>
                      <td className="px-6 py-3 text-sm font-bold">
                        {reservation.reservationDate}
                      </td>
                      <td className="px-6 py-3 text-sm text-[#667084]">
                        {reservation.applicantName}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-2xl ${getStatusStyle(
                            reservation.status
                          )}`}
                        >
                          <span className="w-2 h-2 mr-1.5 rounded-full bg-current"></span>
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-[#667084]">
                        {reservation.rejectReason}
                      </td>
                      <td className="px-6 py-3">
                        <button className="w-4 h-4">
                          <span className="sr-only">더보기</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 상세 정보 섹션 */}
            {selectedReservation && (
              <div className="mt-6 mx-6 pb-6">
                <div className="border border-[#dee1e8]">
                  <div className="grid grid-cols-[160px,1fr]">
                    <div className="bg-[#f0f3fc] p-4 text-[10px] border-b border-r border-[#dee1e8]">
                      받으시는 분
                    </div>
                    <div className="p-4 text-sm text-[#667084] border-b border-[#dee1e8]">
                      {selectedReservation.applicantName} 님
                    </div>
                  </div>

                  <div className="grid grid-cols-[160px,1fr]">
                    <div className="bg-[#f0f3fc] p-4 text-[10px] border-b border-r border-[#dee1e8]">
                      승인 여부
                    </div>
                    <div className="p-4 border-b border-[#dee1e8]">
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="approval"
                            value="승인"
                            className="w-3 h-3 border-[#767676]"
                            checked={selectedReservation.status === "승인"}
                            onChange={() => {
                              setSelectedReservation({
                                ...selectedReservation,
                                status: "승인",
                                rejectReason: "",
                              });
                            }}
                            //   disabled={selectedReservation.status === "미확인"}
                          />
                          <span className="text-[11px] text-[#575757]">
                            승인
                          </span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="approval"
                            value="거절"
                            className="w-3 h-3 border-[#767676]"
                            checked={selectedReservation.status === "취소"}
                            onChange={() => {
                              setSelectedReservation({
                                ...selectedReservation,
                                status: "취소",
                              });
                            }}
                            //   disabled={selectedReservation.status === "미확인"}
                          />
                          <span className="text-[11px] text-[#575757]">
                            거절
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[160px,1fr]">
                    <div className="bg-[#f0f3fc] p-4 text-[10px] border-r border-[#dee1e8]">
                      거절 사유
                    </div>
                    <div className="p-4">
                      <input
                        type="text"
                        className="w-60 h-7 px-2 border border-[#cccccc]"
                        value={selectedReservation.rejectReason}
                        onChange={(e) => {
                          setSelectedReservation({
                            ...selectedReservation,
                            rejectReason: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6 mb-6">
                  <button className="w-[68px] h-[33px] bg-[#191919] text-white text-xs hover:bg-[#666]">
                    보내기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterWalkReservation;
