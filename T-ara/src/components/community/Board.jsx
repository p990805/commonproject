// Board.jsx
import { useState, useEffect } from "react";
import AddBoard from "./AddBoard";
import api from "../../api";
// 유틸 함수 import
import { deltaToHtml } from "../../utils/quillParser";

const Board = ({ onSelectPost }) => {
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const searchCriteria = {
      communityCategory: "all",
      category: "all",
      keyword: "",
      pageNum: "0",
    };

    api
      .post("/community/list", searchCriteria)
      .then((response) => {
        console.log("API 응답 데이터:", response.data);
        const rawPosts = response.data.communityList || [];
        // 중복 게시글 제거: 같은 communityId를 가진 게시글은 한 번만 사용
        const uniquePosts = rawPosts.filter(
          (post, index, self) =>
            index === self.findIndex((p) => p.communityId === post.communityId)
        );
        setPosts(uniquePosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API 호출 오류:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (showAddBoard) {
    return <AddBoard onCancel={() => setShowAddBoard(false)} />;
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">자유 게시판</h1>
        <button
          onClick={() => setShowAddBoard(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          게시글 작성하기
        </button>
      </div>
      <hr className="border-gray-300" />
      {posts.length === 0 ? (
        <div className="p-4 text-center text-gray-500">게시글 없음</div>
      ) : (
        <ul role="list" className="divide-y divide-gray-300">
          {posts.map((post) => {
            console.log("POST 객체:", post);
            const postId = post.communityId;
            // Quill Delta를 HTML로 변환
            const convertedHtml = deltaToHtml(post.content || "");

            return (
              <li
                key={postId}
                className="flex justify-between items-start gap-x-6 px-6 py-5 cursor-pointer"
                onClick={() => onSelectPost(postId)}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-x-4">
                    <img
                      src="/assets/nanum1.png"
                      alt="작성자 프로필"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {post.userName || "작성자"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {post.createdAt || "시간정보"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 mb-2">
                      {post.title || "제목 없음"}
                    </h2>
                    {/* Quill Delta → HTML 렌더링 */}
                    <div
                      className="text-sm text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: convertedHtml }}
                    />
                  </div>
                  <div className="flex items-center gap-x-6 text-xs text-gray-500">
                    <span>조회수 {post.viewCount || 0}</span>
                    <span>좋아요 {post.likeCount || 0}</span>
                    <span>댓글 {post.commentCount || 0}</span>
                  </div>
                </div>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="게시글 이미지"
                    className="w-40 h-45 object-cover rounded-md"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Board;
