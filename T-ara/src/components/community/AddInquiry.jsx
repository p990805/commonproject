import React, { useState } from "react";
import api from "../../api";

const AddInquiry = ({ onCancel, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onCreate = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = { title, content };
      const response = await api.post("/inquiry/post", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("문의 생성 완료:", response.data);
      setTitle("");
      setContent("");
      // 등록 성공 후 부모의 onSuccess 호출 → 목록 새로고침
      if (onSuccess) onSuccess();
      onCancel();
    } catch (err) {
      console.error("문의 생성 에러:", err);
      setError("문의 등록 중 에러가 발생했습니다.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">1대1 문의 작성</h1>
      <hr className="border-gray-300" />

      <div className="flex flex-col p-3 gap-5">
        <p>문의하실 내용을 입력해주세요.</p>

        <div>
          <p>문의 제목</p>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="border p-2 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <p>문의 상세 내용</p>
          <textarea
            placeholder="문의하실 내용을 입력해주세요."
            className="w-full p-2 border rounded h-32 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="flex gap-5 w-full items-center justify-center mt-4">
        <button
          className="bg-red-500 p-3 w-[200px] flex items-center justify-center text-center font-semibold text-md text-white rounded cursor-pointer"
          onClick={onCreate}
          disabled={loading}
        >
          {loading ? "문의 중..." : "문의하기"}
        </button>

        <button
          className="border border-gray-400 p-3 w-[200px] flex items-center justify-center text-center font-semibold text-md rounded cursor-pointer"
          onClick={onCancel}
          disabled={loading}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default AddInquiry;
