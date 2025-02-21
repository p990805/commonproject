import React from "react";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/campaign/${campaign.id}`); // campaignId 대신 id 사용
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

  // 이미지 에러 처리 추가
  const handleImageError = (e) => {
    e.target.src = "/placeholder-image.jpg"; // 적절한 플레이스홀더 이미지 경로로 변경하세요
    e.target.alt = "이미지를 불러올 수 없습니다";
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      {/* 이미지 컨테이너 */}
      <div className="relative w-full pb-[75%] bg-gray-100">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          onError={handleImageError}
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
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {calculateDaysLeft()}일 남음
          </span>
          <span className="text-sm text-gray-500">
            {Number(campaign.achievedAmount).toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
