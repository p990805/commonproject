// src/components/community/CommentForm.jsx
import { useState } from "react";
import api from "../../api";

const CommentForm = ({ communityId, onCommentAdded, authHeader, parentCommentId = null, isReply = false }) => {
  const [newCommentText, setNewCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const commentData = {
      content: newCommentText,
      communityId, // 최상위 댓글이면 communityId만 전달
      ...(parentCommentId && { personId: parentCommentId })
    };
    api
      .post("/community/comment", commentData, { headers: authHeader })
      .then((response) => {
        setNewCommentText("");
        onCommentAdded();
      })
      .catch((err) => console.error("댓글 등록 오류:", err));
  };

  return (
    <form onSubmit={handleCommentSubmit} className={`mb-${isReply ? '2' : '4'}`}>
      <textarea
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        className={`w-full border border-gray-300 rounded p-2 ${isReply ? 'text-sm' : 'text-base'}`}
        placeholder={isReply ? "답글을 작성하세요..." : "댓글을 작성하세요..."}
        rows={isReply ? 2 : 3}
      ></textarea>
      <button 
        type="submit" 
        className={`mt-2 px-4 py-${isReply ? '1' : '2'} ${isReply ? 'text-sm' : 'text-base'} bg-neutral-500 text-white rounded cursor-pointer hover:bg-red-400`}
      >
        {isReply ? '답글 등록' : '댓글 등록'}
      </button>
    </form>
  );
};

export default CommentForm;
