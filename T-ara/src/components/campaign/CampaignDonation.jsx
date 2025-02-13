import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; 

const CampaignDonation = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(30000); // 기본값 설정
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
  });
  const navigate = useNavigate();

  // 에러 상태 추가
  const [errors, setErrors] = useState({
    amount: "",
    paymentMethod: "",
    agreements: "",
  });

  const amounts = [10000, 30000, 50000, 100000];
  const [customAmount, setCustomAmount] = useState("");

  const donor = {
    name: "박주찬",
    phone: "010-8508-8650",
    email: "p990805@naver.com",
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

  // 유효성 검사 함수
  const validateDonation = () => {
    const newErrors = {
      amount: "",
      paymentMethod: "",
      agreements: "",
    };
    let isValid = true;

    if (!selectedAmount || selectedAmount <= 0) {
      newErrors.amount = "후원 금액을 선택해주세요.";
      isValid = false;
    }

    if (!selectedMethod) {
      newErrors.paymentMethod = "결제 수단을 선택해주세요.";
      isValid = false;
    }

    if (!agreements.terms || !agreements.privacy) {
      newErrors.agreements = "필수 약관에 동의해주세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 결제 처리 함수
  const handleGeneralPayment = () => {
    if (!validateDonation()) return;

    const { IMP } = window;
    IMP.init("imp18166354");

    const paymentData = {
      pg: selectedMethod === "card" ? "uplus" : "kakaopay",
      pay_method: selectedMethod === "card" ? "card" : "kakaopay",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "캠페인 후원 결제",
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
            donationType: "campaign",
            relationalId: 1, // 캠페인 ID
            amount: selectedAmount, // 선택된 후원 금액 명시적 추가
          };

          console.log("서버로 전송할 데이터:", serverData);

          const result = await api.post("/campaign/register", serverData);
          console.log("서버 성공 응답:", result.data);

          alert("✅ 결제가 완료되었습니다!");
          navigate("/campaign/success");
        } catch (error) {
          console.error("상세 에러 정보:", error);
          alert(`결제 처리 중 오류가 발생했습니다.\n${error.message}`);
        }
      } else {
        alert("❌ 결제 실패: " + response.error_msg);
      }
    });
  };

  // 에러 메시지 컴포넌트
  const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <p className="text-red-500 text-sm mt-1">{message}</p>;
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex pb-5">
          <button className="flex-1 py-3 font-medium bg-red-500 text-white">
            캠페인 후원
          </button>
        </div>

        <div className="flex gap-6 p-4">
          <div className="flex-1 space-y-4">
            {/* 캠페인 정보 */}
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="p-4">
                <h2 className="text-lg font-medium mb-3">캠페인 정보</h2>
                <div className="flex gap-4">
                  <div className="w-72 h-48 flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
                      alt="캠페인 이미지"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium mb-2">
                      불법 번식장에서 구조된 이름모를 강아지에게 입을 옷을
                      선물해주세요!
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-600">목표금액</span>
                      <span className="text-sm font-medium">1,800만 원</span>
                      <span className="text-sm text-gray-600 ml-4">
                        남은기간
                      </span>
                      <span className="text-sm font-medium">11일</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">광주 무슨무슨 보호소</span>
                    </p>
                    <div className="bg-gray-100 rounded-md p-3 mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          현재 후원금액
                        </span>
                        <span className="text-sm font-medium">3,601원</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(3601 / 18000000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 후원 금액 선택 */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h2 className="text-lg font-medium mb-4">후원 금액</h2>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      className={`flex-1 py-2 rounded-md border ${
                        selectedAmount === amount
                          ? "border-red-500 text-red-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
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
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setCustomAmount(value);
                        if (value) setSelectedAmount(parseInt(value));
                      }}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      원
                    </span>
                  </div>
                </div>
                <ErrorMessage message={errors.amount} />

                <div className="flex justify-between items-center pt-4">
                  <span className="text-gray-600">총 후원금액</span>
                  <span className="text-xl font-semibold">
                    {selectedAmount.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 결제수단 선택 */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-medium mb-4">결제수단</h2>

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
                      {selectedAmount.toLocaleString()}원이 결제됩니다.
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
                      {selectedAmount.toLocaleString()}원이 결제됩니다.
                    </p>
                  )}
                </div>

                <ErrorMessage message={errors.paymentMethod} />

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
                  <ErrorMessage message={errors.agreements} />
                </div>

                {/* 결제하기 버튼 */}
                <button
                  onClick={handleGeneralPayment}
                  className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors mt-6"
                >
                  후원하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDonation;
