// src/components/community/AddBoard.jsx
import React, { useState } from "react";
import QuillEditor from "../QuillEditor";
import api from "../../api";

const AddBoard = ({ onCancel, onSuccess }) => {
  const [title, setTitle] = useState("");
  // 초기 값은 빈 Delta 객체로 설정 (Delta 형식으로 관리)
  const [content, setContent] = useState({ ops: [{ insert: "\n" }] });

  const handleSubmit = async () => {
    // 제목과 내용이 모두 입력되었는지 확인
    if (
      !title.trim() ||
      (content.ops &&
        content.ops.length === 1 &&
        typeof content.ops[0].insert === "string" &&
        content.ops[0].insert.trim() === "")
    ) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // 토큰 확인 (localStorage에 authToken이 저장되어 있다고 가정)
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    // 백엔드에 전송할 PostCommunity 객체 구성
    const postData = {
      title: title,
      content: content, // Delta 객체가 JSON 형태로 전송됨 (백엔드에서 문자열로 변환 가능)
      categoryId: 1, // 필요에 따라 수정 가능
    };

    // 디버깅: 전송 전 payload 내용을 콘솔에 출력
    console.log("백엔드로 전송될 payload:", JSON.stringify(postData, null, 2));

    try {
      const response = await api.post("/community/post", postData, {
        headers: { Authorization: token },
      });
      console.log("게시글 등록 응답:", response.data);
      alert("글 등록이 완료되었습니다.");
      // 등록 성공 시 onSuccess 혹은 onCancel 호출
      if (onSuccess) {
        onSuccess();
      } else if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      alert("글 등록에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="p-6 bg-white flex flex-col w-full gap-4 shadow-md rounded justify-center">
      <h1 className="text-3xl font-bold mb-6">게시글 글쓰기</h1>
      <hr className="border-gray-300" />
      <div className="flex flex-col gap-5 p-3">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="w-full border p-2 rounded border-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* QuillEditor는 Delta 객체를 반환 */}
        <QuillEditor value={content} onChange={setContent} />
      </div>
      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={onCancel}
          className="bg-neutral-700 text-white p-2 w-[200px] cursor-pointer"
        >
          작성 취소
        </button>
        <button
          onClick={handleSubmit}
          className="bg-red-500 text-white p-2 w-[200px] cursor-pointer"
        >
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default AddBoard;
