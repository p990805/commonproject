import React, { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const ShelterAnimalRegister = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    species: "",
    isNeutered: "",
    shelter: "광주 동물보호센터",
    gender: "",
    registrationDate: "",
    breed: "",
    weight: "",
    color: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);

    if (validFiles.length !== files.length) {
      alert("일부 파일이 5MB를 초과하여 제외되었습니다.");
    }

    Promise.all(
      validFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })
    ).then((results) => {
      setAdditionalImages((prev) => [...prev, ...results]);
    });
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        ...formData,
        mainImage,
        ...(additionalImages.length > 0 && { additionalImages }),
      };

      const response = await api.post("/diary/register", requestData);

      if (response.status === 200) {
        alert("등록이 완료되었습니다.");
        navigate("/shelter/animal");
      }
    } catch (error) {
      console.error("동물 등록 중 오류가 발생했습니다:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />
      <div className="flex-1">
        <div className="max-w-[1200px] mx-auto p-8">
          <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed mb-6 text-center">
            유기동물 등록
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7"
          >
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="mb-6">
                  <label className="text-sm mb-2 block">
                    대표 사진 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-start gap-4">
                    <div className="w-40 h-40 border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                      {mainImage ? (
                        <img
                          src={mainImage}
                          alt="Main preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-gray-400 mb-2">No Image</div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-2">
                        <div>권장 사이즈 : 최소 200 X 200 이상</div>
                        <div>파일형식 : JPG, JPEG, PNG</div>
                        <div>최대 용량 : 5MB 이하</div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
                        style={{ clip: "rect(0, 0, 0, 0)" }}
                        id="main-image"
                        onChange={handleMainImageChange}
                        required
                      />
                      <label
                        htmlFor="main-image"
                        className="px-4 py-2 bg-gray-200 text-sm rounded cursor-pointer inline-block hover:bg-gray-300"
                      >
                        사진등록
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">추가 사진</label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                      {additionalImages.map((image, index) => (
                        <div key={index} className="relative w-24 h-24">
                          <img
                            src={image}
                            alt={`Additional ${index + 1}`}
                            className="w-24 h-24 object-cover border border-gray-200 rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {additionalImages.length === 0 && (
                        <div className="w-24 h-24 border border-gray-200 rounded flex items-center justify-center">
                          <div className="text-gray-400 text-xs">No Image</div>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="additional-images"
                      onChange={handleAdditionalImagesChange}
                    />
                    <label
                      htmlFor="additional-images"
                      className="px-4 py-2 bg-gray-200 text-sm rounded cursor-pointer inline-block hover:bg-gray-300"
                    >
                      사진등록
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <div className="w-[300px] space-y-4">
                  <div>
                    <label className="text-sm block mb-1">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="이름"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      생년월일(추정) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      placeholder="생년월일 8자리"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      종 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="species"
                      value={formData.species}
                      onChange={handleInputChange}
                      placeholder="종"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      중성화 여부 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="isNeutered"
                      value={formData.isNeutered}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                      required
                    >
                      <option value="">중성화 여부</option>
                      <option value="yes">예</option>
                      <option value="no">아니오</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      보호소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="shelter"
                      value={formData.shelter}
                      disabled
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded bg-gray-50"
                    />
                  </div>
                </div>

                <div className="w-[300px] space-y-4">
                  <div>
                    <label className="text-sm block mb-1">
                      성별 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                      required
                    >
                      <option value="">성별</option>
                      <option value="male">수컷</option>
                      <option value="female">암컷</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      등록일시 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="registrationDate"
                      value={formData.registrationDate}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      품종 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      placeholder="품종"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      몸무게 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="몸무게"
                        className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        kg
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm block mb-1">
                      털색 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      placeholder="털색"
                      className="w-full h-10 px-3 border border-[#dee1e8] rounded"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm block mb-1">
                  설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="유기동물 설명을 작성해주세요."
                  className="w-full h-40 p-3 border border-[#dee1e8] rounded resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => navigate("/shelter/animal")}
                  className="w-40 h-12 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="w-40 h-12 bg-[#4763E4] text-white rounded hover:bg-[#3951d3]"
                >
                  등록 완료
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShelterAnimalRegister;
