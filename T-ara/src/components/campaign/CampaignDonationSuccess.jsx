import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CampaignDonationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { campaignTitle, shelterName, donorName } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[1140px] h-[629px] bg-white border border-[#E0E0E0] rounded-lg relative">
        {/* 헤더 */}
        <div className="absolute left-[104px] top-[29px]">
          <h1 className="font-['Inter'] font-bold text-[28px] leading-[34px] tracking-[1.2px] text-black">
            ✔️ 캠페인 후원 완료
          </h1>
        </div>

        {/* 구분선 */}
        <div className="absolute w-full top-[14.23%] border-t-[1.59px] border-[#E0E0E0]" />

        {/* 이미지 */}
        <div className="absolute left-[9.14%] right-[59.67%] top-[18.2%] bottom-[50%]">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
            alt="캠페인 이미지"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 캠페인 제목 */}
        <div className="absolute left-[42.44%] right-[16.61%] top-[30.52%]">
          <h2 className="font-['Roboto'] font-bold text-[24px] leading-[27px] text-[#212529]">
            {campaignTitle || "캠페인 제목"}
          </h2>
        </div>

        {/* 감사 메시지 */}
        <div className="absolute w-[907px] left-1/2 -translate-x-1/2 top-[calc(50%+119px-105px/2)]">
          <p className="font-['Roboto'] text-[18px] leading-[21px] text-center text-[#495057]">
            {donorName || ""} 후원자님, 캠페인 후원에 참여해주셔서 진심으로
            감사드립니다.
            <br />
            <br />
            후원자님의 소중한 지원 덕분에 캠페인이 목표에 한 발짝 더
            가까워졌습니다.
            <br />
            <br />
            앞으로도 많은 관심과 응원 부탁드리며, 후원자님과 함께하는 이 여정이
            더욱 빛날 수 있도록 계속 힘쓰겠습니다.
          </p>
        </div>

        {/* 버튼 */}
        <div className="absolute left-[599px] top-[531px] flex gap-6">
          <button
            onClick={() => navigate("/campaign")}
            className="w-[200px] h-12 flex items-center justify-center cursor-pointer bg-white border border-[#E0E0E0] rounded-lg font-['Inter'] font-medium text-base text-black"
          >
            캠페인 후원 보러가기
          </button>
          <button
            onClick={() => navigate("/mypage")}
            className="w-[200px] h-12 flex items-center justify-center cursor-pointer bg-[#FF4427] border border-[#E0E0E0] rounded-lg font-['Inter'] font-bold text-base text-[#F5F5F5]"
          >
            내 후원내역 보러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDonationSuccess;
