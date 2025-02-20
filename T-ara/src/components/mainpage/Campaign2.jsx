import React from 'react';
import CampaignSwiper from "./CampaignSwiper";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Campaign2 = () => {
    return (
        <div className="flex flex-col justify-center h-full px-4 max-w-[1000px] mx-auto">
            {/* 제목 영역 */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold text-gray-800">캠페인</h2>
                    <p className="text-gray-500">유기동물을 지키는 캠페인에 참여해주세요.</p>
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
            <div className="w-full flex-1 overflow-hidden">
                <CampaignSwiper />
            </div>
        </div>
    );
}

export default Campaign2;