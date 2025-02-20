import React from "react";

const DonationDetailModal = ({ donation, isOpen, onClose, formatAmount }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("ko-KR");
  };

  const getDonationCategory = (category) => {
    switch (category) {
      case "general":
        return "일반 후원";
      case "monthly":
        return "정기 후원";
      case "campaign":
        return "캠페인 후원";
      default:
        return "-";
    }
  };

  return (
    <div className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-filter backdrop-blur-sm rounded-lg w-[600px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">후원 상세 정보</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 후원 정보 */}
        <div className="space-y-6">
          {/* 기본 정보 섹션 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">기본 정보</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">후원 번호</p>
                <p className="font-medium">
                  {donation.donationHistoryId || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">후원 일시</p>
                <p className="font-medium">{formatDate(donation.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">후원 종류</p>
                <p className="font-medium">
                  {getDonationCategory(donation.donationCategory)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">후원 금액</p>
                <p className="font-medium text-blue-600">
                  {formatAmount(donation.donationAmount)}원
                </p>
              </div>
            </div>
          </div>

          {/* 후원자 정보 섹션 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">
                후원자 정보
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">후원자 닉네임</p>
                <p className="font-medium">{donation.userName || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">회원 번호</p>
                <p className="font-medium">{donation.userId || "-"}</p>
              </div>
            </div>
          </div>

          {/* 후원 대상 정보 섹션 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">
                후원 대상 정보
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">후원 대상 ID</p>
                <p className="font-medium">
                  {donation.donationCategoryId || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">후원 대상</p>
                <p className="font-medium">{donation.relationalName || "-"}</p>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onClose}
              className="w-32 h-10 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailModal;
