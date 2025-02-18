import React, { useState } from 'react';
import { FaCloudUploadAlt, FaImage, FaTimes, FaPlus } from 'react-icons/fa';
import SidebarNavigation from "./SidebarNavigation";
import ClassificationResults from './ClassificationResults';

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
  const [currentView, setCurrentView] = useState('upload');
  const [classificationImages, setClassificationImages] = useState([]);
  const [classificationResults, setClassificationResults] = useState({ classified: {}, unclassified: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleClassificationImageSelect = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      filename: file.name
    }));
    setClassificationImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveClassificationImage = (index) => {
    setClassificationImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleClassifyImages = async () => {
    if (classificationImages.length === 0) return;
  
    setIsLoading(true);
    
    try {
      const results = await Promise.all(
        classificationImages.map(async (image) => {
          const formData = new FormData();
          formData.append('file', image.file);
  
          const response = await fetch('https://asefasdfcv-tara-animal-ai.hf.space/predict', {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const result = await response.json();
          return { ...result, originalImage: image };
        })
      );
  
      const processedResults = {};
      const unclassifiedImages = [];
  
      results.forEach(({ classified, unclassified, originalImage }) => {
        if (classified && Object.keys(classified).length > 0) {
          Object.entries(classified).forEach(([breedName, images]) => {
            if (!processedResults[breedName]) {
              processedResults[breedName] = [];
            }
            images.forEach(image => {
              processedResults[breedName].push({
                ...image,
                preview: originalImage.preview,
                file: originalImage.file
              });
            });
          });
        }
  
        if (unclassified && unclassified.length > 0) {
          unclassifiedImages.push({
            preview: originalImage.preview,
            file: originalImage.file,
            filename: originalImage.filename
          });
        }
      });

      setClassificationResults({
        classified: processedResults,
        unclassified: unclassifiedImages
      });
      setCurrentView('results');
      
    } catch (error) {
      console.error('이미지 분류 오류:', error);
      alert('이미지 분류 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveComplete = () => {
    setClassificationImages([]);
    setClassificationResults({ classified: {}, unclassified: [] });
    setCurrentView('upload');
  };

  const renderImageUploader = () => (
    <ImageUploadButton multiple onChange={handleClassificationImageSelect}>
      <div className="flex flex-col items-center justify-center h-[300px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
        <FaImage className="w-24 h-24 text-gray-400" />
        <span className="mt-4 text-gray-500 text-lg text-center">
          분류할 이미지를 선택하세요
        </span>
      </div>
    </ImageUploadButton>
  );

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />
      
      <div className="flex-1 p-8">
        <h1 className="text-[22.50px] font-bold text-[#191919] leading-relaxed mb-6">
          {currentView === 'upload' ? '유기동물 사진 업로드' : '사진 분류 결과'}
        </h1>

        {currentView === 'upload' ? (
          <div className="bg-white rounded-lg shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-6">
            {classificationImages.length === 0 ? (
              renderImageUploader()
            ) : (
              <>
                <div className="mb-6">
                  <div className="grid grid-cols-5 gap-4">
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
                      </div>
                    ))}
                    <ImageUploadButton multiple onChange={handleClassificationImageSelect}>
                      <div className="flex flex-col items-center justify-center aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
                        <FaPlus className="w-12 h-12 text-gray-400" />
                        <span className="mt-2 text-gray-500 text-sm text-center">
                          이미지 추가
                        </span>
                      </div>
                    </ImageUploadButton>
                  </div>
                </div>

                <button
                  onClick={handleClassifyImages}
                  disabled={isLoading}
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
              </>
            )}
          </div>
        ) : (
          <ClassificationResults
            classificationResults={classificationResults}
            onSaveComplete={handleSaveComplete}
            onBackToUpload={() => setCurrentView('upload')}
          />
        )}
      </div>
    </div>
  );
};

export default ShelterPhotoUpload;