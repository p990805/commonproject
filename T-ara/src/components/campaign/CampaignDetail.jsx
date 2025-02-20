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

        // 남은 기간 계산
        const today = new Date();
        const endDate = new Date(data.endedAt);
        const remainingDays = Math.max(
          0,
          Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
        );

        const transformedCampaign = {
          id: id,
          title: data.title,
          imageUrl: data.imageUrl,
          achievement: (data.achievedAmount / data.targetAmount) * 100, // 달성률 계산
          donatePersonNum: data.donatePersonNum, // 후원자 수
          targetAmount: data.targetAmount, // 목표 금액
          achievedAmount: data.achievedAmount, // 달성 금액
          startedAt: data.startedAt, // 시작일
          endedAt: data.endedAt, // 종료일
          daysLeft: remainingDays, // 남은 기간
          content: data.content,
          lastModified: data.lastModified,
          shelterId: data.shelterId,
          simpleDescription: data.simpleDescription, // 간단 설명
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
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
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
    </div>
  );
};

export default CampaignDetail;
