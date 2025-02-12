import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DonationFieldSelect from "../components/payment/DonationFieldSelect";
import PatronInformation from "../components/payment/PatronInformation";
import api from "../api"; // api.js import 추가

const DonationPage = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(30000);
  const [customAmount, setCustomAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentDay, setPaymentDay] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [donationType, setDonationType] = useState("shelter");
  const [donationMode, setDonationMode] = useState("monthly");
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
  });

  const amounts = [10000, 30000, 50000, 100000];

  const [donor, setDonor] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchDonorInfo = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/member/myinfo");
        console.log("API 응답 데이터:", JSON.stringify(response.data, null, 2));

        const user = response.data.user || response.data; // user 객체가 있으면 사용
        setDonor({
          id: user.userId,
          name: user.name,
          phone: user.phone,
          email: user.email,
        });

        console.log("donor 상태 설정 직후:", {
          id: user.userId,
          name: user.name,
          phone: user.phone,
          email: user.email,
        });
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonorInfo();
  }, []);

  // setDonationMode 함수를 수정하여 초기화 로직 추가
  const resetDonationFields = (mode) => {
    setSelectedAmount(30000);
    setCustomAmount("");
    setPaymentDay("");
    setSelectedMethod("");
    setAgreements({
      all: false,
      terms: false,
      privacy: false,
    });

    // 정기후원으로 변경 시 결제일 초기화
    if (mode === "monthly") {
      setPaymentDay("");
    }
  };

  // customer_uid를 고유하게 생성
  const customer_uid = `${donor.id}_${new Date().getTime()}`;

  // 유효성 검사 함수
  const validateDonation = () => {
    // 공통 검증 사항
    if (!donationType) {
      alert("후원 분야를 선택해주세요.");
      return false;
    }

    if (!selectedAmount || selectedAmount <= 0) {
      alert("올바른 후원 금액을 입력해주세요.");
      return false;
    }

    // 정기후원 전용 검증
    if (donationMode === "monthly") {
      if (!paymentDay) {
        alert("정기후원일을 선택해주세요.");
        return false;
      }
    }

    if (!selectedMethod) {
      alert("결제 수단을 선택해주세요.");
      return false;
    }

    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.");
      return false;
    }

    // 후원 분야별 검증
    // if (donationType === "shelter" && !searchTerm.trim()) {
    //   alert("후원할 보호소를 선택해주세요.");
    //   return false;
    // }

    // if (donationType === "individual" && !searchTerm.trim()) {
    //   alert("후원할 유기동물을 선택해주세요.");
    //   return false;
    // }

    return true;
  };

  // 약관 동의 처리 함수
  const handleAgreementChange = (type) => {
    if (type === "all") {
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        terms: newValue,
        privacy: newValue,
      });
    } else {
      const newAgreements = {
        ...agreements,
        [type]: !agreements[type],
      };
      // all 체크 상태 업데이트
      newAgreements.all = newAgreements.terms && newAgreements.privacy;
      setAgreements(newAgreements);
    }
  };

  // 정기결제 처리 함수
  const handleMonthlyPayment = () => {
    if (!validateDonation()) return;

    const { IMP } = window;
    IMP.init("imp18166354");

    const paymentData = {
      pg: selectedMethod === "card" ? "tosspayments" : "kakaopay.TCSUBSCRIP",
      pay_method: "card",
      merchant_uid: `billing_${new Date().getTime()}`,
      name: "정기후원 결제수단 등록",
      amount: selectedAmount,
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
            donatedDate: paymentDay,
            dataSource: donationType === "shelter" ? "shelter" : "animal",
            relationalId: donationType === "shelter" ? 10 : 41,
            amount: selectedAmount,
          };

          console.log("서버로 전송할 데이터:", serverData);

          const result = await api.post(
            "/donation/monthly/register",
            serverData
          );
          console.log("서버 성공 응답:", result.data);

          alert("✅ 결제수단 등록이 완료되었습니다!");
        } catch (error) {
          console.error("상세 에러 정보:", error);
          alert(`결제수단 등록 중 오류가 발생했습니다.\n${error.message}`);
        }
      } else {
        alert("❌ 결제수단 등록 실패: " + response.error_msg);
      }
    });
  };

  const handleGeneralPayment = () => {
    if (!validateDonation()) return;

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
      console.log("포트원 응답:", response);

      if (response.success) {
        try {
          const serverData = {
            ...response,
            donationType: "general",
            dataSource: donationType === "shelter" ? "shelter" : "animal",
            relationalId: donationType === "shelter" ? 10 : 41,
          };

          console.log("서버로 전송할 데이터:", serverData);

          const result = await api.post(
            "/donation/general/register",
            serverData
          );
          console.log("서버 성공 응답:", result.data);

          alert("✅ 결제가 완료되었습니다!");
          navigate("/animal");
        } catch (error) {
          console.error("상세 에러 정보:", error);
          alert(`결제 처리 중 오류가 발생했습니다.\n${error.message}`);
        }
      } else {
        alert("❌ 결제 실패: " + response.error_msg);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10">
      <div className="max-w-5xl mx-auto">
        {/* 탭 버튼 */}
        <div className="flex pb-5">
          <button
            className={`flex-1 py-3 font-medium ${
              donationMode === "monthly"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => {
              setDonationMode("monthly");
              resetDonationFields("monthly");
            }}
          >
            정기후원
          </button>
          <button
            className={`flex-1 py-3 font-medium ${
              donationMode === "general"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => {
              setDonationMode("general");
              resetDonationFields("general");
            }}
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
                        checked={agreements.all}
                        onChange={() => handleAgreementChange("all")}
                        className="w-5 h-5 border-gray-300 rounded"
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
                        checked={agreements.terms}
                        onChange={() => handleAgreementChange("terms")}
                        className="w-5 h-5 border-gray-300 rounded"
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
                        checked={agreements.privacy}
                        onChange={() => handleAgreementChange("privacy")}
                        className="w-5 h-5 border-gray-300 rounded"
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
                  후원하기
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
