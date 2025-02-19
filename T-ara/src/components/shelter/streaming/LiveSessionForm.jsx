// src/components/streaming/LiveSessionForm.jsx
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../../api";

const LiveSessionForm = ({ form, handleChange, handleSubmit }) => {
  const [donatedAnimalList, setDonatedAnimalList] = useState([]);

  const handleBack = () => {
    window.history.back();
  };

  let participantName = "";
  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      participantName = decodedToken["name"];
    }
  } catch (error) {
    console.error("토큰 디코딩 오류:", error);
  }

  // 데이터 소스가 'animal'인 경우 후원 가능한 동물 목록을 가져옵니다.
  useEffect(() => {
    if (form.dataSource === "animal") {
      api.get("/stream/donated-animal-list?dataSource=animal")
        .then((response) => {
          setDonatedAnimalList(response.data);
        })
        .catch((error) => {
          console.error("동물 목록 조회 에러:", error);
        });
    }
  }, [form.dataSource]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 text-blue-500 hover:underline"
      >
        뒤로가기
      </button>
      <h2 className="text-2xl font-bold mb-4">라이브 방송 시작</h2>
      <form onSubmit={handleSubmit}>
        {/* 데이터 소스 선택 */}
        <div className="mb-4">
          <label htmlFor="dataSource" className="block text-gray-700 mb-2">
            데이터 소스
          </label>
          <select
            id="dataSource"
            name="dataSource"
            value={form.dataSource}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="shelter">보호소</option>
            <option value="animal">동물</option>
          </select>
        </div>

        {/* 데이터 소스가 animal인 경우 후원 가능한 동물 선택 */}
        {form.dataSource === "animal" && (
          <div className="mb-4">
            <label htmlFor="relationalId" className="block text-gray-700 mb-2">
              후원 동물 선택
            </label>
            <select
              id="relationalId"
              name="relationalId"  // animalId 대신 relationalId로 값을 전달합니다.
              value={form.relationalId || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">동물을 선택하세요</option>
              {donatedAnimalList.map((animal) => (
                <option key={animal.animalId} value={animal.animalId}>
                  {animal.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 방송 제목 입력 */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            방송 제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="방송 제목을 입력하세요"
            required
          />
        </div>

        {/* 방송 설명 입력 */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            방송 설명
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="방송 설명을 입력하세요"
            rows="3"
          ></textarea>
        </div>

        {/* JWT 토큰에서 추출한 참가자명을 hidden input으로 전달 */}
        <input type="hidden" name="participantName" value={participantName} />

        {/* 방송 시작 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          방송 시작
        </button>
      </form>
    </div>
  );
};

export default LiveSessionForm;
