import React from "react";

const DonationFieldSelect = ({ amount }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h2 className="text-lg font-medium mb-4">후원분야 선택내역</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">후원분야</span>
          <div className="text-right">
            <span className="text-red-500">정기</span>
            <span className="ml-2">보호소 후원</span>
            <div className="text-sm text-gray-500">(보호소를 선택해주세요)</div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">후원금액</span>
          <span>{amount.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between pt-3 border-t">
          <span className="text-gray-600">총 후원금액</span>
          <span className="text-lg">월 {amount.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
};

export default DonationFieldSelect;
