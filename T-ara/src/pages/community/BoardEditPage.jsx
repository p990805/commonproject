// src/pages/BoardEditPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import EditBoard from "../../components/community/EditBoard";
import CommunityLayout from "../../components/common/CommunityLayout";
import SidebarMenu from "../../components/common/SidebarMenu";

const BoardEditPage = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET /modifyinfo/{communityId}를 호출하여 수정 초기 데이터를 불러옵니다.
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    api
      .get(`/community/modifyinfo/${communityId}`, { headers: { Authorization: token } })
      .then((response) => {
        if (response.data.article) {
          setInitialData(response.data.article);
        } else {
          setError({ message: response.data.message || "수정 정보를 불러올 수 없습니다." });
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [communityId]);

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleSuccess = () => {
    alert("수정이 완료되었습니다.");
    navigate(`/community/board/${communityId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!initialData) return <div>수정할 정보를 불러올 수 없습니다.</div>;

  return (
    <CommunityLayout sidebarMenu={<SidebarMenu />}>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
        <EditBoard
          communityId={communityId}
          initialData={initialData}
          onCancel={handleCancel}
          onSuccess={handleSuccess}
        />
      </div>
    </CommunityLayout>
  );
};

export default BoardEditPage;
