import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CampaignDetailHeader = ({ campaign = {} }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 600;
      setShowDonateButton(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/campaign/donation", { state: { campaignId: campaign.id } });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getFirstQuillImage = () => {
    if (campaign.content && campaign.content.ops) {
      const firstImage = campaign.content.ops.find(
        (op) => op.insert && op.insert.image
      );
      return firstImage ? firstImage.insert.image : null;
    }
    return null;
  };

  const getValidImageUrl = (url) => {
    if (imageError) {
      return "https://via.placeholder.com/800x600?text=No+Image+Available";
    }
    const quillImage = getFirstQuillImage();
    const finalUrl = quillImage || url;
    if (!finalUrl) {
      return "https://via.placeholder.com/800x600?text=No+Image+Available";
    }
    return finalUrl;
  };

  return (
    <>
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            {/* 이미지 섹션 */}
            <div className="relative lg:w-3/5">
              <div className="relative h-[444px] bg-[#F2F4F6] rounded-lg overflow-hidden">
                <img
                  src={getValidImageUrl(campaign.imageUrl)}
                  alt={campaign.title || "캠페인 이미지"}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
            </div>

            {/* 캠페인 정보 */}
            <div className="lg:w-2/5">
              {/* 캠페인 제목 */}
              <h1 className="text-[20px] leading-10 text-[#212529] font-bold mb-4">
                {campaign.title}
              </h1>
              <div className="border-[0.3px] border-[#f3f4f5] my-[10px] w-full mb-6"></div>

              {/* 달성 금액 정보 */}
              <div className="flex items-center gap-4 mb-2">
                <div className="text-[#F86D7D] font-bold text-2xl">
                  {campaign.achievement}% 달성
                </div>
                <div className="text-[14px] text-[#495057]">
                  {campaign.daysLeft}일 남음
                </div>
              </div>

              <div className="mb-10">
                <div className="flex items-center gap-4 mb-1">
                  <span className="text-2xl font-bold">
                    {campaign.achievedAmount?.toLocaleString() || 0}원 달성
                  </span>
                  <span className="text-[14px] text-[#495057]">
                    목표금액 {campaign.targetAmount?.toLocaleString() || 0}원
                  </span>
                </div>
              </div>

              {/* 문의하기 버튼 */}
              <button
                onClick={() => navigate(`/shelter/${campaign.shelterId}`)}
                className="w-full mb-4 mt-4 flex items-center justify-center gap-2 py-4 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="font-semibold text-gray-800">
                  {campaign.shelterName} 보호소
                </span>
                <p>보러가기</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>

              <div className="bg-gray-100 rounded-lg p-4 text-center mb-4">
                <span>
                  👥 {campaign.donatePersonNum?.toLocaleString() || 0} 명이 함께
                  후원중
                </span>
              </div>

              {/* 후원하기 버튼 */}
              <button
                onClick={handleClick}
                className="w-full bg-red-500 text-white py-4 rounded-md font-bold hover:bg-red-600 transition-colors"
              >
                캠페인 후원하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetailHeader;
