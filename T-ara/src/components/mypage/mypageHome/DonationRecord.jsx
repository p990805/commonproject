import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api"; // axios 인스턴스 임포트 (경로에 주의하세요)

const DonationRecord = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // 실제 사용자 ID (예시로 localStorage에 저장된 userId 사용)
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setLoading(true);
    api.get(`/donation/history/${userId}`)
      .then((response) => {
        const data = response.data;
        // donation history 객체 배열을 UI에서 사용할 형태로 변환
        const mappedDonations = data.map((item) => {
          let type, where;
          if (item.dataSource === "monthly") {
            type = "정기";
            where = "보호소";
          } else if (item.dataSource === "general") {
            type = "일시";
            where = "유기동물";
          } else {
            type = "캠페인";
            where = "유기동물";
          }
          // donationAt이 null이면 "등록되지 않았습니다."를 표시
          let dateStr = "등록되지 않았습니다.";
          if (item.donationAt) {
            // 예: "2025-02-17T07:06:17" → "2025.02.17"
            const datePart = item.donationAt.slice(0, 10);
            dateStr = datePart.replace(/-/g, ".");
          }
          return {
            id: item.historyId,
            type,
            where,
            content: `후원금 ${item.donationAmount}원`,
            date: dateStr,
          };
        });
        // 최신 후원 내역이 위쪽에 오도록 내림차순 정렬 (historyId 기준)
        const sortedDonations = mappedDonations.sort((a, b) => b.id - a.id);
        // 최신 5개만 선택
        setDonations(sortedDonations.slice(0, 5));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  const getStatusColor = (type) => {
    switch (type) {
      case "정기":
        return "bg-red-500 text-white";
      case "일시":
        return "border border-red-500 text-red-500";
      case "캠페인":
        return "border border-orange-500 text-orange-500";
      default:
        return "border border-red-500 text-red-500";
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">후원내역</h2>
        <Link
          to="/mypage/regularspon"
          className="text-gray-400 hover:underline text-sm font-medium"
        >
          +더보기
        </Link>
      </div>

      {loading ? (
        <div>로딩중...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : (
        <div className="space-y-2">
          {donations.length > 0 ? (
            donations.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                {/* 왼쪽 영역: 후원 타입, where, 후원 내용 */}
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm flex items-center justify-center align-middle rounded-2xl py-1 px-2 font-semibold ${getStatusColor(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>
                  <span className="text-sm text-gray-700">[{item.where}]</span>
                  <span className="text-sm text-gray-700">{item.content}</span>
                </div>
                {/* 오른쪽 영역: 후원일 */}
                <div>
                  <span className="text-gray-500 text-sm">
                    후원일 {item.date}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-4">후원내역이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DonationRecord;
