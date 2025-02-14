// src/pages/BoardDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommunityLayout from "../../components/common/CommunityLayout";
import SidebarMenu from "../../components/common/SidebarMenu";
import CommunityDetail from "../../components/community/CommunityDetail";

const BoardDetailPage = () => {
  const { communityId } = useParams(); // URL 파라미터에서 communityId를 가져옴
  const navigate = useNavigate();

  // 뒤로가기 핸들러: 예시로 이전 페이지로 이동하거나, 자유게시판 목록으로 이동할 수 있습니다.
  const handleBack = () => {
    // 예시: 자유게시판 목록으로 이동
    navigate("/community/board");
  };

  return (
    <CommunityLayout
      // sidebarMenu prop을 전달하면 기본 SidebarMenu 컴포넌트를 그대로 사용하게 됩니다.
      // SidebarMenu 내부에서 현재 경로가 /community/board로 시작하면 "게시판" 메뉴가 active 처리됩니다.
      sidebarMenu={<SidebarMenu />}
    >
      <CommunityDetail communityId={communityId} onBack={handleBack} />
    </CommunityLayout>
  );
};

export default BoardDetailPage;
