import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CampaignDetailHeader from "./CampaignDetailHeader";
import api from "../../api";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

// Helper function to convert delta to HTML
const deltaToHtml = (delta) => {
  if (!delta || !delta.ops) return "";
  const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  return converter.convert();
};

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      try {
        const { data } = await api.get(`/campaigns/${id}`);
        // Transform API data to match the expected format
        const transformedCampaign = {
          id: id,
          title: data.title,
          imageUrl: data.imageUrl,
          achievement: data.achievementRate * 100,
          location: data.shelterName,
          amount: "진행중",
          daysLeft: 30,
          content: data.content, // Add content field for Quill data
          lastModified: data.lastModified,
        };
        setCampaign(transformedCampaign);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetail();
  }, [id]);

  // Format date string
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Error loading campaign details</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Campaign not found</div>
      </div>
    );
  }

  // Convert Quill Delta to HTML
  const contentHtml = campaign.content ? deltaToHtml(campaign.content) : "";

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
              <h2 className="text-2xl font-bold mb-6">캠페인 소개</h2>
              {/* Render Quill content */}
              <div
                className="quill-content"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* 하단 후원하기 버튼 (모바일에서 고정) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
        <button
          onClick={() => navigate(`/campaign/donation`)}
          className="w-full bg-red-500 text-white py-4 rounded-md font-bold"
        >
          캠페인 후원하기
        </button>
      </div>
    </div>
  );
};

export default CampaignDetail;
