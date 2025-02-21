import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import api from "../../api";

const CampaignSwiper = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 남은 날짜 계산
  const calculateDaysLeft = (endedAt) => {
    const today = new Date();
    const endDate = new Date(endedAt);
    return Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
  };

  // 달성률 계산
  const calculateAchievement = (targetAmount, achievedAmount) => {
    const target = parseFloat(targetAmount) || 300000;
    const achieved = parseFloat(achievedAmount) || 0;
    return Math.round((achieved / target) * 100);
  };

  // 캠페인 데이터 불러오기
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get('/campaigns');
        
        const campaignData = 
          response.data?.campaigns || 
          response.data?.data?.campaigns || 
          response.data;
  
        // 인덱스로 ID 생성
        const transformedCampaigns = campaignData.map((campaign, index) => ({
          ...campaign,
          id: index + 1
        }));
  
        setCampaigns(transformedCampaigns);
        setLoading(false);
      } catch (err) {
        console.error('캠페인 데이터 불러오기 실패:', err);
        setError('캠페인 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };
  
    fetchCampaigns();
  }, []);
  
  // 상세 페이지로 이동 핸들러 (라우터 사용 않고 window.location 사용)
  const handleCampaignClick = (campaignId) => {
    console.log("클릭된 캠페인:", campaignId);
    
    if (campaignId) {
      window.location.href = `/campaign/${campaignId}`;
    } else {
      console.error("유효하지 않은 캠페인 ID:", campaignId);
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-gray-600">캠페인을 불러오는 중...</span>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  // 캠페인이 없는 경우
  if (campaigns.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-gray-500">진행 중인 캠페인이 없습니다.</span>
      </div>
    );
  }

  // 3개 이하일 때 고정 레이아웃
  if (campaigns.length <= 3) {
    return (
      <div className={`grid grid-cols-3 gap-4 w-full`}>
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            onClick={() => handleCampaignClick(campaign.id)}
            className="w-full bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* 이미지 컨테이너 */}
            <div className="relative w-full pb-[55%]">
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* 컨텐츠 섹션 */}
            <div className="p-3">
              {/* 달성률 */}
              <div className="text-[#F86D7D] text-base font-bold">
                {calculateAchievement(campaign.targetAmount, campaign.achievedAmount)}% 달성
              </div>

              {/* 제목 */}
              <h3 className="mt-1 text-sm font-bold text-gray-900 line-clamp-2 min-h-[2.5rem]">
                {campaign.title}
              </h3>

              {/* 보호소 이름 */}
              <p className="mt-1 text-xs text-gray-600 truncate">
                {campaign.shelterName}
              </p>

              {/* 하단 정보 */}
              <div className="mt-1">
                <span className="text-xs text-gray-700">
                  {calculateDaysLeft(campaign.endedAt)}일 남음
                </span>
              </div>
            </div>
          </div>
        ))}
        {campaigns.length === 2 && <div></div>}
      </div>
    );
  }

  // 4개 이상일 때 카로셀
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={16}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      className="campaign-swiper"
    >
      {campaigns.map((campaign) => (
        <SwiperSlide key={campaign.id}>
          <div
            onClick={() => handleCampaignClick(campaign.id)}
            className="w-full bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* 이미지 컨테이너 */}
            <div className="relative w-full pb-[55%]">
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* 컨텐츠 섹션 */}
            <div className="p-3">
              {/* 달성률 */}
              <div className="text-[#F86D7D] text-base font-bold">
                {calculateAchievement(campaign.targetAmount, campaign.achievedAmount)}% 달성
              </div>

              {/* 제목 */}
              <h3 className="mt-1 text-sm font-bold text-gray-900 line-clamp-2 min-h-[2.5rem]">
                {campaign.title}
              </h3>

              {/* 보호소 이름 */}
              <p className="mt-1 text-xs text-gray-600 truncate">
                {campaign.shelterName}
              </p>

              {/* 하단 정보 */}
              <div className="mt-1">
                <span className="text-xs text-gray-700">
                  {calculateDaysLeft(campaign.endedAt)}일 남음
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CampaignSwiper;