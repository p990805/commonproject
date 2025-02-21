import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import api from "../../api";

// Error message component
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
};

const CampaignDonation = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(30000);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
  });

  const [errors, setErrors] = useState({
    amount: "",
    paymentMethod: "",
    agreements: "",
  });

  const amounts = [10000, 30000, 50000, 100000];
  const [customAmount, setCustomAmount] = useState("");

  const [donor, setDonor] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/member/myinfo");
        setDonor({
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          email: response.data.email,
        });
      } catch (error) {
        console.error("사용자 정보 로딩 실패:", error);
        alert("사용자 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  // Extract first image from Quill content
  const getFirstQuillImage = () => {
    if (campaign?.content && campaign.content.ops) {
      const firstImage = campaign.content.ops.find(
        (op) => op.insert && op.insert.image
      );
      return firstImage ? firstImage.insert.image : null;
    }
    return null;
  };

  const getValidImageUrl = (url) => {
    const quillImage = getFirstQuillImage();
    return quillImage || url;
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

  // 캠페인 정보 가져오기
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const campaignId = location.state?.campaignId;
        if (!campaignId) {
          alert("잘못된 접근입니다.");
          navigate("/");
          return;
        }

        const response = await api.get(`/campaigns/${campaignId}`);
        setCampaign(response.data);
      } catch (error) {
        console.error("캠페인 정보 로딩 실패:", error);
        alert("캠페인 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [location.state, navigate]);

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
      if (response.success) {
        try {
          const serverData = {
            ...response,
            donationType: "campaign",
            relationalId: campaign.campaignId,
            amount: selectedAmount,
          };

          await api.post("/donation/campaign/register", serverData);
          alert("✅ 결제가 완료되었습니다!");

          // 성공 페이지로 데이터와 함께 이동
          navigate("/campaign/success", {
            state: {
              campaignTitle: campaign?.title,
              shelterName: campaign?.shelterName,
              donorName: donor.name,
            },
            replace: true, // 뒤로가기 방지
          });
        } catch (error) {
          console.error("상세 에러 정보:", error);
          alert(`결제 처리 중 오류가 발생했습니다.\n${error.message}`);
        }
      } else {
        alert("❌ 결제 실패: " + response.error_msg);
      }
    });
  };

  const calculateDaysLeft = () => {
    if (!campaign?.endedAt) return 0;
    const end = new Date(campaign.endedAt);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    return diffDays;
  };

  const calculateAchievement = () => {
    if (!campaign) return 0;
    const { targetAmount, achievedAmount } = campaign;
    if (!targetAmount || targetAmount <= 0) return 0;
    return (((achievedAmount || 0) / targetAmount) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        로딩중...
      </div>
    );
  }

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
                      src={getValidImageUrl(campaign?.imageUrl)}
                      alt={campaign?.title || "캠페인 이미지"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium mb-2">
                      {campaign?.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-600">목표금액</span>
                      <span className="text-sm font-medium">
                        {campaign?.targetAmount?.toLocaleString()}원
                      </span>
                      <span className="text-sm text-gray-600 ml-4">
                        남은기간
                      </span>
                      <span className="text-sm font-medium">
                        {calculateDaysLeft()}일
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {campaign?.shelterName}
                    </p>
                    <div className="bg-gray-100 rounded-md p-3 mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          현재 후원금액
                        </span>
                        <span className="text-sm font-medium">
                          {campaign?.achievedAmount?.toLocaleString()}원
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${calculateAchievement()}%` }}
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
