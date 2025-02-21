import React, { useState, useEffect } from "react";
import api from "../../api";

const CampaignDonationListModal = ({ isOpen, onClose, campaignId }) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (isOpen && campaignId) {
      fetchDonations();
    }
  }, [isOpen, campaignId]);

  const fetchDonations = async () => {
    try {
      const response = await api.get(`/analyze/campaign/${campaignId}`);
      // userList 배열이 있는지 확인하고 설정
      setDonations(response.data?.userList || []);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setDonations([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg w-[900px] max-h-[80vh] overflow-hidden relative">
        <div className="w-full bg-[#f0f3fc] px-6 py-4 border-b border-[#dee1e8] flex justify-between items-center">
          <h2 className="text-[#191919] text-lg font-bold">후원자 리스트</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="w-full bg-white shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)]">
            <div className="px-3 py-3 border-b border-[#dee1e8]">
              <span className="!text-[#191919] text-[15px] font-semibold">
                [전체 후원 {donations.length}건]
              </span>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-[#f0f3fc] sticky top-0">
                  <tr>
                    <th className="p-4 text-left min-w-[150px]">후원 번호</th>
                    <th className="p-4 text-left min-w-[150px]">후원자 이름</th>
                    <th className="p-4 text-left min-w-[150px]">후원 금액</th>
                    <th className="p-4 text-left min-w-[200px]">후원일시</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr
                      key={donation.campaignDonationId}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4 whitespace-nowrap">
                        {donation.campaignDonationId}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {donation.userName}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {Number(donation.amount).toLocaleString()}원
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {new Date(donation.donationDate).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#dee1e8] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#191919] text-white text-sm rounded hover:bg-[#666]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDonationListModal;
