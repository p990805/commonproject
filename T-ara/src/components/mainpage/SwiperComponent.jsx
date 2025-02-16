import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwiperComponent = () => {
  const slides = [
    { id: 1, img: "./assets/nanum0.jpg", title: "매일 나의 힐링루틴", description: "후원으로 시작된 우리의 추억" },
    { id: 2, img: "./assets/nanum1.png", title: "실시간으로 만나는 별이의 일상", description: "유기견 보호 센터에서 하루" },
    { id: 3, img: "./assets/nanum2.png", title: "후원부터 산책까지", description: " 1:1 후원으로 시작하는 맞춤형 프로그램" },
    { id: 4, img: "./assets/nanum3.jpg", title: "행복한 유기묘 보호 활동", description: "새 가족을 찾은 친구들의 사연" },
    { id: 5, img: "./assets/nanum4.jpg", title: "상자 찾은 코코 근황", description: "입양 3일차 상자를 접수한 코코" },
  ];

  return (
    <div className="w-full max-w-[1100px] mx-auto"> {/* Swiper를 감싸는 컨테이너 추가 */}
      <Swiper
  modules={[Navigation, Pagination, Scrollbar, A11y]}
  spaceBetween={20}
  slidesPerView={4}
  navigation
  pagination={{ clickable: true }}
  scrollbar={{ draggable: true }}
  className="rounded-lg"
>
  {slides.map((slide) => (
    <SwiperSlide key={slide.id} className="flex justify-center">
      <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden">
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

    </div>
  );
};

export default SwiperComponent;
