// src/components/community/CommentList.jsx
import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ commentList, onCommentDelete, onCommentModifySuccess, refreshComments }) => {
  // 상위 댓글 필터링
  const topLevelComments = commentList.filter(
    comment => comment.personId === null || comment.personId === ""
  );

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">댓글</h2>
      {commentList.length === 0 ? (
        <p className="text-gray-500">댓글이 없습니다.</p>
      ) : (
        <ul>
          {commentList.map((comment) => (
            <CommentItem
              key={comment.commentId}
              comment={comment}
              allComments={commentList}
              onDelete={onCommentDelete}
              onModifySuccess={onCommentModifySuccess}
              refreshComments={refreshComments} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
