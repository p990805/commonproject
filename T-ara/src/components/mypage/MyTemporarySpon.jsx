// src/components/MyTemporarySpon.jsx
import CommonComponent from "./CommonComponent";
import { useState, useEffect } from "react";
import api from "../../api";

// 로컬 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

const MyTemporarySpon = () => {
  const [selectedSort, setSelectedSort] = useState("latest");
  const [data, setData] = useState([]);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 10; // 한 페이지에 표시할 후원 내역 수

  const handleSortChange = (sortKey) => {
    setSelectedSort(sortKey);
  };

  // 오늘 날짜 (후원상태 계산에 사용)
  const today = new Date();
  const getDonationStatus = (createdAtStr) => {
    // createdAt이 없으면 기본 날짜 사용
    const dateStr = createdAtStr ? createdAtStr.split(" ")[0] : "2025-02-18";
    const donationDate = new Date(dateStr);
    // 두 날짜의 차이를 일(day) 단위로 계산
    const diffMs = today - donationDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "입금완료" : "결제완료";
  };

  const fetchDonationHistory = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.get(
        `/donation/search?userId=${userId}&limit=100`
      );
      // console.log("API response:", response);
      const donationHistory = response.data;
      // 전체 후원 내역에서 donationCategory가 "general" 인 항목만 필터링 (일시 후원)
      const filteredHistory = donationHistory.filter(
        (item) => item.donationCategory === "general"
      );
      // 매핑: 필요한 데이터 필드를 새 객체로 생성
      const defaultStart = "2025-02-18";
      const mappedData = filteredHistory.map((item, index) => {
        let startDate;
        if (item.createdAt) {
          const datePart = item.createdAt.split(" ")[0];
          startDate = datePart.replace(/-/g, ".");
        } else {
          startDate = defaultStart.replace(/-/g, ".");
        }
        const formattedAmount =
          Number(item.donationAmount).toLocaleString() + "원";
        const donationStatus = getDonationStatus(item.createdAt);
        return {
          no: index + 1, // 임시 순번 (나중에 페이지네이션 적용 시 재계산)
          category: "일시후원",
          startDate,
          amount: formattedAmount,
          status: donationStatus,
          donationAt: item.createdAt,
          donationAmount: item.donationAmount,
        };
      });
      setData(mappedData);
    } catch (error) {
      console.error("후원 내역을 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  // 페이지네이션 계산
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = data.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );
  const totalPages = Math.ceil(data.length / donationsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 정렬 적용 (정렬은 전체 데이터가 아니라 현재 페이지 데이터에 적용)
  const sortedData = [...currentDonations].sort((a, b) => {
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

  return (
    <div className="grid grid-row-3 gap-4">
      <CommonComponent />
      <div className="w-full bg-white p-6 row-span-2 shadow-md rounded">
        <div className="flex items-center justify-between mt-3 mb-4 gap-2">
          <h1 className="font-black text-3xl">일시 후원</h1>
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
          {sortedData.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-black py-10 font-bold h-[278px]"
                >
                  후원 내역이 없습니다.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {indexOfFirstDonation + index + 1}
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
          )}
        </table>

        <hr />

        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNumber
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTemporarySpon;
