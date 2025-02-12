// src/components/community/CommunityDetail.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { deltaToHtml } from "../../utils/quillParser";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommunityDetail = ({ communityId, onBack }) => {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);

  const authHeader = { Authorization: localStorage.getItem("authToken") };

  useEffect(() => {
    if (!communityId) return;
    setLoading(true);
    api
      .get(`/community/detail/${communityId}`, { headers: authHeader })
      .then((response) => {
        const art = response.data.article;
        setArticle(art);
        setCommentList(response.data.commentList || []);
        if (art && art.ifClickLike !== undefined) {
          setLikeStatus(art.ifClickLike === "1");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [communityId]);

  const handleLike = () => {
    api
      .get(`/community/like/${communityId}`, { headers: authHeader })
      .then((response) => {
        setLikeStatus(response.data.likeStatus === 1);
      })
      .catch((err) => {
        console.error("좋아요 API 오류:", err);
      });
  };

  // 게시글 삭제 버튼 핸들러
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await api.get(`/community/delete/${communityId}`, {
        headers: { Authorization: token },
      });
      alert(res.data.message);
      // 삭제 성공 시 게시판 목록 페이지로 이동
      navigate("/community/board");
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("게시글 삭제에 실패하였습니다.");
    }
  };

  // 게시글 수정 버튼 핸들러
  const handleModify = () => {
    navigate(`/community/board/${communityId}/edit`);
  };

  // 댓글 새로고침: 댓글 등록 후 호출
  const refreshComments = () => {
    api
      .get(`/community/detail/${communityId}`, { headers: authHeader })
      .then((response) => {
        setCommentList(response.data.commentList || []);
      })
      .catch((err) => console.error("댓글 새로고침 오류:", err));
  };

  // 댓글 삭제 완료 후 호출되는 콜백: 삭제된 댓글 ID를 제외하도록 상태 업데이트
  const handleCommentDelete = (deletedCommentId) => {
    setCommentList((prev) =>
      prev.filter((comment) => comment.commentId !== deletedCommentId)
    );
  };

  // 댓글 수정 성공 후 호출되는 콜백: 수정된 댓글 내용을 반영
  const handleCommentModifySuccess = (commentId, newContent) => {
    setCommentList((prev) =>
      prev.map((comment) =>
        comment.commentId === commentId ? { ...comment, content: newContent } : comment
      )
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!article) return <div>게시글을 찾을 수 없습니다.</div>;

  // 상위 댓글만 필터링 (대댓글이 아닌 댓글)
  const topLevelComments = commentList.filter(
    (comment) => !comment.personId || comment.personId === ""
  );

  const getImageUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http")
      ? url
      : `${process.env.REACT_APP_BASE_URL}/${url}`;
  };

  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md">
      <button className="mb-4 text-blue-500 underline" onClick={onBack}>
        ← 목록으로 돌아가기
      </button>
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center mb-4">
        <img
          src="/assets/nanum1.png"
          alt="작성자 프로필"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2">
          <p className="text-sm font-bold">
            {article.writerName || "작성자"}
          </p>
          <p className="text-xs text-gray-500">
            {article.createdAt || "시간정보"}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <div
          className="text-base"
          dangerouslySetInnerHTML={{ __html: deltaToHtml(article.content) }}
        />
      </div>
      {article.imageUrl && (
        <img
          src={getImageUrl(article.imageUrl)}
          alt="게시글 이미지"
          className="w-full object-cover rounded-md mb-4"
        />
      )}
      <div className="flex items-center mb-4 space-x-4">
        <button
          onClick={handleLike}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {likeStatus ? "좋아요 취소" : "좋아요"}
        </button>
        <button
          onClick={handleModify}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          삭제
        </button>
      </div>
      <div className="mt-6">
        <CommentForm
          communityId={communityId}
          onCommentAdded={refreshComments}
          authHeader={authHeader}
        />
        <CommentList
          commentList={topLevelComments}
          onCommentDelete={handleCommentDelete}
          onCommentModifySuccess={handleCommentModifySuccess}
        />
      </div>
    </div>
  );
};

export default CommunityDetail;
