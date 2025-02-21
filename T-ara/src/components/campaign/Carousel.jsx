import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const ChevronLeftIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Carousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const { data } = await api.get("/campaigns");
        // 처음 3개 항목을 가져오고 데이터 변환
        const transformedData = data.slice(0, 3).map((item, index) => ({
          id: item.id || `campaign-${index + 1}`, // ID가 없으면 대체 ID 생성
          title: item.title,
          subtitle: item.shelterName,
          imageUrl: item.imageUrl,
        }));
        setCarouselData(transformedData);
      } catch (error) {
        console.error("캐러셀 데이터 불러오기 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  const handleSlideClick = (campaignId) => {
    // 대체 ID를 처리할 수 있도록 수정
    const id =
      typeof campaignId === "string" && campaignId.startsWith("campaign-")
        ? campaignId.split("-")[1]
        : campaignId;
    navigate(`/campaign/${id}`);
  };

  if (loading || carouselData.length === 0) {
    return <div className="w-full h-96 bg-gray-200 animate-pulse" />;
  }

  const slide = carouselData[currentSlide];

  return (
    <div
      className="w-full h-96 relative bg-gray-100 cursor-pointer"
      onClick={() => handleSlideClick(slide.id)}
    >
      {/* 배경 이미지 컨테이너 */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          backgroundImage: `url(${slide.imageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 콘텐츠 */}
      <div className="absolute bottom-16 left-16 text-white z-10">
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl">{slide.subtitle}</p>
        {slide.amount && <p className="mt-2">{slide.amount}</p>}
      </div>

      {/* 내비게이션 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/30 flex items-center justify-center text-white z-20 hover:bg-black/50 transition-colors"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/30 flex items-center justify-center text-white z-20 hover:bg-black/50 transition-colors"
      >
        <ChevronRightIcon />
      </button>

      {/* 인디케이터 */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20"
      >
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
