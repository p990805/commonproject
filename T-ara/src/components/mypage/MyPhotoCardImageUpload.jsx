import React, { useState, useRef, useEffect } from 'react';
import { FaUpload, FaSave, FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import MyPhotoCardEditor from './MyPhotoCardEditor'; 

const MyPhotoCardImageUpload = ({ onClose }) => {
  const [personImage, setPersonImage] = useState(null);
  const [petImage, setPetImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ status: '', percent: 0 });
  const sessionIdRef = useRef(null);
  const [showEditor, setShowEditor] = useState(false);

  const API_URL = 'https://tara-photo-server.onrender.com'; 

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  useEffect(() => {
    // 컴포넌트 마운트 시 세션 ID 생성
    sessionIdRef.current = Math.random().toString(36).substring(7);
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

    setLoading(true);
    setError(null);
    setProgress({ status: '시작하는 중...', percent: 0 });

    try {
      // 이미지를 Base64로 변환
      const personBase64 = await convertToBase64(personImage);
      const petBase64 = await convertToBase64(petImage);

      // Replicate 형식의 API 호출을 위한 prediction 요청
      const predictionResponse = await api.post('/predictions', {
        input: {
          person_image: personBase64,
          pet_image: petBase64
        }
      });

      // 폴링 로직 추가
      const pollPrediction = async (predictionId) => {
        try {
          const response = await api.get(`/predictions/${predictionId}`);
          const prediction = response.data;
      
          const statusMap = {
            'starting': { status: '시작하는 중...', percent: 10 },
            'processing': { status: '이미지 처리중...', percent: 50 },
            'succeeded': { status: '완료!', percent: 100 },
            'failed': { status: '실패', percent: 0 }
          };
      
          if (prediction.status === 'succeeded') {
            setResult(prediction.output[0]);
            setLoading(false);
            setProgress(statusMap.succeeded);
            setShowEditor(true);
          } else if (prediction.status === 'failed') {
            throw new Error(prediction.error || '이미지 생성에 실패했습니다');
          } else {
            setProgress(statusMap[prediction.status] || { status: '처리중...', percent: 30 });
            setTimeout(() => pollPrediction(predictionId), 1000);
          }
        } catch (error) {
          console.error('Polling error:', error);
          setError(error.message || '서버 연결 중 오류가 발생했습니다');
          setLoading(false);
        }
      };

      // 초기 폴링 시작
      pollPrediction(predictionResponse.data.id);

    } catch (error) {
      console.error('Error details:', error);
      setError(error.response?.data?.detail || error.message || '서버 연결 중 오류가 발생했습니다');
      setLoading(false);
      setProgress({ status: '', percent: 0 });
    }
  };

  // Base64 변환 함수 (파일 → base64 문자열)
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // data:image/jpeg;base64, 부분 제거하고 순수 base64만 반환
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  if (showEditor && result) {
    return <MyPhotoCardEditor composedImage={result} />;
  }

  return (
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
      {(loading || progress.status) && (
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
  );
};

export default MyPhotoCardImageUpload;