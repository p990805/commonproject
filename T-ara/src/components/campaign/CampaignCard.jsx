import React from "react";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("카드 클릭됨:", campaign.id);
    navigate(`/campaign/${campaign.id}`);
  };

  // 남은 날짜 계산
  const calculateDaysLeft = () => {
    const today = new Date();
    const endDate = new Date(campaign.endedAt);
    return Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
  };

  // 달성률 계산
  const calculateAchievement = () => {
    const targetAmount = parseFloat(campaign.targetAmount) || 300000;
    const achievedAmount = parseFloat(campaign.achievedAmount) || 0;
    return Math.round((achievedAmount / targetAmount) * 100);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
    >
      {/* 이미지 컨테이너 */}
      <div className="relative w-full pb-[75%] bg-red-500">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* 컨텐츠 섹션 */}
      <div className="p-4">
        {/* 달성률 */}
        <div className="text-[#F86D7D] text-xl font-bold">
          {calculateAchievement()}% 달성
        </div>

        {/* 제목 */}
        <h3 className="mt-2 text-base font-bold text-gray-900 line-clamp-2">
          {campaign.title}
        </h3>

        {/* 보호소 이름 */}
        <p className="mt-3 text-sm text-gray-600">{campaign.shelterName}</p>

        {/* 하단 정보 */}
        <div className="mt-3">
          <span className="text-sm text-gray-700">
            {calculateDaysLeft()}일 남음
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
