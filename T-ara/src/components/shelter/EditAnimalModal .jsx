import React, { useState, useEffect } from "react";
import api from "../../api";

const EditAnimalModal = ({ animal, isOpen, onClose, onSave }) => {
  const [mainImage, setMainImage] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [breedList, setBreedList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    birth: "",
    gender: "",
    neuteringStatus: "",
    color: "",
    weight: "",
    description: "",
    speciesId: "",
    breedId: "",
    animalStatus: "",
  });

  // 이미지 파일 처리 함수
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }
      setMainImage(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result);
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

    setAdditionalImages((prev) => [...prev, ...validFiles]);

    // 미리보기 생성
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setAdditionalImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeAdditionalImage = (indexToRemove) => {
    // 추가 이미지 미리보기에서 해당 인덱스 제거
    setAdditionalImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );

    // 실제 파일 배열에서도 해당 인덱스 제거
    setAdditionalImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // 초기 데이터 설정
  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        // 동물 상세 정보 가져오기
        const response = await api.get(`/animal/modifyInfo/${animal.animalId}`);
        const animalInfo = response.data.animalInfo;

        // 종 목록 가져오기
        const speciesResponse = await api.get("/animal/species");
        if (speciesResponse.data.speciesList) {
          setSpeciesList(speciesResponse.data.speciesList);

          // 현재 동물의 종에 맞는 종 ID 찾기
          const matchedSpecies = speciesResponse.data.speciesList.find(
            (species) => species.speciesId === animalInfo.speciesId
          );

          if (matchedSpecies) {
            // 해당 종의 품종 목록 가져오기
            const breedResponse = await api.get(
              `/animal/breed/${matchedSpecies.speciesId}`
            );
            if (breedResponse.data?.breedList) {
              setBreedList(breedResponse.data.breedList);
            }

            // 초기 폼 데이터 설정
            setFormData({
              name: animalInfo.animalName || "",
              birth: animalInfo.birth || "",
              gender: animalInfo.gender === "M" ? "male" : "female",
              neuteringStatus:
                animalInfo.neuteringStatus === "1" ? "yes" : "no",
              color: animalInfo.color || "",
              weight: animalInfo.weight || "",
              description: animalInfo.description || "",
              speciesId: animalInfo.speciesId,
              breedId: animalInfo.breedId,
              animalStatus: animalInfo.animalStatus || "protecting",
            });

            // 썸네일 및 추가 이미지 설정
            if (animalInfo.animalImages && animalInfo.animalImages.length > 0) {
              // 첫 번째 이미지를 썸네일로 설정
              setThumbnailPreview(animalInfo.animalImages[0]);

              // 나머지 이미지를 추가 이미지로 설정
              setAdditionalImagePreviews(animalInfo.animalImages.slice(1));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching animal details:", error);
        alert("동물 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };

    if (animal) {
      fetchAnimalDetails();
    }
  }, [animal]);

  // 종이 변경될 때 품종 목록 업데이트
  useEffect(() => {
    const fetchBreeds = async () => {
      if (formData.speciesId) {
        try {
          const response = await api.get(`/animal/breed/${formData.speciesId}`);
          if (response.data?.breedList) {
            setBreedList(response.data.breedList);
          }
        } catch (error) {
          console.error("Error fetching breeds:", error);
        }
      } else {
        setBreedList([]); // 종이 선택되지 않았을 때는 품종 목록 비우기
      }
    };

    fetchBreeds();
  }, [formData.speciesId]);

  // 이미지 정리를 위한 cleanup 추가
  useEffect(() => {
    return () => {
      // 기존 URL 객체들 정리
      if (thumbnailPreview && thumbnailPreview.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailPreview);
      }
      additionalImagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  // handleSubmit 함수 수정 (multipart/form-data 처리 명확화)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 이미지 제외한 기본 데이터
      const basicData = {
        animalId: animal.animalId,
        animalName: formData.name,
        birth: formData.birth,
        gender: formData.gender === "male" ? "M" : "F",
        neuteringStatus: formData.neuteringStatus === "yes" ? "1" : "0",
        color: formData.color,
        weight: formData.weight,
        description: formData.description,
        speciesId: formData.speciesId,
        breedId: formData.breedId,
        animalStatus: formData.animalStatus,
      };

      // 이미지가 있는 경우 별도 처리
      const formDataToSend = new FormData();

      // 기본 정보 추가
      Object.keys(basicData).forEach((key) => {
        formDataToSend.append(key, basicData[key]);
      });

      // 썸네일 이미지 추가
      if (mainImage instanceof File) {
        formDataToSend.append("thumbnail", mainImage);
      }

      // 추가 이미지 추가
      additionalImages.forEach((image) => {
        if (image instanceof File) {
          formDataToSend.append("animalImages", image);
        }
      });

      // API 호출
      const response = await api.put(`/animal/modify`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("수정이 완료되었습니다.");
        onSave();
        onClose();
      }
    } catch (error) {
      console.error("Error updating animal:", error.response);
      alert(
        `수정 중 오류가 발생했습니다: ${
          error.response?.data?.message || "알 수 없는 오류"
        }`
      );
    }
  };

  return (
    <div className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-filter backdrop-blur-sm rounded-lg w-[900px] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">동물 정보 수정</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이미지 섹션 */}
          <div className="space-y-4">
            {/* 대표 사진 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                대표 사진 <span className="text-red-500">*</span>
              </label>
              <div className="flex items-start gap-4">
                <div className="w-40 h-40 border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-400">No Image</div>
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
                    onChange={handleMainImageChange}
                    className="hidden"
                    id="thumbnail"
                  />
                  <label
                    htmlFor="thumbnail"
                    className="px-4 py-2 bg-gray-200 text-sm rounded cursor-pointer inline-block hover:bg-gray-300"
                  >
                    사진변경
                  </label>
                </div>
              </div>
            </div>

            {/* 추가 사진 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                추가 사진
              </label>
              <div className="border border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  {additionalImagePreviews.map((preview, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={preview}
                        alt={`Additional ${index + 1}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="hidden"
                  id="additional-images"
                />
                <label
                  htmlFor="additional-images"
                  className="px-4 py-2 bg-gray-200 text-sm rounded cursor-pointer inline-block hover:bg-gray-300"
                >
                  사진추가
                </label>
              </div>
            </div>
          </div>

          {/* 기본 정보 섹션 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                생년월일 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                종 <span className="text-red-500">*</span>
              </label>
              <select
                name="speciesId"
                value={formData.speciesId}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-300 rounded"
                required
              >
                <option value="">종을 선택하세요</option>
                {speciesList.map((species) => (
                  <option key={species.speciesId} value={species.speciesId}>
                    {species.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                품종 <span className="text-red-500">*</span>
              </label>
              <select
                name="breedId"
                value={formData.breedId}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-300 rounded"
                required
                disabled={!formData.speciesId}
              >
                <option value="">품종을 선택하세요</option>
                {breedList.map((breed) => (
                  <option key={breed.breedId} value={breed.breedId}>
                    {breed.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                성별 <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-300 rounded"
                required
              >
                <option value="male">수컷</option>
                <option value="female">암컷</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                중성화 여부 <span className="text-red-500">*</span>
              </label>
              <select
                name="neuteringStatus"
                value={formData.neuteringStatus}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-300 rounded"
                required
              >
                <option value="yes">예</option>
                <option value="no">아니오</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                털색 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                몸무게 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-gray-300 rounded"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  kg
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                동물 상태 <span className="text-red-500">*</span>
              </label>
              <select
                name="animalStatus"
                value={formData.animalStatus}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-300 rounded"
                required
              >
                <option value="protecting">보호중</option>
                <option value="adopted">입양완료</option>
                <option value="returned">귀가완료</option>
                <option value="dead">사망</option>
              </select>
            </div>
          </div>

          {/* 설명 섹션 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded resize-none"
              required
            />
          </div>

          {/* 버튼 섹션 */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-32 h-10 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="w-32 h-10 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnimalModal;
