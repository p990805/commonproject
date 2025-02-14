// src/components/community/CommentItem.jsx
import React, { useState } from "react";
import api from "../../api";

const CommentItem = ({ comment, onDelete, onModifySuccess }) => {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

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
      communityId: comment.communityId, // GET 요청으로 받아온 communityId 포함
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

  return (
    <li className="mb-2 border-b pb-2">
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
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              저장
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm">{comment.content}</p>
          <div className="mt-2">
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default CommentItem;
