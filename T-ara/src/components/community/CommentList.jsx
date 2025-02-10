// src/components/community/CommentList.jsx
const CommentList = ({ commentList }) => {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">댓글</h2>
        {commentList.length === 0 ? (
          <p className="text-gray-500">댓글이 없습니다.</p>
        ) : (
          <ul>
            {commentList.map((comment) => (
              <li key={comment.commentId} className="mb-2 border-b pb-2">
                <p className="text-sm font-bold">
                  {comment.userName || comment.userId || "익명"}
                </p>
                <p className="text-sm">{comment.content}</p>
                {/* 대댓글(답글) 관련 UI는 필요 시 추가 */}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default CommentList;
  