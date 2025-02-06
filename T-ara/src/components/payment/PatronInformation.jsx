import React from "react";

const PatronInformation = ({ donor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">후원자님의 정보</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">이름</span>
          <span>{donor.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">휴대폰 번호</span>
          <span>{donor.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">이메일</span>
          <span>{donor.email}</span>
        </div>
      </div>
    </div>
  );
};

export default PatronInformation;
