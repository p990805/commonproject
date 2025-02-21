// src/components/MyRegularSpon.jsx
import React, { useState, useEffect } from "react";
import CommonComponent from "./CommonComponent";
import api from "../../api";

const MyRegularSpon = () => {
  // 정렬 관련 state
  const [selectedSort, setSelectedSort] = useState("latest");
  // API에서 매핑된 데이터 저장
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // localStorage의 userId 사용
  const userId = localStorage.getItem("userId");

  const handleSortChange = (sortKey) => {
    setSelectedSort(sortKey);
  };

  // 후원 취소 핸들러 (POST /donation/monthly/cancel/{monthlyId})
  const handleCancel = async (monthlyId) => {
    if (!window.confirm("후원을 취소하시겠습니까?")) return;
    try {
      const response = await api.post(`/donation/monthly/cancel/${monthlyId}`);
      alert(response.data.message || "취소가 완료되었습니다.");
      // 취소 완료 후 해당 항목의 상태를 '후원 종료'로 업데이트
      setData((prevData) =>
        prevData.map((item) =>
          item.monthlyId === monthlyId ? { ...item, status: "후원 종료" } : item
        )
      );
    } catch (error) {
      console.error("후원 취소 오류:", error);
      alert("후원 취소에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    setData([]);
    setLoading(true);
    setError(null);

    // 새로운 API 엔드포인트 사용: /donation/user/{userId}
    api
      .get(`/donation/user/${userId}`)
      .then((response) => {
        const donations = response.data;
        const mappedData = donations.map((item, index) => {
          // 시작일은 startedAt을 사용하며, "YYYY-MM-DD"를 "YYYY.MM.DD"로 변환
          const startDate = item.startedAt.replace(/-/g, ".");
          // 후원내역: dataSource가 "animal"이면 "동물", "shelter"이면 "보호소"
          const donationDetails =
            item.dataSource === "animal" ? "동물" : "보호소";
          // 후원금액 포맷 (원 단위 천단위 콤마 추가)
          const amountFormatted = Number(item.amount).toLocaleString() + "원";
          // 후원상태: canceledAt이 없으면 "후원중", 있으면 "후원 종료"
          const donationStatus = !item.canceledAt ? "후원중" : "후원 종료";

          return {
            no: index + 1,
            category: "정기후원",
            startDate,
            details: donationDetails,
            amount: amountFormatted,
            status: donationStatus,
            monthlyId: item.monthlyId, // 후원 취소에 사용
            donationAt: item.startedAt, // 정렬 기준 날짜
            donationAmount: item.amount,
          };
        });
        setData(mappedData);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  // 선택한 정렬 방식에 따라 데이터 정렬
  const sortedData = [...data].sort((a, b) => {
    if (selectedSort === "latest") {
      return new Date(b.donationAt) - new Date(a.donationAt);
    } else if (selectedSort === "oldest") {
      return new Date(a.donationAt) - new Date(b.donationAt);
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
                        onClick={() => handleCancel(item.monthlyId)}
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
