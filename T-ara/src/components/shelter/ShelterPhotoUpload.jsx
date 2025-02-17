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
  const [classifiedResults, setClassifiedResults] = useState({});
  const [unclassifiedImages, setUnclassifiedImages] = useState([]);
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
    setClassificationImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleClassifyImages = async () => {
    if (classificationImages.length === 0) return;

    setIsLoading(true);
    const formData = new FormData();
    classificationImages.forEach(image => {
      formData.append('files', image.file);
    });

    try {
      const response = await fetch('https://asefasdfcv-tara-animal-ai.hf.space', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      setClassifiedResults(result.classified);
      setUnclassifiedImages(result.unclassified);
    } catch (error) {
      console.error('이미지 분류 오류:', error);
    } finally {
      setIsLoading(false);
    }
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

  const renderClassifiedResults = () => (
    <div className="space-y-6">
      {/* 분류된 이미지들 */}
      {Object.entries(classifiedResults).map(([className, images]) => (
        images.length > 0 && (
          <div key={className} className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-[#4763E4]">
              {className} ({images.length}장)
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(
                      classificationImages.find(img => img.filename === image.filename)?.file
                    )}
                    alt={`${className} ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    신뢰도: {(image.confidence * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {/* 미분류 이미지들 */}
      {unclassifiedImages.length > 0 && (
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-500">
            미분류 ({unclassifiedImages.length}장)
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {unclassifiedImages.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={URL.createObjectURL(
                    classificationImages.find(img => img.filename === image.filename)?.file
                  )}
                  alt={`Unclassified ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  미분류
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />
      
      <div className="flex-1 p-8">
        <h1 className="text-[22.50px] font-bold text-[#191919] leading-relaxed mb-6">
          유기동물 사진 업로드
        </h1>

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
                className="w-full py-2 px-4 bg-[#4763E4] text-white rounded-lg hover:bg-[#3951d3] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
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

              {Object.keys(classifiedResults).length > 0 && renderClassifiedResults()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterPhotoUpload;