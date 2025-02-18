import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CampaignDetailHeader = ({ campaign = {} }) => {
  const [showDonateButton, setShowDonateButton] = useState(false);
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

  // Extract first image from Quill content
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

    // Try to get the first image from Quill content
    const quillImage = getFirstQuillImage();

    // Use Quill image if available, otherwise use imageUrl
    const finalUrl = quillImage || url;

    if (!finalUrl) {
      return "https://via.placeholder.com/800x600?text=No+Image+Available";
    }

    return finalUrl;
  };

  // 캠페인 달성률 계산
  const calculateAchievement = () => {
    const targetAmount = campaign.targetAmount || 0;
    const achievedAmount = campaign.achievedAmount || 0;

    if (targetAmount === 0) return 0;

    const achievement = (achievedAmount / targetAmount) * 100;
    return achievement.toFixed(1);
  };

  // 남은 날짜 계산
  const calculateDaysLeft = () => {
    if (!campaign.startedAt || !campaign.endedAt) return 14;
    const end = new Date(campaign.endedAt);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    return diffDays;
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
              <h1 className="text-[20px] leading-6 text-[#212529] font-bold mb-4">
                {campaign.title || "제목 없음"}
              </h1>

              {/* 달성률 정보 */}
              <div className="text-[#00C4C4] font-bold text-lg mb-4">
                {(
                  ((campaign.achievedAmount || 0) /
                    (campaign.targetAmount || 1)) *
                  100
                ).toFixed(0)}
                % 달성
              </div>

              {/* 참여 정보 */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-black text-xl font-bold">
                    {(
                      ((campaign.achievedAmount || 0) /
                        (campaign.targetAmount || 1)) *
                      100
                    ).toFixed(0)}
                  </span>
                  <span className="text-[#868E96] text-[11.25px]">달성</span>
                </div>
                <div className="text-[#868E96] text-[11.25px]">
                  {calculateDaysLeft()}일 남음
                </div>
              </div>

              {/* 모금액 정보 */}
              <div className="mb-6">
                <div className="flex gap-1">
                  <div className="px-2 py-1 bg-[#F2F4F6] rounded text-[10px] text-[#495057]">
                    1명 후원
                  </div>
                  <div className="px-2 py-1 bg-[#F2F4F6] rounded text-[10px] text-[#495057]">
                    {calculateDaysLeft()}일 남음
                  </div>
                </div>
              </div>

              {/* 후원하기 버튼 */}
              <button
                onClick={handleClick}
                className="w-full bg-red-500 text-white py-4 rounded-md font-bold hover:bg-red-600 transition-colors"
              >
                캠페인 후원하기
              </button>

              {/* 문의하기 버튼 */}
              <button className="w-full mt-4 flex items-center justify-center gap-2 py-4 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <span className="text-lg">✉</span>
                문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 스크롤 시 나타나는 둥근 후원하기 버튼 */}
      {showDonateButton && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleClick}
            className="w-16 h-16 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 flex items-center justify-center transition-transform hover:scale-110"
          >
            <div className="text-center text-sm leading-tight">
              <p>후원</p>
              <p>하기</p>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default CampaignDetailHeader;
