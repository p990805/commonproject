// src/components/community/EditBoard.jsx
import React, { useState } from "react";
import QuillEditor from "../QuillEditor";
import api from "../../api";

const EditBoard = ({ communityId, initialData, onCancel, onSuccess }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(
    initialData.content || { ops: [{ insert: "\n" }] }
  );

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      (content.ops &&
        content.ops.length === 1 &&
        content.ops[0].insert.trim() === "")
    ) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    // 로컬 스토리지에 저장된 토큰은 이미 "Bearer ..." 형식으로 저장되어 있다고 가정
    const authHeader = token;

    // 백엔드가 요구하는 전체 데이터 구조로 수정 요청 페이로드 구성
    const modifiedData = {
      communityId,                      // 수정할 게시글 ID
      categoryId: initialData.categoryId, // 반드시 포함 (예: "1")
      userId: initialData.userId,           // 반드시 포함 (예: "8")
      title,
      content,
      saveContent: initialData.saveContent, // 필요 시 null 또는 기존 값
    };

    try {
      const response = await api.put("/community/modify", modifiedData, {
        headers: { Authorization: authHeader },
      });
      console.log("수정 응답:", response.data);
      alert(response.data.message);
      onSuccess && onSuccess();
    } catch (error) {
      console.error("수정 오류:", error);
      alert("수정에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  // 게시글 삭제 기능 추가
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    const authHeader = token; // 이미 Bearer ... 형식

    try {
      const response = await api.get(`/community/delete/${communityId}`, {
        headers: { Authorization: authHeader },
      });
      console.log("삭제 응답:", response.data);
      alert(response.data.message);
      // 삭제 성공 후 onSuccess 콜백 호출 또는 적절한 페이지로 이동
      onSuccess && onSuccess();
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">게시글 수정</h2>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className="w-full border p-2 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <QuillEditor value={content} onChange={setContent} />
      <div className="flex gap-4 mt-4">
        <button
          onClick={onCancel}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          수정 완료
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-700 text-white px-4 py-2 rounded"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default EditBoard;
