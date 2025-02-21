import React, { useState, useEffect } from 'react';
import { FaSave, FaCat, FaDog, FaCheck } from 'react-icons/fa';
import api from "../../api";

const ClassificationResults = ({ 
  classificationResults, 
  onSaveComplete, 
  onBackToUpload 
}) => {
  const [selectedImages, setSelectedImages] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [animalList, setAnimalList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimalList = async () => {
      try {
        const response = await api.get("/diary/shelter-animal");
        if (response.data.animalList) {
          setAnimalList(response.data.animalList);
        }
      } catch (error) {
        console.error("동물 목록을 가져오는 중 오류가 발생했습니다:", error);
        setAnimalList([]);
      }
    };
    fetchAnimalList();
  }, []);

  const handleImageSelect = (breedName, imageIndex) => {
    setSelectedImages(prev => ({
      ...prev,
      [breedName]: {
        ...prev[breedName],
        [imageIndex]: !prev[breedName]?.[imageIndex]
      }
    }));
  };

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(selectedAnimal?.animalId === animal.animalId ? null : animal);
  };

  const handleSaveSelected = async () => {
    if (!selectedAnimal) {
      alert('동물을 선택해주세요.');
      return;
    }

    // 선택된 이미지가 있는지 확인
    const hasSelectedImages = Object.values(selectedImages).some(
      imageObject => Object.values(imageObject).some(isSelected => isSelected)
    );
    
    if (!hasSelectedImages) {
      alert('하나 이상의 사진을 선택해주세요.');
      return;
    }
  
    setIsSaving(true);
    try {
      // Blob URL을 Base64로 변환하는 함수
      const convertBlobUrlToBase64 = async (blobUrl) => {
        try {
          const response = await fetch(blobUrl);
          const blob = await response.blob();
          
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error("Blob URL 변환 오류:", error);
          return null;
        }
      };
  
      // 이미지 변환 Promise 배열 생성
      const conversionPromises = [];
      
      // 모든 선택된 이미지에 대해 Base64 변환 작업 예약
      for (const [breed, images] of Object.entries(selectedImages)) {
        for (const [indexStr, isSelected] of Object.entries(images)) {
          if (isSelected) {
            const index = parseInt(indexStr);
            let image;
            
            if (breed === 'unclassified') {
              image = classificationResults.unclassified[index];
            } else {
              image = classificationResults.classified[breed][index];
            }
            
            if (image && image.preview) {
              const conversionPromise = convertBlobUrlToBase64(image.preview)
                .then(base64Data => ({ photoPath: base64Data }));
              conversionPromises.push(conversionPromise);
            }
          }
        }
      }
      
      // 모든 이미지 변환이 완료될 때까지 대기
      const convertedImages = await Promise.all(conversionPromises);
      
      // 변환 실패한 항목 제거
      const validImages = convertedImages.filter(img => img.photoPath !== null);
      
      if (validImages.length === 0) {
        throw new Error("이미지 변환에 실패했습니다.");
      }
  
      const payload = {
        animalId: selectedAnimal.animalId,
        animalName: selectedAnimal.animalName,
        images: validImages
      };
  
      console.log("서버로 전송되는 페이로드:", payload);
      await api.post("/shelter/categorize", payload);
      
      alert('선택한 이미지가 저장되었습니다.');
      onSaveComplete();
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다: ' + (error.message || '알 수 없는 오류'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 동물 프로필 리스트 */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 px-2">
          {animalList.map((animal) => (
            <button
              key={animal.animalId}
              onClick={() => handleAnimalSelect(animal)}
              className={`flex flex-col items-center space-y-2 min-w-[80px] transition-all active:scale-95 ${
                selectedAnimal?.animalId === animal.animalId 
                ? '' 
                : 'opacity-70'
              }`}
            >
              <div className={`w-16 h-16 rounded-full bg-gray-200 border-2 ${
                selectedAnimal?.animalId === animal.animalId 
                ? 'border-blue-500' 
                : 'border-transparent'
              }`}>
                {/* TODO: 이미지가 있을 경우 추가 */}
              </div>
              <span className="text-sm font-medium truncate max-w-[80px]">
                {animal.animalName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 분류된 사진 목록 */}
      {Object.entries(classificationResults.classified).map(([breedName, images]) => {
        const firstImage = images[0];
        const species = firstImage.species;
        const SpeciesIcon = species === "Cat" ? FaCat : FaDog;
        
        return (
          <div key={breedName} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-[#4763E4] flex items-center gap-2">
              <SpeciesIcon className="w-6 h-6 text-gray-700" />
              <span className="text-gray-500">
                {species === "Cat" ? "고양이" : "강아지"}:
              </span>
              <span>{breedName}</span>
              <span className="text-gray-500 ml-1">({images.length}장)</span>
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className="relative aspect-square cursor-pointer group"
                  onClick={() => handleImageSelect(breedName, index)}
                >
                  <img
                    src={image.preview}
                    alt={`${breedName} ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {selectedImages[breedName]?.[index] && (
                    <div className="absolute inset-0 bg-gray-600 opacity-50 rounded-lg flex items-center justify-center">
                      <FaCheck className="w-8 h-8 text-white opacity-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* 미분류 사진 */}
      {classificationResults.unclassified.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-500">
            미분류 ({classificationResults.unclassified.length}장)
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {classificationResults.unclassified.map((image, index) => (
              <div 
                key={index} 
                className="relative aspect-square cursor-pointer group"
                onClick={() => handleImageSelect('unclassified', index)}
              >
                <img
                  src={image.preview}
                  alt={`미분류 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {selectedImages['unclassified']?.[index] && (
                  <div className="absolute inset-0 bg-gray-600 opacity-50 rounded-lg flex items-center justify-center">
                    <FaCheck className="w-8 h-8 text-white opacity-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 하단 버튼 */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBackToUpload}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          돌아가기
        </button>
        <button
          onClick={handleSaveSelected}
          disabled={isSaving || !selectedAnimal}
          className="px-6 py-2 bg-[#4763E4] text-white rounded-lg hover:bg-[#3951d3] disabled:bg-gray-400 flex items-center gap-2"
        >
          <FaSave className="w-4 h-4" />
          <span>
            {isSaving ? '저장 중...' : selectedAnimal ? '선택된 항목 저장' : '동물을 선택해주세요'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ClassificationResults;