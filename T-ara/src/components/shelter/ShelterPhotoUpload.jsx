import React, { useState } from 'react';
import { FaCloudUploadAlt, FaImage, FaTimes, FaPlus } from 'react-icons/fa';
import SidebarNavigation from "./SidebarNavigation";

const ImageUploadButton = ({ multiple = false, onChange, children }) => (
  <label className="cursor-pointer">
    <input
      type="file"
      multiple={multiple}
      className="hidden"
      accept="image/*"
      onChange={onChange}
    />
    {children}
  </label>
);

const ShelterPhotoUpload = () => {
  const [classificationImages, setClassificationImages] = useState([]);
  const [classificationResults, setClassificationResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 이미지 분류 핸들러
  const handleClassificationImageSelect = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setClassificationImages(prev => [...prev, ...newImages]);
    setClassificationResults(prev => [...prev, ...newImages.map(() => null)]);
  };

  const handleRemoveClassificationImage = (index) => {
    setClassificationImages(prev => prev.filter((_, i) => i !== index));
    setClassificationResults(prev => prev.filter((_, i) => i !== index));
  };

  const handleClassifyImages = async () => {
    if (classificationImages.length === 0) return;

    setIsLoading(true);
    const results = [];

    try {
      for (const image of classificationImages) {
        const formData = new FormData();
        formData.append('image', image.file);

        const response = await fetch('http://localhost:5000/classify', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        results.push(data);
      }
      setClassificationResults(results);
    } catch (error) {
      console.error('이미지 분류 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />
      
      <div className="flex-1 p-8">
        <h1 className="text-[22.50px] font-bold text-[#191919] leading-relaxed">
          유기동물 사진 업로드
        </h1>

        {/* 이미지 분류 섹션 */}
        <div className="bg-white rounded-lg shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-6">
          {classificationImages.length === 0 ? (
            <ImageUploadButton 
              multiple 
              onChange={handleClassificationImageSelect}
            >
              <div className="flex flex-col items-center justify-center h-[300px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 mb-6">
                <FaImage className="w-24 h-24 text-gray-400" />
                <span className="mt-4 text-gray-500 text-lg text-center">
                  분류할 이미지를 선택하세요
                </span>
              </div>
            </ImageUploadButton>
          ) : (
            <div className="grid grid-cols-5 gap-4 mb-6">
              {classificationImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveClassificationImage(index)}
                    className="absolute top-1 right-1 p-1 bg-white bg-opacity-70 rounded-full"
                  >
                    <FaTimes className="w-4 h-4 text-gray-700" />
                  </button>
                  {classificationResults[index] && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      {classificationResults[index].name} 
                      ({(classificationResults[index].confidence * 100).toFixed(2)}%)
                    </div>
                  )}
                </div>
              ))}

              <ImageUploadButton 
                multiple 
                onChange={handleClassificationImageSelect}
              >
                <div className="flex flex-col items-center justify-center aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
                  <FaPlus className="w-12 h-12 text-gray-400" />
                  <span className="mt-2 text-gray-500 text-sm text-center">
                    이미지 추가
                  </span>
                </div>
              </ImageUploadButton>
            </div>
          )}

          <button
            onClick={handleClassifyImages}
            disabled={classificationImages.length === 0 || isLoading}
            className="w-full py-2 px-4 bg-[#4763E4] text-white rounded-lg hover:bg-[#3951d3] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>분류중...</span>
            ) : (
              <>
                <FaCloudUploadAlt className="w-5 h-5" />
                <span>분류하기</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShelterPhotoUpload;