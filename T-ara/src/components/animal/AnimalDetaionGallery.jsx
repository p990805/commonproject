import React, { useState } from "react";

const AnimalDetailGallery = ({ animal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showLargeImage, setShowLargeImage] = useState(false);

  const imagesPerPage = 8;
  const totalPages = Math.ceil(
    (animal?.animalImages?.length || 0) / imagesPerPage
  );

  const getCurrentPageImages = () => {
    const start = currentPage * imagesPerPage;
    return animal?.animalImages?.slice(start, start + imagesPerPage) || [];
  };

  const handleMoreClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* 기존 갤러리 부분 */}
      <div className="w-full mb-4">
        <div className="border border-[#FF4427] rounded-md p-3 relative">
          <div className="flex items-center gap-1 justify-center">
            <span>🐾</span>
            <span className="text-[#FF4427] font-bold">
              {animal.animalName}
            </span>
            <span className="text-black font-bold">갤러리</span>
          </div>
          <button
            onClick={handleMoreClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
          >
            + 더보기
          </button>
        </div>
      </div>

      {/* 이미지 그리드 */}
      <div className="w-full">
        <div className="grid grid-cols-5 gap-4">
          {animal?.animalImages?.slice(0, 5).map((image, index) => (
            <div
              key={index}
              className="aspect-square cursor-pointer"
              onClick={() => {
                setSelectedImageIndex(index);
                setIsModalOpen(true);
              }}
            >
              <img
                src={image}
                alt={`동물 사진 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="w-full border-t border-gray-200 mt-4"></div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 배경 */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[20px]"></div>

          {/* 모달 박스 */}
          <div className="relative w-2/3 h-2/3 bg-white/90 rounded-[30px] shadow-2xl p-10">
            {!showLargeImage ? (
              <div className="h-full flex flex-col">
                {/* 헤더 */}
                <div className="relative border-b border-gray-300 pb-3 mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {animal.animalName} 갤러리
                  </h2>
                  <p className="text-lg text-gray-600 mt-1">
                    총 {animal?.animalImages?.length}장
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute right-0 top-0 text-2xl text-gray-500 hover:text-black transition-all"
                  >
                    ✕
                  </button>
                </div>

                {/* 이미지 그리드 */}
                <div className="flex-1 overflow-auto">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {getCurrentPageImages().map((image, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedImageIndex(
                            currentPage * imagesPerPage + index
                          );
                          setShowLargeImage(true);
                        }}
                        className="w-48 h-36 rounded-lg overflow-hidden cursor-pointer shadow-lg transition-all hover:scale-105"
                      >
                        <img
                          src={image}
                          alt={`갤러리 이미지 ${
                            currentPage * imagesPerPage + index + 1
                          }`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 네비게이션 버튼 */}
                <div className="flex justify-between mt-6">
                  {currentPage > 0 && (
                    <button
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className="text-3xl text-gray-500 hover:text-black bg-white/70 p-3 rounded-full shadow-md transition-all hover:bg-white"
                    >
                      ‹
                    </button>
                  )}
                  {currentPage < totalPages - 1 && (
                    <button
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className="text-3xl text-gray-500 hover:text-black bg-white/70 p-3 rounded-full shadow-md transition-all hover:bg-white"
                    >
                      ›
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* 큰 이미지 뷰 */
              <div className="relative h-full flex items-center justify-center p-8">
                <img
                  src={animal?.animalImages?.[selectedImageIndex]}
                  alt={`큰 이미지 ${selectedImageIndex + 1}`}
                  className="max-h-full w-auto object-contain rounded-lg shadow-lg"
                />

                {selectedImageIndex > 0 && (
                  <button
                    onClick={() => setSelectedImageIndex((prev) => prev - 1)}
                    className="absolute left-4 text-3xl text-gray-500 hover:text-black bg-white/70 p-3 rounded-full shadow-md transition-all hover:bg-white"
                  >
                    ‹
                  </button>
                )}
                {selectedImageIndex <
                  (animal?.animalImages?.length || 0) - 1 && (
                  <button
                    onClick={() => setSelectedImageIndex((prev) => prev + 1)}
                    className="absolute right-4 text-3xl text-gray-500 hover:text-black bg-white/70 p-3 rounded-full shadow-md transition-all hover:bg-white"
                  >
                    ›
                  </button>
                )}

                <button
                  onClick={() => setShowLargeImage(false)}
                  className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black bg-white/70 p-2 rounded-full shadow-md transition-all hover:bg-white"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalDetailGallery;
