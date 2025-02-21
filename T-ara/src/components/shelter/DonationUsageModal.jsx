import React from "react";

const DonationUsageModal = ({ donation, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return "0";
    return amount.toLocaleString("ko-KR");
  };

  return (
    <div className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-filter backdrop-blur-sm rounded-lg w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">후원금 사용 상세 정보</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 후원금 사용 정보 */}
        <div className="space-y-6">
          {/* 기본 정보 섹션 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">기본 정보</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">사용 번호</p>
                <p className="font-medium">{donation.expenseId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">사용 일자</p>
                <p className="font-medium">{donation.expenseDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">사용 카테고리</p>
                <p className="font-medium">{donation.categoryName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">사용 금액</p>
                <p className="font-medium text-blue-600">
                  {formatAmount(donation.amount)}원
                </p>
              </div>
            </div>
          </div>

          {/* 사용처 정보 섹션 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">
                사용처 정보
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">구매 품목</p>
                <p className="font-medium">{donation.usagePlace}</p>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={onClose}
              className="w-32 h-10 bg-gray-200 text-gray-700 rounded hover:bg-gray-200"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationUsageModal;
