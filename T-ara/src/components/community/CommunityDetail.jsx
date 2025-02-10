// src/components/community/CommunityDetail.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { deltaToHtml } from "../../utils/quillParser"; // Quill Delta → HTML 변환 함수
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommunityDetail = ({ communityId, onBack }) => {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false); // true: 좋아요, false: 미좋아요

  // 로컬 스토리지에 저장된 토큰을 Authorization 헤더에 담습니다.
  const authHeader = { Authorization: localStorage.getItem("authToken") };

  // 게시글 상세 및 댓글 정보 가져오기
  useEffect(() => {
    if (!communityId) return;
    setLoading(true);
    api
      .get(`/community/detail/${communityId}`, { headers: authHeader })
      .then((response) => {
        const art = response.data.article;
        console.log("응답 데이터:", response.data);
        setArticle(art);
        setCommentList(response.data.commentList || []);
        // 백엔드에서 좋아요 상태가 전달된다면 (예: ifClickLike: "1" 또는 "0")
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

  // 좋아요 버튼 클릭 핸들러
  const handleLike = () => {
    api
      .get(`/community/like/${communityId}`, { headers: authHeader })
      .then((response) => {
        // 응답 데이터에 likeStatus가 포함되어 있다고 가정 (0 또는 1)
        setLikeStatus(response.data.likeStatus === 1);
      })
      .catch((err) => {
        console.error("좋아요 API 오류:", err);
      });
  };

  // 댓글 목록 새로고침 – 댓글 등록 후 호출
  const refreshComments = () => {
    api
      .get(`/community/detail/${communityId}`, { headers: authHeader })
      .then((response) => {
        setCommentList(response.data.commentList || []);
      })
      .catch((err) => console.error("댓글 새로고침 오류:", err));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!article) return <div>게시글을 찾을 수 없습니다.</div>;

  // 최상위 댓글은 personId가 없거나 빈 값인 댓글로 간주합니다.
  const topLevelComments = commentList.filter(
    (comment) => !comment.personId || comment.personId === ""
  );

  // 이미지 URL이 상대 경로인 경우, 환경변수를 이용해 절대 URL로 변환하는 헬퍼 함수
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
        {/* Quill Delta를 HTML로 변환하여 안전하게 렌더링 */}
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
      <div className="flex items-center mb-4">
        <button
          onClick={handleLike}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {likeStatus ? "좋아요 취소" : "좋아요"}
        </button>
      </div>
      <div className="mt-6">
        {/* 최상위 댓글 등록 폼 */}
        <CommentForm
          communityId={communityId}
          onCommentAdded={refreshComments}
          authHeader={authHeader}
        />
        {/* 댓글 목록 렌더링 */}
        <CommentList commentList={topLevelComments} />
      </div>
    </div>
  );
};

export default CommunityDetail;
