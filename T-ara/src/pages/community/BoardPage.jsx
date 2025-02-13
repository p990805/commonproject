import React from "react";
import CommunityLayout from "../../components/common/CommunityLayout";
import Board from "../../components/community/Board";

const BoardPage = () => {
  // Board 컴포넌트에 필요한 onSelectPost 콜백 등을 여기서 정의할 수 있습니다.
  const handleSelectPost = (communityId) => {
    // 예시: 게시글 상세 페이지로 이동하는 로직
    // navigate(`/community/detail/${communityId}`);
  };

  return (
    <CommunityLayout title="게시판">
      <Board onSelectPost={handleSelectPost} />
    </CommunityLayout>
  );
};

export default BoardPage;
