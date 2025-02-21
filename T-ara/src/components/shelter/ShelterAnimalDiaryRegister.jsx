import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavigation from "./SidebarNavigation";
import QuillEditor from "../QuillEditor";
import api from "../../api";

const ShelterAnimalDiaryRegister = () => {
  const navigate = useNavigate();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    writtenDate: "",
    animalId: "",
  });

  // 동물 목록 상태 관리
  const [animals, setAnimals] = useState([]);

  // 동물 목록 불러오기
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get("/animal/list/shelter", {
          params: {
            protectStatus: "false",
            startDate: "1900-01-01",
            endDate: "2999-12-31",
            speciesId: "all",
            breedId: "all",
            animalName: "",
          },
        });

        if (response.data?.animalList) {
          setAnimals(response.data.animalList);
        }
      } catch (error) {
        console.error("동물 목록 불러오기 실패:", error.response || error);
        alert("동물 목록을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchAnimals();
  }, []);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 에디터 내용 변경 핸들러
  const handleQuillChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        animalId: formData.animalId,
        title: formData.title,
        content: formData.content,
        writtenDate: formData.writtenDate,
      };

      const response = await api.post("/diary/post", requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      alert("동물 일지가 성공적으로 등록되었습니다.");
      navigate(-1);
    } catch (error) {
      console.error("일지 등록 실패:", error.response?.data || error.message);
      if (error.response?.status === 404) {
        alert(
          "404 오류: API 엔드포인트가 존재하지 않습니다. URL을 확인하세요."
        );
      } else {
        alert("일지 등록에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold leading-relaxed text-center">
              동물 일지 등록
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-lg shadow-lg p-6"
          >
            {/* 제목 입력 */}
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
                placeholder="일지 제목을 입력해주세요"
              />
            </div>

            {/* 동물 선택 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                동물 선택
              </label>
              <select
                name="animalId"
                value={formData.animalId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">동물을 선택해주세요</option>
                {animals.map((animal) => (
                  <option key={animal.animalId} value={animal.animalId}>
                    {`${animal.animalName} (${animal.speciesName})`}
                  </option>
                ))}
              </select>
            </div>

            {/* 내용 에디터 */}
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

            {/* 작성일자 */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                작성일자
              </label>
              <input
                type="date"
                name="writtenDate"
                value={formData.writtenDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => navigate(-1)}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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

export default ShelterAnimalDiaryRegister;
