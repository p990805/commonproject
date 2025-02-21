import React from "react";

const ReservationTable = ({ reservations, onSelectReservation }) => {
  // 상태에 따른 Tailwind CSS 클래스 지정
  const getStatusStyle = (status) => {
    switch (status) {
      case "승인":
        return "bg-green-100 text-green-600";
      case "거절":
        return "bg-red-100 text-red-600";
      case "미확인":
        return "bg-gray-100 text-gray-600";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-[#dee1e8] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">전체 항목 총</span>
          <span className="text-sm font-bold text-[#235fd9]">
            {reservations.length}
          </span>
          <span className="text-sm font-semibold">건</span>
        </div>
      </div>
      <div className="bg-white shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-6">
        <div className="overflow-x-auto pb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-[#fbfcfc] text-xs text-[#667084]">
                <th className="px-6 py-3 font-medium text-left">신청일자</th>
                <th className="px-6 py-3 font-medium text-left">유기동물명</th>
                <th className="px-6 py-3 font-medium text-left">예약일자</th>
                <th className="px-6 py-3 font-medium text-left">신청자명</th>
                <th className="px-6 py-3 font-medium text-left">승인 상태</th>
                <th className="px-6 py-3 font-medium text-left">거절사유</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr
                  key={index}
                  className="border-b border-[#eaecf0] cursor-pointer hover:bg-gray-50"
                  onClick={() => onSelectReservation(reservation)}
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
      </div>
    </div>
  );
};

export default ReservationTable;
