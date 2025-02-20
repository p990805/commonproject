// src/components/streaming/LiveSessionForm.jsx
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../../api";
import SidebarNavigation from "../SidebarNavigation";

const LiveSessionForm = ({ form, handleChange, handleSubmit }) => {
  const [donatedAnimalList, setDonatedAnimalList] = useState([]);

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

  useEffect(() => {
    if (form.dataSource === "animal") {
      api
        .get("/stream/donated-animal-list?dataSource=animal")
        .then((response) => {
          setDonatedAnimalList(response.data);
        })
        .catch((error) => {
          console.error("동물 목록 조회 에러:", error);
        });
    }
  }, [form.dataSource]);

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="text-center mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              라이브 방송 시작
            </h1>
          </div>

          <div className="bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 데이터 소스 선택 */}
                <div>
                  <label
                    htmlFor="dataSource"
                    className="block text-sm font-medium mb-1"
                  >
                    데이터 소스
                  </label>
                  <select
                    id="dataSource"
                    name="dataSource"
                    value={form.dataSource}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="shelter">보호소</option>
                    <option value="animal">동물</option>
                  </select>
                </div>

                {/* 데이터 소스가 animal인 경우 후원 가능한 동물 선택 */}
                {form.dataSource === "animal" && (
                  <div>
                    <label
                      htmlFor="relationalId"
                      className="block text-sm font-medium mb-1"
                    >
                      후원 동물 선택
                    </label>
                    <select
                      id="relationalId"
                      name="relationalId"
                      value={form.relationalId || ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
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
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-1"
                  >
                    방송 제목
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="방송 제목을 입력하세요"
                    required
                  />
                </div>

                {/* 방송 설명 입력 */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-1"
                  >
                    방송 설명
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="방송 설명을 입력하세요"
                    rows="3"
                  ></textarea>
                </div>

                {/* JWT 토큰에서 추출한 참가자명을 hidden input으로 전달 */}
                <input
                  type="hidden"
                  name="participantName"
                  value={participantName}
                />

                {/* 방송 시작 버튼 */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="w-40 h-12 bg-[#4763E4] text-white rounded hover:bg-[#3951d3]"
                  >
                    방송 시작
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionForm;
