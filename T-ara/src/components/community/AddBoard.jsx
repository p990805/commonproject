import React, { useState } from "react";
import QuillEditor from "../QuillEditor";

const AddBoard = () => {
  return (
    <div className="p-6 bg-white flex flex-col w-full gap-4 shadow-md rounded justify-center">
      <h1 className="text-3xl font-bold mb-6">게시글 글쓰기</h1>
      <hr className="border-gray-300" />

      <div className="flex flex-col gap-5 p-3">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="w-full border p-2 rounded border-gray-300"
        />
        <QuillEditor />
      </div>

      <div className="flex gap-4 items-center justify-center">
        <button className="bg-neutral-700 text-white p-2 w-[200px] cursor-pointer">
          작성 취소
        </button>
        <button className=" bg-red-500 text-white p-2 w-[200px] cursor-pointer">
          작성 완료
        </button>
      </div>
    </div>
  );
};
export default AddBoard;
