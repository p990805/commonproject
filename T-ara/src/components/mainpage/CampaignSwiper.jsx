import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CampaignSwiper = () => {
  const slides = [
    { id: 1, img: "./assets/campaign1.jpg", title: "시골에 홀로 남은 강아지", description: "따뜻한 손길이 필요합니다" },
    { id: 2, img: "./assets/campaign2.jpg", title: "위험한 도로에서 구조된 강아지", description: "건강한 삶을 선물해주세요" },
    { id: 3, img: "./assets/campaign3.jpg", title: "철창 속 고양이", description: "철창에서 벗어나도록 도와주세요" },
    { id: 4, img: "./assets/campaign4.jpg", title: "엄마를 잃고 홀로 남은 고양이", description: "따뜻한 보금자리를 찾아주세요" },
    { id: 5, img: "./assets/campaign5.jpg", title: "길고양이를 위한 구조의 손길", description: "작은 도움, 큰 변화" },
  ];

  return (
    <div className="w-full max-w-[1100px] mx-auto"> {/* Swiper를 감싸는 컨테이너 추가 */}
      <Swiper
  modules={[Navigation, Pagination, Scrollbar, A11y]}
  spaceBetween={80}
  slidesPerView={4}
  navigation
  pagination={{ clickable: true }}
  scrollbar={{ draggable: true }}
  className="rounded-lg"
>
  {slides.map((slide) => (
    <SwiperSlide key={slide.id} className="flex justify-center">
      <div className="relative w-72 bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={slide.img}
          alt={slide.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 absolute bottom-2">
          <h3 className="text-md  text-white">{slide.title}</h3>
          <p className="text-white text-sm">{slide.description}</p>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </div>
  );
};

export default CampaignSwiper;
