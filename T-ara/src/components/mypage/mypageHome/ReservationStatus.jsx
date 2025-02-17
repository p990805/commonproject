import { Link } from "react-router-dom";

const ReservationStatus = () => {
  // 임시로 사용할 목업 데이터
  const reservations = [
    {
      id: 1,
      name: "맥스",
      date: "24.12.13 토 오후 5:00",
      status: "예약대기", // "예약대기", "완료", "취소" 등을 가정
    },
    {
      id: 2,
      name: "맥스",
      date: "24.11.13 토 오후 5:00",
      status: "완료",
    },
    {
      id: 3,
      name: "맥스",
      date: "24.10.13 토 오후 5:00",
      status: "취소",
    },
  ];

  // 상태에 따라 배경색, 글자색을 Tailwind로 지정하는 함수
  const getStatusColor = (status) => {
    switch (status) {
      case "예약대기":
        // 예: 회색 배경 + 회색 글씨
        return "bg-gray-100 text-gray-600";
      case "완료":
        // 예: 연한 초록 배경 + 진한 초록 글씨
        return "bg-green-100 text-green-600";
      case "취소":
        // 예: 연한 빨강 배경 + 진한 빨강 글씨
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm">
      {/* 상단 영역: 제목과 "+상세보기" 링크 */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">산책 예약현황</h2>
        <Link
          to="/reservation"
          className="text-gray-400 hover:underline text-sm font-medium"
        >
          +더보기
        </Link>
      </div>

      {/* 예약 목록 영역 */}
      <div className="space-y-2">
        {reservations.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b p-2"
          >
            {/* 왼쪽: [맥스] 날짜/시간 */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">[{item.name}]</span>
              <span className="text-gray-700">{item.date}</span>
            </div>

            {/* 오른쪽: 상태 표시 */}
            <div>
              <span
                className={`px-2 py-1 rounded text-[8px] ${getStatusColor(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationStatus;
