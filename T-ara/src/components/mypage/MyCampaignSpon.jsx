// src/components/MyCampaignSpon.jsx
import React, { useState, useEffect } from "react";
import CommonComponent from "./CommonComponent";
import api from "../../api";

// 로컬 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

const MyCampaignSpon = () => {
  const [selectedSort, setSelectedSort] = useState("latest");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 실제 사용자 ID (localStorage의 userId 사용)
  const userId = localStorage.getItem("userId");

  const handleSortChange = (sortKey) => {
    setSelectedSort(sortKey);
  };

  // 오늘 날짜 (후원상태 계산에 사용)
  const today = new Date();
  const getDonationStatus = (createdAtStr) => {
    // createdAt이 없으면 기본 날짜 사용
    const dateStr = createdAtStr ? createdAtStr.split(" ")[0] : "2025-02-18";
    const donationDate = new Date(dateStr);
    const diffMs = today - donationDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= 1 ? "결제완료" : "입금완료";
  };

  useEffect(() => {
    setData([]);
    setLoading(true);
    setError(null);

    api
      .get(`/donation/search?userId=${userId}&limit=100`)
      .then((response) => {
        const donationHistory = response.data;
        // 캠페인 후원: donationCategory가 "campaign"인 데이터만 필터링
        const campaignDonations = donationHistory.filter(
          (item) => item.donationCategory === "campaign"
        );
        // console.log("Campaign Donations:", campaignDonations);
        // 매핑: 각 항목을 필요한 형태로 변환
        const defaultStart = "2025-02-18";
        const mappedData = campaignDonations.map((item, index) => {
          let startDate;
          if (item.createdAt) {
            const datePart = item.createdAt.split(" ")[0];
            startDate = datePart.replace(/-/g, ".");
          } else {
            startDate = defaultStart.replace(/-/g, ".");
          }
          return {
            no: index + 1,
            category: "캠페인후원",
            startDate: startDate,
            amount: Number(item.donationAmount).toLocaleString() + "원",
            status: getDonationStatus(item.createdAt),
            donationAt: item.createdAt,
            donationAmount: item.donationAmount,
          };
        });
        setData(mappedData);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  // 정렬 적용
  const sortedData = [...data].sort((a, b) => {
    if (selectedSort === "latest") {
      return new Date(b.donationAt || 0) - new Date(a.donationAt || 0);
    } else if (selectedSort === "oldest") {
      return new Date(a.donationAt || 0) - new Date(b.donationAt || 0);
    } else if (selectedSort === "high") {
      return b.donationAmount - a.donationAmount;
    } else if (selectedSort === "low") {
      return a.donationAmount - b.donationAmount;
    }
    return 0;
  });

  // 페이지네이션 계산 (여기서는 단순히 전체 데이터를 보여줌)
  // 필요한 경우 페이지네이션 로직 추가 가능

  return (
    <div className="grid grid-row-3 gap-4">
      <CommonComponent />
      <div className="w-full bg-white p-6 row-span-2 shadow-md rounded">
        <div className="flex items-center justify-between mt-3 mb-4 gap-2">
          <h1 className="font-black text-3xl">캠페인 후원</h1>
          <div className="flex items-center gap-3">
            <input
              type="date"
              className="p-2 border border-gray-200 shadow-sm w-[130px]"
            />
            <span>-</span>
            <input
              type="date"
              className="p-2 border border-gray-200 shadow-sm w-[130px]"
            />
          </div>
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => handleSortChange("latest")}
              className={`px-2 py-1 text-sm cursor-pointer ${
                selectedSort === "latest"
                  ? "font-bold text-black"
                  : "text-gray-500"
              }`}
            >
              최신순
            </button>
            <span className="text-xs text-gray-300">|</span>
            <button
              onClick={() => handleSortChange("oldest")}
              className={`px-2 py-1 text-sm cursor-pointer ${
                selectedSort === "oldest"
                  ? "font-bold text-black"
                  : "text-gray-500"
              }`}
            >
              과거순
            </button>
            <span className="text-xs text-gray-300">|</span>
            <button
              onClick={() => handleSortChange("high")}
              className={`px-2 py-1 text-sm cursor-pointer ${
                selectedSort === "high"
                  ? "font-bold text-black"
                  : "text-gray-500"
              }`}
            >
              금액높은순
            </button>
            <span className="text-xs text-gray-300">|</span>
            <button
              onClick={() => handleSortChange("low")}
              className={`px-2 py-1 text-sm cursor-pointer ${
                selectedSort === "low"
                  ? "font-bold text-black"
                  : "text-gray-500"
              }`}
            >
              금액낮은순
            </button>
          </div>
        </div>
        <hr />
        {loading ? (
          <div className="text-center py-10">로딩 중...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            후원 내역을 불러오는데 실패했습니다.
          </div>
        ) : sortedData.length === 0 ? (
          <div className="text-center py-10 text-black font-bold h-[278px]">
            후원 내역이 없습니다.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="h-[55px]">
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                  No
                </th>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                  후원분야
                </th>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                  후원일자
                </th>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                  후원금액
                </th>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                  후원상태
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.category}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.startDate}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.amount}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <hr />
        {/* 페이지네이션 컨트롤 (필요시 추가 구현) */}
        {false && (
          <div className="flex justify-center mt-6">
            <button className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100">
              &lt;&lt;
            </button>
            <button className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100">
              1
            </button>
            <button className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100">
              &gt;&gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCampaignSpon;
