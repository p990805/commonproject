import CampaignSwiper from "./CampaignSwiper";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";


const Campaign2 =()=>{

    return (
        <div className="flex flex-col justify-center items-center   px-4 max-w-[1000px] h-[700px] my-auto mx-auto">
        {/* 제목 영역 */}
        <div className="flex justify-between items-center mb-3 w-full p-7">
          <div className="mb-10 flex flex-col gap-4">
            <h2 className="text-4xl font-bold text-gray-800">캠페인</h2>
            <p className="text-gray-500">동물을 지키는 캠페인에 참여해주세요.</p>
          </div>
          <Link
            to="/campaign"
            className="text-gray-400 font-bold hover:underline flex items-center space-x-1"
          >
            <span className="flex gap-1 items-center">
              더보기 <FaPlus className="align-middle mb-[2.5px]" />
            </span>
        </Link>
    
        </div>
      
        {/* Swiper 컴포넌트 */}
        <div className="w-full h-full">
          <CampaignSwiper />
        </div>
      </div>
      
      );
}
export default Campaign2;