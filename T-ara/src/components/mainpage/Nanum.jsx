import SwiperComponent from "./SwiperComponent";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Nanum = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10 px-4 max-w-[1500px] h-[700px] my-auto mx-auto">
    {/* 제목 영역 */}
    <div className="flex justify-between items-center mb-6 w-full">
      <div className="mb-10 flex flex-col gap-5">
        <h2 className="text-4xl font-bold text-gray-800">나눔이야기</h2>
        <p className="text-gray-500">유기동물과 함께한 추억과 후원자님들의 이야기를 전합니다.</p>
      </div>
      <Link
        to="/community"
        className="text-gray-400 font-bold hover:underline flex items-center space-x-1"
      >
        <span className="flex gap-1 items-center">
          더보기 <FaPlus className="align-middle mb-[2.5px]" />
        </span>
    </Link>

    </div>
  
    {/* Swiper 컴포넌트 */}
    <div className="w-full">
      <SwiperComponent />
    </div>
  </div>
  
  );
};

export default Nanum;
