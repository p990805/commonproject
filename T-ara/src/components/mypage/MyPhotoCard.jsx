import React, { useState } from 'react';
import { FaTrash, FaDownload, FaMagic, FaImage } from "react-icons/fa";
import MyPhotoCardImageUpload from './MyPhotoCardImageUpload';  // 이미지 업로드 컴포넌트 import

const MyPhotoCard = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);

  // 샘플 카드 데이터
  const cards = [
    { id: 1, date: '2025-01-25', title: '별이와 박주찬의 포토카드' },
    { id: 2, date: '2025-01-25', title: '별이와 박주찬의 포토카드' },
    { id: 3, date: '2025-01-25', title: '별이와 박주찬의 포토카드' },
    { id: 4, date: '2025-01-25', title: '별이와 박주찬의 포토카드' },
    { id: 5, date: '2025-01-25', title: '별이와 박주찬의 포토카드' }
  ];

  // 공통으로 사용되는 버튼 스타일
  const buttonBaseStyle = "flex items-center gap-2 border border-red-500 rounded-md hover:bg-red-50";

  // 액션 버튼 컴포넌트
  const ActionButton = ({ icon: Icon, text }) => (
    <button className={`${buttonBaseStyle} px-3 py-1.5 text-sm`}>
      <Icon size={12} className="text-red-500" />
      <span className="text-gray-700">{text}</span>
    </button>
  );

  // 이미지 업로드 컴포넌트가 표시되면 메인 화면 대신 보여줌
  if (showImageUpload) {
    return <MyPhotoCardImageUpload onClose={() => setShowImageUpload(false)} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">포토카드</h1>
        <button 
          className={`${buttonBaseStyle} px-4 py-2`}
          onClick={() => setShowImageUpload(true)}  // 클릭 핸들러 수정
        >
          <FaImage className="text-red-500" size={16} />
          <span className="text-sm text-gray-700">포토카드 만들기</span>
        </button>
      </div>

      {/* 카드 그리드 섹션 */}
      <div className="border-t border-black pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cards.map(card => (
            <div key={card.id} className="relative">
              {/* 카드 이미지 컨테이너 */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-gray-100">
                <img 
                  src="/assets/corgi.png"
                  alt="포토카드 이미지" 
                  className="w-full h-full rounded-[18px] object-cover"
                />
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  <FaTrash size={14} />
                </button>
              </div>
              
              {/* 카드 정보 및 액션 버튼 */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{card.date}</span>
                </div>
                <h3 className="font-bold text-sm">{card.title}</h3>
                <div className="flex gap-2">
                  <ActionButton icon={FaDownload} text="다운로드" />
                  <ActionButton icon={FaMagic} text="수정" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-1 mt-8">
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50">«</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50">‹</button>
        <button className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-lg">1</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50">›</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50">»</button>
      </div>
    </div>
  );
};

export default MyPhotoCard;