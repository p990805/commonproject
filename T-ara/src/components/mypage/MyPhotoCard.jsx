import React, { useState, useEffect } from 'react';
import { FaTrash, FaDownload, FaImage } from "react-icons/fa";
import MyPhotoCardImageUpload from './MyPhotoCardImageUpload';
import api from "../../api";

const MyPhotoCard = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotoCards = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/photocard/list');
        const photoCards = response.data?.photoCardList || [];
        
        // 데이터 구조 변환
        const formattedCards = photoCards.map(card => ({
          id: card.photoCardId,
          photocardPath: card.photoCardPath,
          date: formatDate(card.registeredAt),
          title: `포토카드 #${card.photoCardId}`
        }));
        
        setCards(formattedCards);
      } catch (error) {
        console.error("포토카드 조회 오류:", error);
        setError("포토카드를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotoCards();
  }, []);

  // 날짜 형식 변환 (2025-02-18 01:37:43 → 2025-02-18)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split(' ')[0];
  };

  const deletePhotoCard = async (photoCardId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
    try {
      await api.delete(`/photocard/delete/${photoCardId}`);
      setCards(cards.filter(card => card.id !== photoCardId));
    } catch (error) {
      console.error("포토카드 삭제 오류:", error);
      alert("포토카드 삭제 중 오류가 발생했습니다.");
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
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : cards.length === 0 ? (
          <div className="text-center py-10 text-gray-500">등록된 포토카드가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {cards.map(card => (
              <div key={card.id} className="relative">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-gray-100">
                  <img 
                    src={card.photocardPath || '/assets/photo-placeholder.png'} 
                    alt="포토카드 이미지" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/photo-placeholder.png';
                    }}
                  />
                  <button onClick={() => deletePhotoCard(card.id)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 bg-white/80 p-1 rounded-full">
                    <FaTrash size={14} />
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  <span className="text-sm text-gray-500">{card.date}</span>
                  <h3 className="font-bold text-sm">{card.title}</h3>
                  <div className="flex gap-2">
                    <button 
                      className="flex items-center gap-2 border border-red-500 rounded-md px-3 py-1.5 text-sm hover:bg-red-50"
                      onClick={() => {
                        // 다운로드 링크 생성
                        const link = document.createElement('a');
                        link.href = card.photocardPath;
                        link.download = `포토카드_${card.id}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <FaDownload size={12} className="text-red-500" />
                      <span className="text-gray-700">다운로드</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
