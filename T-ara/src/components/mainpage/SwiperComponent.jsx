import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwiperComponent = () => {
  const slides = [
    { id: 1, img: "./assets/corgi.png", title: "친환경 봉사팀 방문", description: "우리 개들과 이야기" },
    { id: 2, img: "./assets/nanum1.png", title: "사랑으로 가득한 행사", description: "유기견 보호 센터에서 하루 ♥" },
    { id: 3, img: "./assets/nanum2.png", title: "2024년 특별한 날 이야기", description: "봉사자들과 함께한 추억" },
    { id: 4, img: "./assets/nanum3.png", title: "행복한 유기묘 보호 활동", description: "새 가족을 찾은 친구들의 사연" },
    { id: 5, img: "./assets/nanum4.png", title: "코기", description: "코깅1" },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="rounded-lg"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{slide.title}</h3>
              <p className="text-gray-600 text-sm">{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
