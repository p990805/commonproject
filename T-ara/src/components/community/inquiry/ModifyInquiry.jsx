import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // v6에서는 useNavigate 사용
import api from "../../../api";

const ModifyInquiry = () => {
  const { inquiryId } = useParams(); // URL에서 inquiryId 추출 (예: /inquiry/modifyinfo/4)
  const navigate = useNavigate();

  // 수정 폼에 필요한 상태 (userId 포함)
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // 문의 상세 정보를 GET 요청으로 불러옴
  useEffect(() => {
    const fetchInquiryDetail = async () => {
      setLoading(true);
      setError("");
      try {
        // inquiryId를 포함한 URL로 요청
        const response = await api.get(`/inquiry/detail/${inquiryId}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const inquiry = response.data.inquiry;
          if (inquiry) {
            setUserId(inquiry.userId);
            setTitle(inquiry.title || "");
            setContent(inquiry.content || "");
          } else {
            setError("문의 정보를 찾을 수 없습니다.");
          }
        } else {
          setError(response.data.message || "문의 정보를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error("문의 상세 정보 호출 중 에러:", err);
        setError("문의 정보를 불러오는 중 오류가 발생했습니다.");
      }
      setLoading(false);
    };

    fetchInquiryDetail();
  }, [inquiryId]);

  // 수정 요청 (PUT 요청)
  const onUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // 백엔드에서 요구하는 JSON 형식의 payload 구성
      const payload = { inquiryId, userId, title, content };
      const response = await api.put("/inquiry/modify", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMessage("문의 수정이 완료되었습니다.");
        // 수정 성공 후 문의 목록 페이지로 이동 (예: /inquiry)
        navigate("/community/inquiry");
      } else {
        setError(response.data.message || "문의 수정에 실패했습니다.");
      }
    } catch (err) {
      console.error("문의 수정 요청 중 에러:", err);
      setError("문의 수정 중 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">문의 수정</h1>
      {loading && <p>문의 정보를 불러오는 중...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      {!loading && !error && (
        <form onSubmit={onUpdate}>
          <div className="flex flex-col gap-5">
            <div>
              <p>문의 제목</p>
              <input
                type="text"
                placeholder="문의 제목을 입력해주세요."
                className="border p-2 rounded w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <p>문의 상세 내용</p>
              <textarea
                placeholder="문의 상세 내용을 입력해주세요."
                className="w-full p-2 border rounded h-32 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-5 mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              수정하기
            </button>
            <button
              type="button"
              className="border border-gray-400 text-gray-700 px-4 py-2 rounded"
              onClick={() => navigate("/community/inquiry")}
              disabled={loading}
            >
              취소
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModifyInquiry;
