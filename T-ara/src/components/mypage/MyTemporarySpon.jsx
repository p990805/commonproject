import CommonComponent from "./CommonComponent";
import { useState, useEffect } from "react";
import api from "../../api";

const MyTemporarySpon = () => {
  const [selectedSort, setSelectedSort] = useState("latest");
  const [data, setData] = useState([]);
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 10; // 한 페이지에 표시할 후원 내역 수

  const handleSortChange = (sortKey) => {
    setSelectedSort(sortKey);
    // 정렬 로직이 필요하면 여기에 추가
  };

  const fetchDonationHistory = async () => {
    try {
      const userId = 8; // userId는 상황에 맞게 설정하세요.
      const response = await api.get(`/donation/history/${userId}`);
      // API에서 받은 전체 내역 중 dataSource가 "general"인 데이터만 필터링
      const donationHistory = response.data;
      const filteredHistory = donationHistory.filter(
        (item) => item.dataSource === "general"
      );
      setData(filteredHistory);
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
  const currentDonations = data.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(data.length / donationsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid grid-row-3 gap-4">
      <CommonComponent />
      <div className="w-full bg-white p-6 row-span-2 shadow-md rounded">
        <div className="flex items-center justify-between mt-3 mb-4 gap-2">
          <h1 className="font-black text-3xl">일시 후원</h1>
          <div className="flex items-center gap-3">
            <input type="date" className="p-2 border border-gray-200 shadow-sm w-[130px]" />
            <span>-</span>
            <input type="date" className="p-2 border border-gray-200 shadow-sm w-[130px]" />
          </div>
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => handleSortChange("latest")}
              className={`px-2 py-1 text-sm cursor-pointer ${
                selectedSort === "latest" ? "font-bold text-black" : "text-gray-500"
              }`}
            >
              최신순
            </button>
            <span className="text-xs text-gray-300">|</span>
            <button
              onClick={() => handleSortChange("oldest")}
              className={`px-2 py-1 text-sm cursor-pointer ${
                selectedSort === "oldest" ? "font-bold text-black" : "text-gray-500"
              }`}
            >
              과거순
            </button>
            <span className="text-xs text-gray-300">|</span>
            <button
              onClick={() => handleSortChange("high")}
              className={`px-2 py-1 text-sm cursor-pointer ${
                selectedSort === "high" ? "font-bold text-black" : "text-gray-500"
              }`}
            >
              금액높은순
            </button>
            <span className="text-xs text-gray-300">|</span>
            <button
              onClick={() => handleSortChange("low")}
              className={`px-2 py-1 text-sm cursor-pointer ${
                selectedSort === "low" ? "font-bold text-black" : "text-gray-500"
              }`}
            >
              금액낮은순
            </button>
          </div>
        </div>
        <hr />

        <div className="flex w-full my-5">
          {/* 결제/입금 상태 안내 */}
          <div className="flex gap-10">
            <div className="flex items-center gap-3">
              <p className="text-[14px] text-red-500 font-bold border-2 border-red-500 rounded-3xl py-1 w-[80px] flex items-center justify-center">
                결제완료
              </p>
              <p>후원 신청 후, 입금 확인까지 최대 7일 소요됩니다.</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="bg-red-500 text-white rounded-2xl py-1 text-[14px] w-[80px] flex items-center justify-center">
                입금완료
              </p>
              <p>입금이 완료된 내역입니다.</p>
            </div>
          </div>
        </div>
        <hr />

        <table className="w-full">
          <thead>
            <tr className="h-[55px]">
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                No
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                후원분야
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                후원일자
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                후원내역
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                후원금액
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                결제방식
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                후원상태
              </th>
            </tr>
          </thead>
          {currentDonations.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center text-black py-10 font-bold h-[278px]">
                  후원 내역이 없습니다.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentDonations.map((item, index) => (
                <tr key={index} className="text-center">
                  {/* 순번: 현재 페이지의 첫 인덱스 + index + 1 */}
                  <td className="border px-4 py-2 text-sm">
                    {indexOfFirstDonation + index + 1}
                  </td>
                  <td className="border px-4 py-2 text-sm">{item.dataSource}</td>
                  <td className="border px-4 py-2 text-sm">
                    {item.donationAt || "N/A"}
                  </td>
                  <td className="border px-4 py-2 text-sm">{item.relationalId}</td>
                  <td className="border px-4 py-2 text-sm">{item.donationAmount}</td>
                  <td className="border px-4 py-2 text-sm">{/* 결제방식 값 */}</td>
                  <td className="border px-4 py-2 text-sm">{/* 후원상태 값 */}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        <hr />

        {/* 페이지네이션 컨트롤 */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
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
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
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
