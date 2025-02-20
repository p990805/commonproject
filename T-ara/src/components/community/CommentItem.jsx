// src/components/community/CommentItem.jsx
import React, { useState } from "react";
import api from "../../api";
import CommentForm from "./CommentForm";

const CommentItem = ({ comment, allComments, onDelete, onModifySuccess, refreshComments }) => {

  
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  // 대댓글 폼 토글 상태
  const [showReplyForm, setShowReplyForm] = useState(false);

  const childComments = allComments?.filter(
    (c) => String(c.personId) === String(comment.commentId)
  ) || [];

  // 현재 로그인한 사용자의 ID를 localStorage에서 가져옵니다.
  const currentUserId = localStorage.getItem("userId");

  // 수정 시작: 인라인 편집 모드 전환
  const handleEditClick = () => {
    setEditing(true);
  };

  // 수정 취소: 원래 내용 복원 후 편집 모드 종료
  const handleCancelEdit = () => {
    setEditedContent(comment.content);
    setEditing(false);
  };

  // 수정 저장: PUT /community/comment/modify 호출
  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    // 백엔드가 요구하는 ModifyComment 객체 형식으로 요청 페이로드 구성
    const modifiedComment = {
      commentId: comment.commentId,
      userId: comment.userId,           // 댓글 작성자의 아이디
      communityId: comment.communityId,  // GET 요청으로 받아온 communityId 포함
      content: editedContent,
    };

    try {
      const response = await api.put("/community/comment/modify", modifiedComment, {
        headers: { Authorization: token },
      });
      alert(response.data.message);
      setEditing(false);
      // 부모 컴포넌트에 수정 성공 알림 (수정된 댓글 내용을 업데이트)
      onModifySuccess && onModifySuccess(comment.commentId, editedContent);
    } catch (error) {
      console.error("댓글 수정 오류:", error);
      alert("댓글 수정에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  // 댓글 삭제: GET /community/comment/delete/{commentId} 호출  
  const handleDelete = async () => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    try {
      const response = await api.get(`/community/comment/delete/${comment.commentId}`, {
        headers: { Authorization: token },
      });
      alert(response.data.message);
      onDelete && onDelete(comment.commentId);
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      alert("댓글 삭제에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    // refreshComments가 함수인지 확인 후 호출
    if (typeof refreshComments === 'function') {
      refreshComments();
    } else {
      console.warn('refreshComments is not a function or not provided');
      // 대체 방법으로 onDelete 호출 (임시)
      if (typeof onDelete === 'function') {
        onDelete(comment.commentId);
      }
    }
  };

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <li className={`mb-2 border-b pb-2 ${comment.personId ? "ml-8 bg-gray-50" : ""}`}>
      <p className="text-sm font-bold">
        {comment.userName || comment.userId || "익명"}
      </p>
      {editing ? (
        <>
          <textarea
            className="w-full border p-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="mt-2">
            <button
              onClick={handleSaveEdit}
              className="bg-red-500 text-white px-3 py-1 rounded mr-2 cursor-pointer hover:bg-red-400"
            >
              저장
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-neutral-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-neutral-400"
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm">{comment.content}</p>
          <div className="mt-2 flex space-x-2">
            {/* 답글 버튼 추가: 모든 댓글에 표시 */}
            <button
              onClick={handleReplyClick}
              className="bg-neutral-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-neutral-400"
            >
              답글
            </button>
            
            {String(currentUserId) === String(comment.userId) && (
              <>
                <button
                  onClick={handleEditClick}
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2 cursor-pointer hover:bg-red-400"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-neutral-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-neutral-400"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </>
      )}
    
      {/* 답글 작성 폼 */}
      {showReplyForm && (
        <div className="mt-3">
          <CommentForm
            communityId={comment.communityId}
            onCommentAdded={handleReplyAdded}
            authHeader={{ Authorization: localStorage.getItem("authToken") }}
            parentCommentId={comment.commentId}
            isReply={true}
          />
        </div>
      )}
      
      {/* 대댓글 표시 */}
      {childComments.length > 0 && (
        <ul className="mt-3">
          {childComments.map((childComment) => (
            <CommentItem
              key={childComment.commentId}
              comment={childComment}
              allComments={allComments}
              onDelete={onDelete}
              onModifySuccess={onModifySuccess}
              refreshComments={refreshComments}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentItem;
