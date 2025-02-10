import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CampaignDetailHeader = ({ campaign }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDonateButton, setShowDonateButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 헤더의 높이보다 더 스크롤되면 버튼 표시
      const headerHeight = 600; // 헤더의 대략적인 높이
      setShowDonateButton(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/campaign/donation`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 임시 이미지 배열 (실제로는 campaign 데이터에 포함되어야 함)
  const images = [campaign.imageUrl];

  return (
    <>
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            {/* 이미지 캐러셀 */}
            <div className="relative lg:w-3/5">
              <div className="relative h-[444px] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                {/* 이미지 인디케이터 */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1}/{images.length}
                </div>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white"
                    >
                      &gt;
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 캠페인 정보 */}
            <div className="lg:w-2/5">
              {/* 보호소 정보 */}
              <div className="mb-6">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                  {campaign.location}
                </span>
              </div>

              {/* 캠페인 제목 */}
              <h1 className="text-2xl font-bold mb-4">{campaign.title}</h1>

              {/* 참여 정보 */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-xl font-bold">302</span>
                  <span className="text-gray-500">명 참여</span>
                </div>
                <div className="text-gray-500">{campaign.daysLeft}일 남음</div>
              </div>

              {/* 모금액 정보 */}
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-2xl font-bold">{campaign.amount}</span>
                  <span className="text-gray-500">
                    {campaign.achievement}% 달성
                  </span>
                </div>
                {/* <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${Math.min(campaign.achievement, 100)}%` }}
                ></div>
              </div> */}
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
          <button className="w-16 h-16 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 flex items-center justify-center transition-transform hover:scale-110">
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
