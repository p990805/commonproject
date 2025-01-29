import SwiperComponent from "./SwiperComponent";
import { Link } from "react-router-dom";

const Nanum = () => {
  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      {/* 제목 영역 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">나눔이야기</h2>
          <p className="text-gray-500">유기동물과 함께한 추억과 후원자님들의 이야기를 전합니다.</p>
        </div>
        <Link to="/community"
        className="text-red-500 font-bold hover:underline flex items-center space-x-1" >더보기+</Link>
      </div>

      {/* Swiper 컴포넌트 */}
      <SwiperComponent />
    </div>
  );
};

export default Nanum;
