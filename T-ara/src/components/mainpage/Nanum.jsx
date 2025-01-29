import SwiperComponent from "./SwiperComponent";

const Nanum = () => {
  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      {/* 제목 영역 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">나눔이야기</h2>
          <p className="text-gray-500">유기동물과 함께한 추억과 후원자님들의 이야기를 전합니다.</p>
        </div>
        <a
          href="#"
          className="text-red-500 font-medium hover:underline flex items-center space-x-1"
        >
          <span>더보기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </a>
      </div>

      {/* Swiper 컴포넌트 */}
      <SwiperComponent />
    </div>
  );
};

export default Nanum;
