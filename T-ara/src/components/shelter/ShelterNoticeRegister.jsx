// src/components/ShelterNoticeRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavigation from "./SidebarNavigation";
import QuillEditor from "../QuillEditor";
import api from "../../api";

const ShelterNoticeRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "", // 델타 객체 형태로 저장될 예정
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
      content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 제목은 문자열이므로 .trim() 사용
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    // 내용 검증: 문자열인 경우와 델타 객체인 경우로 분기 처리
    let isContentEmpty = false;
    if (typeof formData.content === "string") {
      isContentEmpty = !formData.content.trim();
    } else if (
      typeof formData.content === "object" &&
      formData.content.ops
    ) {
      // 델타 객체의 ops 배열이 비어있거나 단순 newline만 있다면 내용 없음으로 판단
      if (
        formData.content.ops.length === 0 ||
        (formData.content.ops.length === 1 &&
          formData.content.ops[0].insert === "\n")
      ) {
        isContentEmpty = true;
      }
    } else {
      isContentEmpty = true;
    }

    if (isContentEmpty) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 보호소 전용 페이지이므로, 현재 로그인한 보호소의 ID는 localStorage의 "shelterId"에 저장되어 있다고 가정합니다.
    const shelterId = localStorage.getItem("shelterId");
    if (!shelterId) {
      alert("보호소 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    // 델타 객체를 JSON 문자열로 변환하여 백엔드에 전달 (매퍼에서는 #{saveContent}로 받음)
    const updatedData = {
      ...formData,
      shelterId,
      saveContent: JSON.stringify(formData.content),
    };

    // 제출 전에 콘솔에 payload 출력 (확인용)
    console.log("Form submitted:", updatedData);

    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post("notice/post", updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      alert(response.data.message);
      // 등록 성공 후 보호소 공지사항 목록 페이지로 이동
      navigate("/shelter/notice");
    } catch (error) {
      console.error("공지사항 등록 오류:", error);
      alert("공지사항 등록에 실패하였습니다.");
    }
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
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
