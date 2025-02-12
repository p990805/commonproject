import React from "react";
import { useNavigate } from "react-router-dom";

const CampaignDonationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* 체크마크 아이콘 */}
          <div className="flex justify-center mb-4">
            <div className="w-6 h-6 text-lg flex items-center justify-center rounded-full border-2 border-gray-800">
              ✓
            </div>
            <span className="ml-2 font-medium">캠페인 후원 완료</span>
          </div>

          {/* 캠페인 정보 */}
          <div className="mt-6">
            <div className="flex gap-6">
              <div className="w-64 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
                  alt="캠페인 이미지"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-4">
                  오늘쯤 눈이 안떠지는 휘귀병에 걸린 이름모를 강아지의 치료비를
                  함께 모아주세요!
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  박주찬 후원자님, 캠페인 후원에 참여해주셔서 진심으로
                  감사드립니다.
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  후원자님의 소중한 지원 덕분에 캠페인이 목표에 한 발짝 더
                  다가왔습니다.
                </p>
                <p className="text-sm text-gray-600">
                  앞으로도 많은 관심과 응원 부탁드리며, 후원자님과 함께하는 이
                  여정이 더욱 빛날 수 있도록 계속 힘쓰겠습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => navigate("/campaign")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              캠페인 후원 보러가기
            </button>
            <button
              onClick={() => navigate("/mypage")}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              내 후원내역 보러가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDonationSuccess;
