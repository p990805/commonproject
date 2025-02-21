// Board.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import AddBoard from "./AddBoard";
import api from "../../api";
import { deltaToHtml } from "../../utils/quillParser";

const Board = () => {
  const navigate = useNavigate(); // navigate 훅 사용
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // pagination 관련 state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;

  // 게시글 불러오기
  const fetchPosts = () => {
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
        const rawPosts = response.data.communityList || [];
        // 중복 제거: 같은 communityId를 가진 게시글은 한 번만 사용
        const uniquePosts = rawPosts.filter(
          (post, idx, self) =>
            idx === self.findIndex((p) => p.communityId === post.communityId)
        );
        // 최신순 정렬 (생성일 기준 내림차순)
        uniquePosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(uniquePosts);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시글 작성 화면 표시
  if (showAddBoard) {
    return (
      <AddBoard
        onCancel={() => setShowAddBoard(false)}
        onSuccess={() => {
          setShowAddBoard(false);
          fetchPosts();
        }}
      />
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 현재 페이지에 해당하는 게시글들 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 페이지 번호 클릭 핸들러
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션 버튼 렌더링 함수
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 border rounded-md mx-1 ${
            i === currentPage ? "bg-red-500 text-white" : "bg-white text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md">
      {/* 상단 타이틀 및 게시글 작성 버튼 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">자유 게시판</h1>
        <button
          onClick={() => setShowAddBoard(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          게시글 작성하기
        </button>
      </div>
      <hr className="border-gray-300 mb-4" />

      {/* 게시글이 없을 경우 */}
      {posts.length === 0 ? (
        <div className="p-4 text-center text-gray-500">게시글 없음</div>
      ) : (
        <>
          <table className="table-auto w-full text-sm text-gray-700">
            <thead>
              <tr className="border-b bg-gray-100 text-gray-600">
                <th className="px-4 py-2 text-left w-1/2">제목</th>
                <th className="px-4 py-2 text-center w-1/6">글쓴이</th>
                <th className="px-4 py-2 text-center w-1/6">날짜</th>
                <th className="px-4 py-2 text-center w-1/12">조회</th>
                <th className="px-3 py-2 text-center w-1/12">좋아요</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => {
                const {
                  communityId,
                  title,
                  userName,
                  createdAt,
                  viewCount,
                  likeCount,
                } = post;
                return (
                  <tr
                    key={communityId}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    // 게시글 클릭 시 community/board/:communityId 로 이동
                    onClick={() => navigate(`/community/board/${communityId}`)}
                  >
                    <td className="px-4 py-2">
                      <div className="font-semibold">{title || "제목 없음"}</div>
                    </td>
                    <td className="px-4 py-2 text-center">{userName || "작성자"}</td>
                    <td className="px-4 py-2 text-center">
                      {createdAt ? createdAt.slice(0, 16) : "시간정보"}
                    </td>
                    <td className="px-4 py-2 text-center">{viewCount || 0}</td>
                    <td className="px-4 py-2 text-center">{likeCount || 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* 페이지네이션 컨트롤 */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              className="px-3 py-1 border rounded-md mx-1"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {renderPagination()}
            <button
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              className="px-3 py-1 border rounded-md mx-1"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
