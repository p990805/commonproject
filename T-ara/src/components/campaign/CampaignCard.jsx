import React from "react";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Card clicked:", campaign.id);
    navigate(`/campaign/${campaign.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-[302px] h-[315px] rounded-lg overflow-hidden"
    >
      <div className="relative h-[169.88px] bg-[#F2F4F6] rounded-t-lg overflow-hidden">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute right-2 bottom-2 bg-black bg-opacity-30 text-white text-xs px-1 py-0.5 rounded-full border border-white">
          <span className="text-[10px] font-medium">AD</span>
        </div>
      </div>

      <div className="p-4">
        <div className="text-[#00C4C4] font-bold text-lg">
          {campaign.achievement.toLocaleString()}% 달성
        </div>

        <h3 className="mt-2 text-[15.375px] leading-6 text-[#212529] line-clamp-2">
          {campaign.title}
        </h3>

        <p className="mt-4 text-[11.25px] text-[#868E96]">
          {campaign.location}
        </p>

        <div className="mt-4 flex gap-1">
          <div className="px-2 py-1 bg-[#F2F4F6] rounded text-[10px] text-[#495057]">
            {campaign.amount}
          </div>
          <div className="px-2 py-1 bg-[#F2F4F6] rounded text-[10px] text-[#495057]">
            {campaign.daysLeft}일 남음
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
