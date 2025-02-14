// src/components/community/CommentForm.jsx
import { useState } from "react";
import api from "../../api";

const CommentForm = ({ communityId, onCommentAdded, authHeader }) => {
  const [newCommentText, setNewCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const commentData = {
      content: newCommentText,
      communityId, // 최상위 댓글이면 communityId만 전달
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
    <form onSubmit={handleCommentSubmit} className="mb-4">
      <textarea
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="댓글을 작성하세요..."
      ></textarea>
      <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        댓글 등록
      </button>
    </form>
  );
};

export default CommentForm;
