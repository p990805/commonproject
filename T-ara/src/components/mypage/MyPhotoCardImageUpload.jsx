import React, { useState, useRef, useEffect } from 'react';
import { FaUpload, FaSave, FaArrowLeft } from "react-icons/fa";
import MyPhotoCardEditor from './MyPhotoCardEditor'

const API_BASE_URL = 'https://asefasdfcv-tara-photocard-server.hf.space';

const MyPhotoCardImageUpload = ({ onClose }) => {
  const [personImage, setPersonImage] = useState(null);
  const [petImage, setPetImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ status: '', percent: 0 });
  const eventSourceRef = useRef(null);
  const sessionIdRef = useRef(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 세션 ID 생성
    sessionIdRef.current = Math.random().toString(36).substring(7);

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'person') {
      setPersonImage(file);
    } else {
      setPetImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!personImage || !petImage) return;

    const formData = new FormData();
    formData.append('person_image', personImage);
    formData.append('pet_image', petImage);

    setLoading(true);
    setError(null);
    setProgress({ status: '시작하는 중...', percent: 0 });

    // 기존 EventSource 연결 종료
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // 진행률 모니터링을 위한 EventSource 연결
    eventSourceRef.current = new EventSource(`${API_BASE_URL}/progress/${sessionIdRef.current}`);
    
    eventSourceRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Progress:', data);
        setProgress({
          status: data.status,
          percent: data.percent
        });
      } catch (error) {
        console.error('Progress parsing error:', error);
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('EventSource error:', error);
      eventSourceRef.current.close();
    };

    try {
      const response = await fetch(`${API_BASE_URL}/compose/${sessionIdRef.current}`, {
        method: 'POST',
        body: formData,
        credentials: 'omit',  // credentials 설정 변경
        mode: 'cors',        // mode 명시적 설정
        headers: {
          'Accept': 'image/jpeg, application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error('Received empty response');
      }
      
      console.log('Response blob:', blob); // 디버깅용
      const imageUrl = URL.createObjectURL(blob);
      setResult(imageUrl);
      setShowEditor(true); 
      
    } catch (error) {
      console.error('Error details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    }
  };

  const handleSave = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = 'composed-image.jpg';
      link.click();
    }
  };

  return (
    <>
      {!showEditor ? (
        <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
          {/* 헤더 섹션 */}
          <div className="flex items-center mb-6">
            <button
              onClick={onClose}
              className="mr-2 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold">포토카드 만들기</h1>
          </div>

          {/* 진행률 표시 */}
          {loading && progress.status && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{progress.status}</span>
                <span className="text-sm font-medium text-gray-700">{progress.percent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-red-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percent}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* 메인 콘텐츠 */}
          <div className="border-t border-black pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 사람 이미지 업로드 */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">사람 이미지</h2>
                <div className="relative group">
                  <div className="flex items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    {personImage ? (
                      <img
                        src={URL.createObjectURL(personImage)}
                        alt="Selected person"
                        className="max-h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <FaUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600">클릭하여 이미지를 업로드하세요</p>
                        <p className="text-sm text-gray-500 mt-2">또는 파일을 여기로 드래그하세요</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'person')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* 동물 이미지 업로드 */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">동물 이미지</h2>
                <div className="relative group">
                  <div className="flex items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    {petImage ? (
                      <img
                        src={URL.createObjectURL(petImage)}
                        alt="Selected pet"
                        className="max-h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <FaUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600">클릭하여 이미지를 업로드하세요</p>
                        <p className="text-sm text-gray-500 mt-2">또는 파일을 여기로 드래그하세요</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'pet')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="mt-8 space-y-4">
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={!personImage || !petImage || loading}
                  className="px-6 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 disabled:bg-gray-400"
                >
                  {loading ? '처리중...' : '합성하기'}
                </button>
                {result && (
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <FaSave className="w-5 h-5" />
                    저장하기
                  </button>
                )}
              </div>

              {/* 결과 이미지 */}
              {result && (
                <div className="relative bg-gray-50 rounded-lg overflow-hidden p-4">
                  <img
                    src={result}
                    alt="Composed result"
                    className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <MyPhotoCardEditor 
          composedImage={result} 
          onBack={() => setShowEditor(false)}
        />
      )}
    </>
  );
};

export default MyPhotoCardImageUpload;