import React, { useState } from "react";
import AlertDetail from "../components/alert/AlertDetail";
import { IoMail, IoMailOpenOutline } from "react-icons/io5";

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AlertPage = () => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedDetailAlert, setSelectedDetailAlert] = useState(null);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      sender: "운영자",
      content: "Regular text column",
      detail: "상세 설명: 정기적인 알림 메시지입니다.",
      read: false,
      date: "2025-01-24 08:06",
      selected: false,
      senderImage: "/default-profile.png",
    },
    {
      id: 2,
      sender: "운영자",
      content: "Regular text column",
      read: false,
      date: "2025-01-24 08:06",
      selected: false,
    },
    {
      id: 3,
      sender: "광주 동물보호센터",
      content: "산책 예약 안내: 코코 산책 예약 완료🐾",
      read: true,
      date: "2025-01-24 08:06",
      selected: false,
    },
    {
      id: 4,
      sender: "운영자",
      content: "Regular text column",
      read: true,
      date: "2025-01-24 08:06",
      selected: false,
    },
    {
      id: 5,
      sender: "광주 동물보호센터",
      content: "Regular text column",
      read: true,
      date: "2025-01-24 08:06",
      selected: false,
    },
    {
      id: 6,
      sender: "광주 동물보호센터",
      content: "산책 예약 안내: 맥스 산책 예약 불가",
      read: true,
      date: "2025-01-23 17:46",
      selected: false,
    },
    {
      id: 7,
      sender: "운영자",
      content: "Regular text column",
      read: false,
      date: "2025-01-23 17:46",
      selected: false,
    },
    {
      id: 8,
      sender: "운영자",
      content: "Regular text column",
      read: false,
      date: "2025-01-23 17:46",
      selected: false,
    },
    {
      id: 9,
      sender: "운영자",
      content: "Regular text column",
      read: false,
      date: "2025-01-23 17:46",
      selected: false,
    },
    {
      id: 10,
      sender: "광주 동물보호센터",
      content: "Regular text column",
      read: false,
      date: "2025-01-23 17:46",
      selected: false,
    },
    {
      id: 11,
      sender: "운영자",
      content: "Regular text column",
      read: false,
      date: "2025-01-23 17:46",
      selected: false,
    },
    {
      id: 12,
      sender: "운영자",
      content: "긴급! 유기견 병원비 후원으로 생명을 구해주세요",
      read: false,
      date: "2025-01-23 17:46",
      selected: false,
    },
    {
      id: 13,
      sender: "운영자",
      content: "당신의 작은 후원이, 유기견에게 큰 희망이 됩니다",
      read: false,
      date: "2025-01-23 17:46",
      selected: false,
    },
    {
      id: 14,
      sender: "운영자",
      content: "첫 후원을 시작해보세요 🐕",
      read: false,
      date: "2025-01-23 17:46",
      selected: false,
    },
    {
      id: 15,
      sender: "운영자",
      content: "🎉 회원가입을 축하드립니다! 🎉",
      read: false,
      date: "2025-01-23 17:46",
      selected: false,
    },
  ]);

  // 개별 알림 선택/해제
  const toggleAlertSelection = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, selected: !alert.selected } : alert
      )
    );
  };

  // 전체 선택/해제
  const toggleSelectAll = () => {
    const newSelectedState = !selectedAll;
    setSelectedAll(newSelectedState);
    setAlerts(
      alerts.map((alert) => ({ ...alert, selected: newSelectedState }))
    );
  };

  // 선택된 알림 삭제
  const deleteSelectedAlerts = () => {
    setAlerts(alerts.filter((alert) => !alert.selected));
    setSelectedAll(false);
  };

  // 알림 상세보기
  const openAlertDetail = (alert) => {
    setSelectedDetailAlert(alert);
  };

  // 알림 상세보기 닫기
  const closeAlertDetail = () => {
    setSelectedDetailAlert(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 배너 섹션 */}
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e')",
        }}
      >
        <div className="absolute inset-0 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h1 className="text-3xl font-bold mb-2">알림함</h1>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">받은 알림</h2>
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="w-full h-10 px-4 pr-10 border border-gray-300 rounded"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* 선택 삭제 버튼 */}
        {alerts.some((alert) => alert.selected) && (
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {alerts.filter((alert) => alert.selected).length}개의 알림 선택됨
            </span>
            <button
              onClick={deleteSelectedAlerts}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              선택 삭제
            </button>
          </div>
        )}

        {/* 알림 테이블 */}
        <div className="w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#FCFCFD]">
              <tr>
                <th className="w-16 p-4 border-b border-[#EAECF0]">
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={toggleSelectAll}
                    className="w-5 h-5 rounded border border-[#D0D5DD] bg-white cursor-pointer"
                  />
                </th>
                <th className="w-16 p-4 border-b border-[#EAECF0]">
                  <span className="text-sm font-medium text-[#667085]">
                    읽음
                  </span>
                </th>
                <th className="p-4 text-left border-b border-[#EAECF0]">
                  <span className="text-sm font-medium text-[#667085]">
                    보낸사람
                  </span>
                </th>
                <th className="p-4 text-left border-b border-[#EAECF0]">
                  <span className="text-sm font-medium text-[#667085]">
                    내용
                  </span>
                </th>
                <th className="w-44 p-4 text-left border-b border-[#EAECF0]">
                  <span className="text-sm font-medium text-[#667085]">
                    날짜
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr
                  key={alert.id}
                  onClick={() => openAlertDetail(alert)}
                  className={`border-b border-[#EAECF0] hover:bg-gray-50 transition-colors cursor-pointer ${
                    alert.selected ? "bg-blue-50" : ""
                  } ${!alert.read ? "font-bold" : ""}`}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={alert.selected}
                        onChange={() => toggleAlertSelection(alert.id)}
                        className="w-5 h-5 rounded border border-[#D0D5DD] bg-white cursor-pointer"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      {alert.read ? (
                        <IoMailOpenOutline color="gray" />
                      ) : (
                        <IoMail color="lightblue" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-sm ${
                        !alert.read ? "text-[#344054]" : "text-[#475467]"
                      }`}
                    >
                      {alert.sender}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-sm ${
                        !alert.read ? "text-[#344054]" : "text-[#475467]"
                      }`}
                    >
                      {alert.content}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-sm ${
                        !alert.read ? "text-[#344054]" : "text-[#667085]"
                      }`}
                    >
                      {alert.date}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 알림 상세보기 모달 */}
        {selectedDetailAlert && (
          <AlertDetail alert={selectedDetailAlert} onClose={closeAlertDetail} />
        )}
      </div>
    </div>
  );
};

export default AlertPage;
