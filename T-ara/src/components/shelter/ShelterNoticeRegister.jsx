import React, { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";
import QuillEditor from "../QuillEditor";

const ShelterNoticeRegister = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // API 호출 로직 추가
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed text-center">
              공지사항 등록
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-lg shadow-lg p-6"
          >
            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Content Editor */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <div className="border border-gray-300 rounded-md">
                <QuillEditor
                  value={formData.content}
                  onChange={handleQuillChange}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => window.history.back()}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShelterNoticeRegister;
