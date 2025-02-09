import React, { useState } from "react";
import DonationFieldSelect from "../components/payment/DonationFieldSelect";
import PatronInformation from "../components/payment/PatronInformation";

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(30000);
  const [customAmount, setCustomAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentDay, setPaymentDay] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [donationType, setDonationType] = useState("shelter"); // 'shelter' or 'individual'
  const [donationMode, setDonationMode] = useState("monthly");

  const token = localStorage.getItem("authToken"); // 저장된 JWT 토큰 가져오기

  const amounts = [10000, 30000, 50000, 100000];

  const donor = {
    name: "박주찬",
    phone: "010-8508-8650",
    email: "p990805@naver.com",
  };

  // customer_uid를 고유하게 생성
  const customer_uid = `${donor.id}_${new Date().getTime()}`;

  // 정기결제 처리 함수
  const handleMonthlyPayment = () => {
    const { IMP } = window;
    IMP.init("imp18166354");

    const paymentData = {
      pg: selectedMethod === "card" ? "tosspayments" : "kakaopay.TCSUBSCRIP",
      pay_method: "card",
      merchant_uid: `billing_${new Date().getTime()}`,
      name: "정기후원 결제수단 등록",
      amount: 0,
      customer_uid: customer_uid,
      buyer_email: donor.email,
      buyer_name: donor.name,
      buyer_tel: donor.phone,
    };

    IMP.request_pay(paymentData, async (response) => {
      console.log("포트원 응답:", response);

      if (response.success) {
        try {
          const serverData = {
            ...response,
            donationType: "monthly",
            dataSource: donationType === "shelter" ? "shelter" : "animal",
            relationalId: donationType === "shelter" ? 10 : 41,
          };

          console.log("서버로 전송할 데이터:", serverData);

          const result = await fetch(
            "http://localhost:8090/donation/monthly/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
              body: JSON.stringify(serverData),
            }
          );

          console.log("서버 응답 상태:", result.status);

          if (!result.ok) {
            const errorText = await result.text();
            console.error("서버 에러 응답:", errorText);
            throw new Error(`서버 응답 오류 (${result.status}): ${errorText}`);
          }

          const resultData = await result.json();
          console.log("서버 성공 응답:", resultData);

          alert("✅ 결제수단 등록이 완료되었습니다!");
        } catch (error) {
          console.error("상세 에러 정보:", {
            message: error.message,
            stack: error.stack,
          });
          alert(`결제수단 등록 중 오류가 발생했습니다.\n${error.message}`);
        }
      } else {
        alert("❌ 결제수단 등록 실패: " + response.error_msg);
      }
    });
  };

  const handleGeneralPayment = () => {
    const { IMP } = window;
    IMP.init("imp18166354");

    const paymentData = {
      pg: selectedMethod === "card" ? "uplus" : "kakaopay",
      pay_method: selectedMethod === "card" ? "card" : "kakaopay",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "일반후원 결제",
      amount: selectedAmount,
      buyer_email: donor.email,
      buyer_name: donor.name,
      buyer_tel: donor.phone,
    };

    IMP.request_pay(paymentData, async (response) => {
      console.log("포트원 응답:", response); // 포트원 응답 확인

      if (response.success) {
        try {
          const serverData = {
            ...response, // 기존 response 데이터 유지
            donationType: "general",
            dataSource: donationType === "shelter" ? "shelter" : "animal",
            relationalId: donationType === "shelter" ? 10 : 41,
          };

          console.log("서버로 전송할 데이터:", serverData); // 전송 데이터 확인

          const result = await fetch(
            "http://i12c201.duckdns.org/donation/general/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`, // JWT 토큰 추가
              },
              body: JSON.stringify(serverData),
            }
          );

          console.log("서버 응답 상태:", result.status); // 응답 상태 확인

          if (!result.ok) {
            const errorText = await result.text();
            console.error("서버 에러 응답:", errorText); // 에러 응답 확인
            throw new Error(`서버 응답 오류 (${result.status}): ${errorText}`);
          }

          const resultData = await result.json();
          console.log("서버 성공 응답:", resultData); // 성공 응답 확인

          alert("✅ 결제가 완료되었습니다!");
        } catch (error) {
          console.error("상세 에러 정보:", {
            message: error.message,
            stack: error.stack,
          });
          alert(`결제 처리 중 오류가 발생했습니다.\n${error.message}`);
        }
      } else {
        alert("❌ 결제 실패: " + response.error_msg);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10">
      <div className="max-w-6xl mx-auto">
        {/* 탭 버튼 */}
        <div className="flex pb-5">
          <button
            className={`flex-1 py-3 font-medium ${
              donationMode === "monthly"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => setDonationMode("monthly")}
          >
            정기후원
          </button>
          <button
            className={`flex-1 py-3 font-medium ${
              donationMode === "general"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => setDonationMode("general")}
          >
            일시후원
          </button>
        </div>

        {/* 내용 부분 */}
        <div className="flex gap-6 p-4">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            {/* Main Form */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">후원분야 선택</h2>

              {/* 후원 타입 선택 */}
              <div className="space-y-4">
                {/* 보호소 후원 */}
                <div
                  className={`p-4 border rounded-md cursor-pointer ${
                    donationType === "shelter"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setDonationType("shelter")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      checked={donationType === "shelter"}
                      onChange={() => setDonationType("shelter")}
                      className="w-4 h-4 text-red-500"
                    />
                    <h3 className="text-base font-medium">보호소 후원</h3>
                  </div>
                  {donationType === "shelter" && (
                    <div className="mt-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          className="flex-1 border rounded-md py-2 px-3"
                          placeholder="보호소 검색"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="px-4 py-2 border rounded-md text-gray-600">
                          검색
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 개별 유기동물 후원 */}
                <div
                  className={`p-4 border rounded-md cursor-pointer ${
                    donationType === "individual"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setDonationType("individual")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      checked={donationType === "individual"}
                      onChange={() => setDonationType("individual")}
                      className="w-4 h-4 text-red-500"
                    />
                    <h3 className="text-base font-medium">
                      개별 유기동물 후원
                    </h3>
                  </div>
                  {donationType === "individual" && (
                    <div className="mt-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          className="flex-1 border rounded-md py-2 px-3"
                          placeholder="[광주 동물보호소] 맥스"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="px-4 py-2 border rounded-md text-gray-600">
                          검색
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-4 mt-4">
                <div className="flex space-x-2">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      className={`flex-1 py-2 rounded-md border ${
                        selectedAmount === amount
                          ? "border-red-500 text-red-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedAmount(amount)}
                    >
                      {amount.toLocaleString()}원
                    </button>
                  ))}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full border rounded-md py-2 px-3"
                      placeholder="직접 입력"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (e.target.value)
                          setSelectedAmount(parseInt(e.target.value));
                      }}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      원
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-gray-600">총 후원금액</span>
                  <span className="text-xl">
                    월 {selectedAmount.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-medium mb-4">결제수단</h2>

              {/* 정기결제일 선택 - 정기후원일 때만 표시 */}
              {donationMode === "monthly" && (
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">정기후원일</h3>
                  <div className="flex gap-2">
                    {[5, 15, 25].map((day) => (
                      <button
                        key={day}
                        onClick={() => setPaymentDay(day)}
                        className={`flex-1 py-2 rounded-md border ${
                          paymentDay === day
                            ? "bg-red-500 text-white border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        {day}일
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* 결제수단 선택 */}
              <div className="space-y-4">
                {/* 신용카드 */}
                <div
                  className={`p-4 border rounded-md cursor-pointer ${
                    selectedMethod === "card"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod("card")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      checked={selectedMethod === "card"}
                      onChange={() => setSelectedMethod("card")}
                      className="w-4 h-4 text-red-500"
                    />
                    <h3 className="text-base font-medium">신용카드</h3>
                  </div>
                  {selectedMethod === "card" && (
                    <p className="text-sm text-gray-600 mt-2">
                      {donationMode === "monthly" ? (
                        <>
                          매월 {paymentDay}일에{" "}
                          {selectedAmount.toLocaleString()}원이 자동으로
                          결제됩니다.
                        </>
                      ) : (
                        <>{selectedAmount.toLocaleString()}원이 결제됩니다.</>
                      )}
                    </p>
                  )}
                </div>

                {/* 카카오페이 */}
                <div
                  className={`p-4 mb-6 border rounded-md cursor-pointer ${
                    selectedMethod === "kakaopay"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod("kakaopay")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      checked={selectedMethod === "kakaopay"}
                      onChange={() => setSelectedMethod("kakaopay")}
                      className="w-4 h-4 text-red-500"
                    />
                    <h3 className="text-base font-medium">카카오페이</h3>
                  </div>
                  {selectedMethod === "kakaopay" && (
                    <p className="text-sm text-gray-600 mt-2">
                      {donationMode === "monthly" ? (
                        <>
                          매월 {paymentDay}일에{" "}
                          {selectedAmount.toLocaleString()}원이 자동으로
                          결제됩니다.
                        </>
                      ) : (
                        <>{selectedAmount.toLocaleString()}원이 결제됩니다.</>
                      )}
                    </p>
                  )}
                </div>

                {/* 약관 동의 */}
                <div className="space-y-4">
                  <h3 className="text-base font-medium mb-3">약관동의</h3>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="allAgree"
                        className="w-5 h-5 border-gray-300 rounded"
                        onChange={() => {}}
                      />
                      <label htmlFor="allAgree" className="text-gray-900">
                        모두 동의합니다.
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="termsAgree"
                        className="w-5 h-5 border-gray-300 rounded"
                        onChange={() => {}}
                      />
                      <label htmlFor="termsAgree" className="flex items-center">
                        <span className="text-red-500">(필수)</span>
                        <span className="ml-1">이용약관</span>
                      </label>
                    </div>
                    <button className="text-gray-500 text-sm">
                      자세히보기
                    </button>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="privacyAgree"
                        className="w-5 h-5 border-gray-300 rounded"
                        onChange={() => {}}
                      />
                      <label
                        htmlFor="privacyAgree"
                        className="flex items-center"
                      >
                        <span className="text-red-500">(필수)</span>
                        <span className="ml-1">
                          개인정보 수집 및 이용에 동의합니다.
                        </span>
                      </label>
                    </div>
                    <button className="text-gray-500 text-sm">
                      자세히보기
                    </button>
                  </div>
                </div>

                {/* 결제하기 버튼 */}
                <button
                  onClick={
                    donationMode === "monthly"
                      ? handleMonthlyPayment
                      : handleGeneralPayment
                  }
                  className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors mt-6"
                >
                  {selectedMethod === "kakaopay"
                    ? "카카오페이로 시작하기"
                    : "카드 등록하기"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-80 sticky top-4 h-fit">
            <DonationFieldSelect
              amount={selectedAmount}
              donationMode={donationMode}
              donationType={donationType}
            />
            <PatronInformation donor={donor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
