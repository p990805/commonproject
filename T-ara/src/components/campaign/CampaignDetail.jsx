import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CampaignDetailHeader from "./CampaignDetailHeader";
import { campaignData } from "../../pages/CampaignPage";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    // id에 해당하는 캠페인 찾기
    const foundCampaign = campaignData.find((c) => c.id === Number(id));
    if (foundCampaign) {
      setCampaign(foundCampaign);
    }
  }, [id]);

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/campaign")}
            className="text-gray-600 hover:text-gray-900"
          >
            ← 캠페인 목록으로 돌아가기
          </button>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="py-8">
        {/* 캠페인 헤더 섹션 */}
        <CampaignDetailHeader campaign={campaign} />

        {/* 캠페인 상세 내용 */}
        <div className="max-w-6xl mx-auto mt-12 px-4">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            {/* 캠페인 설명 */}
            <div className="prose max-w-none">
              <p className="mb-4">{campaign.title}에 대한 상세 설명입니다.</p>
            </div>

            {/* 추가 정보 섹션들 */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">후원자 목록</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500">
                  아직 후원자가 없습니다. 첫 후원자가 되어주세요!
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">캠페인 업데이트</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500">아직 업데이트 내용이 없습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 하단 후원하기 버튼 (모바일에서 고정) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
        <button className="w-full bg-red-500 text-white py-4 rounded-md font-bold">
          캠페인 후원하기
        </button>
      </div>
    </div>
  );
};

export default CampaignDetail;
