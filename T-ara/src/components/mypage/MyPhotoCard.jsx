import React, { useState, useEffect } from 'react';
import { FaTrash, FaDownload, FaImage } from "react-icons/fa";
import MyPhotoCardImageUpload from './MyPhotoCardImageUpload';
import api from "../../api";

const MyPhotoCard = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [cards, setCards] = useState([
    { id: 0, date: '2025-01-25', title: '샘플 포토카드', photocardPath: '/assets/corgi.png' }
  ]);

  // useEffect(() => {
  //   const fetchPhotoCards = async () => {
  //     try {
  //       const response = await api.get(`/photocard/list?animalId=${animalId}&pageNum=1&size=10`);
  //       const photoCards = response.data?.data || [];
  //       if (photoCards.length > 0) {
  //         setCards(photoCards);
  //       }
  //     } catch (error) {
  //       console.error("포토카드 조회 오류:", error);
  //     }
  //   };

  //   fetchPhotoCards();
  // }, [animalId]);

  const deletePhotoCard = async (photoCardId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
    try {
      await api.delete(`/photocard/delete/${photoCardId}`);
      setCards(cards.filter(card => card.id !== photoCardId));
    } catch (error) {
      console.error("포토카드 삭제 오류:", error);
    }
  };

  if (showImageUpload) {
    return <MyPhotoCardImageUpload onClose={() => setShowImageUpload(false)} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">포토카드</h1>
        <button className="flex items-center gap-2 border border-red-500 rounded-md px-4 py-2 hover:bg-red-50" onClick={() => setShowImageUpload(true)}>
          <FaImage className="text-red-500" size={16} />
          <span className="text-sm text-gray-700">포토카드 만들기</span>
        </button>
      </div>

      <div className="border-t border-black pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cards.map(card => (
            <div key={card.id} className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-gray-100">
                <img src={card.photocardPath} alt="포토카드 이미지" className="w-full h-full object-cover" />
                <button onClick={() => deletePhotoCard(card.id)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  <FaTrash size={14} />
                </button>
              </div>
              <div className="mt-2 space-y-1">
                <span className="text-sm text-gray-500">{card.date}</span>
                <h3 className="font-bold text-sm">{card.title}</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 border border-red-500 rounded-md px-3 py-1.5 text-sm hover:bg-red-50">
                    <FaDownload size={12} className="text-red-500" />
                    <span className="text-gray-700">다운로드</span>
                  </button>
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
