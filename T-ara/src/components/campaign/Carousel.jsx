import React, { useState } from "react";

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

const carouselData = [
  {
    id: 1,
    title: "이름 모를 강아지 위급해 치료비",
    subtitle: "모금 캠페인",
    amount: "500,000원",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  },
  {
    id: 2,
    title: "티아라 사인회 테스트 기",
    subtitle: "님 캠페인 프로젝트",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/05/09/06/07/dog-6240043_1280.jpg",
  },
  {
    id: 3,
    title: "BTS 팬클럽 기부캠페인",
    subtitle: "함께 하면 더 좋은",
    imageUrl:
      "https://media.istockphoto.com/id/2105314282/ko/%EC%82%AC%EC%A7%84/cat-taking-a-selfie-with-dog.jpg?s=1024x1024&w=is&k=20&c=RkH8dEHM2Dh_D60Pp4QiExyYdV4jKBuVo-sC0FBx_pg=",
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  const slide = carouselData[currentSlide];

  return (
    <div className="w-full h-96 relative bg-gray-100">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          backgroundImage: `url(${slide.imageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="absolute bottom-16 left-16 text-white z-10">
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl">{slide.subtitle}</p>
        {slide.amount && <p className="mt-2">{slide.amount}</p>}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/30 flex items-center justify-center text-white z-20 hover:bg-black/50 transition-colors"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-14 bg-black/30 flex items-center justify-center text-white z-20 hover:bg-black/50 transition-colors"
      >
        <ChevronRightIcon />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
