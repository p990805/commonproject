import React, { useState, useEffect } from "react";
import CommonComponent from "./CommonComponent";

const MyRegularSpon = () => {
  // 정렬 관련 state
  const [selectedSort, setSelectedSort] = useState("latest");
  // 후원 상태: "ing" → 후원중, "ed" → 후원 종료
  const [selectSpon, setSelectSpon] = useState("ing");
  // API에서 매핑된 데이터 저장
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 실제 사용자 ID (예시로 8번 사용자)
  const userId = localStorage.getItem("userId");

  const handleSelectChange = (choose) => {
    setSelectSpon(choose);
  };

  const handleSortChange = (sortkey) => {
    setSelectedSort(sortkey);
  };

  useEffect(() => {
    // API 호출 전 상태 초기화
    setData([]);
    setLoading(true);
    setError(null);

    fetch(`/donation/history/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        return res.json();
      })
      .then((donationHistory) => {
        // donationHistory는 전체 후원 내역 배열입니다.
        // 정기 후원 (monthly)만 필터링
        const monthlyDonations = donationHistory.filter(
          (item) => item.dataSource === "monthly"
        );
        // API 데이터를 테이블에서 사용할 형태로 변환
        const mappedData = monthlyDonations.map((item, index) => {
          // 후원시작일과 다음결제일 계산
          let startDate = "등록되지 않았습니다.";
          let nextPayment = "등록되지 않았습니다.";
          if (item.donationAt) {
            const datePart = item.donationAt.slice(0, 10);
            startDate = datePart.replace(/-/g, ".");
            // 다음결제일: donationAt에 한 달을 더함
            const donationDate = new Date(item.donationAt);
            const np = new Date(donationDate);
            np.setMonth(np.getMonth() + 1);
            nextPayment = np.toISOString().slice(0, 10).replace(/-/g, ".");
          }
          // 후원상태: relationalId가 0이면 후원중, 그 외는 후원 종료
          const status = item.relationalId === 0 ? "후원중" : "후원 종료";
          return {
            no: index + 1,
            category: "정기 후원", // 후원분야 (고정)
            startDate, // 후원시작일
            details: "자동 결제", // 후원내역 (고정)
            amount: item.donationAmount + "원", // 후원금액
            status, // 후원상태
            nextPayment, // 다음결제일
            // 추가 정렬에 사용될 원본 데이터
            donationAt: item.donationAt,
            donationAmount: item.donationAmount,
          };
        });
        setData(mappedData);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  // 선택한 후원 상태에 따라 데이터 필터링 ("ing"이면 후원중, "ed"이면 후원 종료)
  const filteredData = data.filter((item) =>
    selectSpon === "ing" ? item.status === "후원중" : item.status === "후원 종료"
  );

  // 정렬 적용
  const sortedData = [...filteredData].sort((a, b) => {
    if (selectedSort === "latest") {
      // 최신순: donationAt 내림차순 (날짜가 없는 경우는 뒤로)
      return new Date(b.donationAt || 0) - new Date(a.donationAt || 0);
    } else if (selectedSort === "oldest") {
      // 과거순: donationAt 오름차순
      return new Date(a.donationAt || 0) - new Date(b.donationAt || 0);
    } else if (selectedSort === "high") {
      // 금액높은순
      return b.donationAmount - a.donationAmount;
    } else if (selectedSort === "low") {
      // 금액낮은순
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
        <div className="flex w-full items-center justify-center my-5">
          <button
            onClick={() => handleSelectChange("ing")}
            className={`p-3 cursor-pointer w-[50%] ${
              selectSpon === "ing"
                ? "text-white bg-red-500"
                : "text-gray-400 bg-white shadow-md border border-gray-200"
            }`}
          >
            후원중
          </button>
          <button
            onClick={() => handleSelectChange("ed")}
            className={`p-3 cursor-pointer w-[50%] ${
              selectSpon === "ed"
                ? "text-white bg-red-500"
                : "text-gray-400 bg-white shadow-md border border-gray-200"
            }`}
          >
            후원 종료
          </button>
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
                후원시작일
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                후원내역
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                후원금액
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                후원상태
              </th>
              <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                다음결제일
              </th>
            </tr>
          </thead>
          {sortedData.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan="7"
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
                  <td className="border px-4 py-2 text-sm">{item.no}</td>
                  <td className="border px-4 py-2 text-sm">{item.category}</td>
                  <td className="border px-4 py-2 text-sm">{item.startDate}</td>
                  <td className="border px-4 py-2 text-sm">{item.details}</td>
                  <td className="border px-4 py-2 text-sm">{item.amount}</td>
                  <td className="border px-4 py-2 text-sm">{item.status}</td>
                  <td className="border px-4 py-2 text-sm">{item.nextPayment}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
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
