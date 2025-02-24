import React, { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";
import QuillEditor from "../QuillEditor";
import api from "../../api";

const ShelterCampaignRegister = () => {
  const shelterName = localStorage.getItem("shelterName");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    targetAmount: "",
    achievedAmount: "0",
    startedAt: "",
    endedAt: "",
    shelterName: shelterName,
  });

  const base64ToFile = async (base64String, filename) => {
    try {
      const res = await fetch(base64String);
      const blob = await res.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error("Error converting base64 to file:", error);
      return null;
    }
  };

  const extractImagesFromQuill = (quillContent) => {
    if (!quillContent || !quillContent.ops) return [];

    return quillContent.ops
      .filter((op) => op.insert && op.insert.image)
      .map((op) => op.insert.image);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const campaignData = {
        title: formData.title,
        targetAmount: parseInt(formData.targetAmount),
        achievedAmount: 0,
        startedAt: formData.startedAt,
        endedAt: formData.endedAt,
        simpleDescription: formData.description,
        content: formData.content,
      };

      // API 호출
      const response = await api.post("/campaigns", campaignData);

      if (response.status === 201 || response.status === 200) {
        alert("캠페인이 성공적으로 등록되었습니다.");
        window.history.back();
      }
    } catch (error) {
      console.error("Failed to create campaign:", error);
      alert("캠페인 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed text-center">
              캠페인 후원 등록
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

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                간단 설명
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="캠페인에 대한 간단한 설명을 입력해주세요"
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

            {/* Amount Inputs */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  목표금액
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="targetAmount"
                    value={formData.targetAmount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="absolute right-4 top-2 text-gray-500">
                    원
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  보호소 명
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="shelterName"
                    value={formData.shelterName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  캠페인 시작일시
                </label>
                <input
                  type="datetime-local"
                  name="startedAt"
                  value={formData.startedAt}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  캠페인 마감일시
                </label>
                <input
                  type="datetime-local"
                  name="endedAt"
                  value={formData.endedAt}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
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

export default ShelterCampaignRegister;
