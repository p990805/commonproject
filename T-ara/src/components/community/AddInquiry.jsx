import { useState } from "react";

const AddInquiry = ({ onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onCreate = () => {
    console.log("문의 생성:", { title, content });
    setTitle("");
    setContent("");
    // 실제로는 서버 전송 후 onCancel() 등 원하는 동작
    // 여기서는 단순히 콘솔만 찍고 닫습니다.
    onCancel();
  };

  return (
    <div className="w-full p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold  mb-6">1대1 문의 작성</h1>
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

      <div className="flex gap-5 w-full items-center justify-center mt-4">
        <button
          className="bg-red-500 p-3 w-[200px] flex items-center justify-center text-center font-semibold text-md text-white rounded cursor-pointer"
          onClick={onCreate}
        >
          문의하기
        </button>

        <button
          className="border border-gray-400 p-3 w-[200px] flex items-center justify-center text-center font-semibold text-md rounded cursor-pointer"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default AddInquiry;
