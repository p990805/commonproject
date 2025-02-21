import React from 'react';

const SwiperComponent = () => {
  const slides = [
    { id: 1, img: "./assets/nanum0.jpg", title: "매일 나의 힐링루틴", description: "후원으로 시작된 우리의 추억" },
    { id: 2, img: "./assets/nanum1.png", title: "실시간으로 만나는 별이", description: "유기견 보호 센터에서 하루" },
    { id: 3, img: "./assets/nanum2.png", title: "후원부터 산책까지", description: "1:1 후원으로 시작하는 맞춤형 프로그램" },
    { id: 4, img: "./assets/nanum3.jpg", title: "행복한 유기묘 보호 활동", description: "새 가족을 찾은 친구들의 사연" },
  ];

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4">
      <div className="grid grid-cols-4 gap-6">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{slide.title}</h3>
              <p className="text-gray-600 text-sm">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwiperComponent;