// src/components/MyRegularSpon.jsx
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

const MyRegularSpon = () => {
  // 정렬 관련 state
  const [selectedSort, setSelectedSort] = useState("latest");
  // API에서 매핑된 데이터 저장
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 실제 사용자 ID (localStorage의 userId 사용)
  const userId = localStorage.getItem("userId");

  const handleSortChange = (sortKey) => {
    setSelectedSort(sortKey);
  };

  // // 후원 취소 핸들러
  // const handleCancel = async (donationHistoryId) => {
  //   if (!window.confirm("후원을 취소하시겠습니까?")) return;
  //   try {
  //     // 예시: 취소 API 엔드포인트 호출 (요청 방식은 상황에 맞게 조정)
  //     const response = await api.get(`/donation/cancel/${monthlyId}`);
  //     alert(response.data.message);
  //     // 취소 완료 후 목록에서 해당 항목 제거
  //     setData((prev) =>
  //       prev.filter((item) => item.donationHistoryId !== donationHistoryId)
  //     );
  //   } catch (error) {
  //     console.error("후원 취소 오류:", error);
  //     alert("후원 취소에 실패하였습니다. 다시 시도해주세요.");
  //   }
  // };

  useEffect(() => {
    // API 호출 전 상태 초기화
    setData([]);
    setLoading(true);
    setError(null);

    api
      .get(`/donation/search?userId=${userId}&limit=100`)
      .then((response) => {
        const donationHistory = response.data;
        // 전체 후원 내역 배열에서 정기 후원 (monthly)만 필터링
        const monthlyDonations = donationHistory.filter(
          (item) => item.donationCategory === "monthly"
        );
        // console.log("전체 후원 내역:", donationHistory);
        // API 데이터를 테이블에서 사용할 형태로 변환
        const defaultStart = "2025-02-18";
        const mappedData = monthlyDonations.map((item, index) => {
          let startDate;
          if (item.createdAt) {
            const datePart = item.createdAt.split(" ")[0];
            startDate = datePart.replace(/-/g, ".");
          } else {
            startDate = defaultStart.replace(/-/g, ".");
          }
          // 후원내역: dataSource가 "animal"이면 "동물", 그렇지 않으면 "보호소"
          const donationDetails =
            item.dataSource === "animal" ? "동물" : "보호소";
          // 후원상태: status가 "active"이면 "후원중", 그렇지 않으면 "후원 종료"
          const donationStatus =
            item.status === "active" ? "후원중" : "후원 종료";
          return {
            no: index + 1,
            category: "정기후원", // 후원분야 고정
            startDate, // 후원시작일
            details: donationDetails, // 후원내역
            amount: Number(item.donationAmount).toLocaleString() + "원", // 후원금액
            status: donationStatus, // 후원상태
            donationHistoryId: item.donationHistoryId, // 후원 취소에 필요
            donationAt: item.createdAt, // 정렬 등에 사용
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

  return (
    <div className="grid grid-row-3 gap-4">
      <CommonComponent />
      <div className="w-full bg-white p-6 row-span-2 shadow-md rounded">
        <div className="flex items-center justify-between mt-3 mb-4 gap-2">
          <h1 className="font-black text-3xl">정기 후원</h1>
          {/* 날짜 선택 영역 (필요 시 날짜 범위로 검색 추가 가능) */}
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
                  후원시작일
                </th>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                  후원내역
                </th>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                  후원금액
                </th>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                  후원상태
                </th>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                  후원취소
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.no}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.category}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.startDate}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.details}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.amount}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.status}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {item.status === "후원중" ? (
                      <button
                        onClick={() => handleCancel(item.donationHistoryId)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400 text-xs"
                      >
                        후원취소
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <hr />
        <div className="flex justify-center mt-6">
          {/* 페이지네이션 컨트롤 (필요시 추가 구현) */}
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
      </div>
    </div>
  );
};

export default MyRegularSpon;
