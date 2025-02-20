import React, { useState, useRef, useEffect } from 'react';
import { FaUpload, FaArrowLeft, FaArrowRight, FaPaw } from "react-icons/fa";
import axios from 'axios';
import api from '../../api';
import MyPhotoCardEditor from './MyPhotoCardEditor'; 

const MyPhotoCardImageUpload = ({ onClose }) => {
  const [personImage, setPersonImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ status: '', percent: 0 });
  const sessionIdRef = useRef(null);
  const [showEditor, setShowEditor] = useState(false);
  

  const API_URL = 'https://tara-photo-server.onrender.com'; 
  // 또는 실제 서버 주소로 변경
  // const API_URL = 'http://localhost:5050';

  const photoApi = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // 후원 동물 상태
  const [donationAnimals, setDonationAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalCarouselPage, setAnimalCarouselPage] = useState(0);
  
  // 동물 사진 상태
  const [isAnimalPhotoModalOpen, setIsAnimalPhotoModalOpen] = useState(false);
  const [animalPhotos, setAnimalPhotos] = useState([]);
  const [selectedAnimalPhoto, setSelectedAnimalPhoto] = useState(null);

  useEffect(() => {
    // 후원 동물 목록 불러오기
    const fetchDonationAnimals = async () => {
      try {
        const response = await api.get('http://localhost:8090/animal/donation-animal');
        
        // 응답 구조에 따라 동물 목록 설정
        const animalList = response.data?.animalList || response.data || [];
        setDonationAnimals(animalList);
      } catch (err) {
        console.error('후원 동물 목록 불러오기 실패:', err);
        setError('후원 동물 목록을 불러오는 데 실패했습니다.');
      }
    };

    fetchDonationAnimals();
    
    // 세션 ID 생성
    sessionIdRef.current = Math.random().toString(36).substring(7);
  }, []);

  // 동물 사진 불러오기
  const fetchAnimalPhotos = async (animalId) => {
    try {
      const response = await api.get(`http://localhost:8090/animal/donation-animal/${animalId}`);
      
      // 응답 구조에 따라 사진 목록 설정
      const photosData = response.data?.animalPhoto?.animalPhoto || 
        response.data?.animalPhoto?.photo || 
        response.data?.animalPhoto || 
        [];

      // 안전한 배열 변환 및 필터링
      const photos = Array.isArray(photosData) 
        ? photosData.filter(photoUrl => {
            if (typeof photoUrl !== 'string') {
              console.warn('유효하지 않은 사진 URL:', photoUrl);
              return false;
            }
            const ext = photoUrl.toLowerCase().split('.').pop();
            return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
          })
        : typeof photosData === 'object'
          ? Object.values(photosData).filter(photoUrl => 
              typeof photoUrl === 'string' && 
              ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(photoUrl.toLowerCase().split('.').pop())
            )
          : [];
      
      console.log('추출된 사진들:', photos);
      
      setAnimalPhotos(photos);
      setIsAnimalPhotoModalOpen(true);
    } catch (err) {
      console.error('동물 사진 불러오기 실패:', err);
      console.error('응답 데이터:', err.response?.data);
      setError('동물 사진을 불러오는 데 실패했습니다.');
      setAnimalPhotos([]);
    }
  };

  // 동물 선택 핸들러
  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal);
    fetchAnimalPhotos(animal.animalId);
  };

  // 동물 사진 선택 핸들러
  const handleAnimalPhotoSelect = (photoUrl) => {
    setSelectedAnimalPhoto(photoUrl);
    setIsAnimalPhotoModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPersonImage(file);
  };

  const convertBlobToBase64 = async (urlOrBlob) => {
    return new Promise(async (resolve, reject) => {
      try {
        // URL 문자열인 경우
        if (typeof urlOrBlob === 'string') {
          // S3 URL 직접 처리 시도
          try {
            console.log('이미지 URL 로딩 시도:', urlOrBlob);
            const response = await fetch(urlOrBlob, {
              mode: 'cors',  // CORS 모드 명시
              cache: 'no-cache'
            });
            
            if (response.ok) {
              const blob = await response.blob();
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
              };
              reader.onerror = error => {
                console.error('FileReader 오류 (직접 로드):', error);
                tryProxyFallback();
              };
            } else {
              console.warn('직접 이미지 로드 실패, 프록시 시도:', response.status);
              tryProxyFallback();
            }
          } catch (error) {
            console.warn('직접 이미지 로드 중 오류, 프록시 시도:', error);
            tryProxyFallback();
          }
          
          // 프록시 통한 로드 시도 (폴백)
          async function tryProxyFallback() {
            try {
              const proxyUrl = `${API_URL}/proxy-image?url=${encodeURIComponent(urlOrBlob)}`;
              console.log('프록시 URL 시도:', proxyUrl);
              
              const proxyResponse = await fetch(proxyUrl);
              if (!proxyResponse.ok) {
                throw new Error(`프록시 응답 오류: ${proxyResponse.status}`);
              }
              
              const blob = await proxyResponse.blob();
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
              };
              reader.onerror = error => {
                console.error('FileReader 오류 (프록시):', error);
                reject(error);
              };
            } catch (error) {
              console.error('프록시 이미지 로드 실패:', error);
              reject(error);
            }
          }
        } else {
          // Blob 객체인 경우
          const reader = new FileReader();
          reader.readAsDataURL(urlOrBlob);
          reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
          };
          reader.onerror = error => {
            console.error('Blob 읽기 오류:', error);
            reject(error);
          };
        }
      } catch (error) {
        console.error('이미지 변환 중 오류:', error);
        reject(error);
      }
    });
  };

  const handleSubmit = async () => {
    if (!personImage || !selectedAnimalPhoto) {
      setError('사람 이미지와 동물 이미지가 모두 필요합니다.');
      return;
    }
  
    setLoading(true);
    setError(null);
    setProgress({ status: '시작하는 중...', percent: 0 });
  
    try {
      // 이미지를 Base64로 변환 - personImage는 File 객체
      let personBase64;
      if (personImage instanceof File) {
        // convertToBase64 함수 사용
        personBase64 = await convertToBase64(personImage);
      } else {
        throw new Error('사람 이미지가 유효하지 않습니다');
      }
      
      // 동물 이미지 Base64 변환
      let petBase64;
      if (selectedAnimalPhoto instanceof File) {
        // convertToBase64 함수 사용
        petBase64 = await convertToBase64(selectedAnimalPhoto);
      } else if (typeof selectedAnimalPhoto === 'string') {
        // convertBlobToBase64 함수 사용
        petBase64 = await convertBlobToBase64(selectedAnimalPhoto);
      } else {
        throw new Error('유효하지 않은 동물 이미지 형식입니다');
      }
  
      // API 호출
      const predictionResponse = await photoApi.post('/predictions', {
        input: {
          person_image: personBase64,
          pet_image: petBase64
        },
        scene_type: "park" // 또는 "sofa" 등 사용자가 선택할 수 있도록 추가 가능
      });
  
      if (!predictionResponse.data || !predictionResponse.data.id) {
        throw new Error('서버 응답이 올바르지 않습니다');
      }
  
      // 결과 폴링 시작
      const pollPrediction = async (predictionId) => {
        try {
          const response = await photoApi.get(`/predictions/${predictionId}`);
          const prediction = response.data;
      
          const statusMap = {
            'starting': { status: '시작하는 중...', percent: 10 },
            'processing': { status: '이미지 처리중...', percent: 50 },
            'detecting_person': { status: '사람 찾는 중...', percent: 20 },
            'detecting_pet': { status: '동물 찾는 중...', percent: 30 },
            'masking_person': { status: '사람 마스킹 중...', percent: 40 },
            'masking_pet': { status: '동물 마스킹 중...', percent: 50 },
            'preparing_composition': { status: '합성 준비 중...', percent: 60 },
            'generating_background': { status: '배경 생성 중...', percent: 80 },
            'succeeded': { status: '완료!', percent: 100 },
            'failed': { status: '실패', percent: 0 }
          };
      
          // 더 상세한 상태 정보가 있으면 사용
          const currentStatus = prediction.status;
          const currentProgress = statusMap[currentStatus] || 
                                (prediction.progress ? { status: prediction.status, percent: prediction.progress } : 
                                                     { status: '처리중...', percent: 30 });
          
          setProgress(currentProgress);
      
          if (currentStatus === 'succeeded') {
            setResult(prediction.output[0]);
            setLoading(false);
            setShowEditor(true);
          } else if (currentStatus === 'failed') {
            throw new Error(prediction.error || '이미지 생성에 실패했습니다');
          } else {
            // 폴링 간격 최적화 (초기에는 짧게, 나중에는 길게)
            const delayMs = currentProgress.percent > 70 ? 2000 : 1000;
            setTimeout(() => pollPrediction(predictionId), delayMs);
          }
        } catch (error) {
          console.error('결과 조회 오류:', error);
          setError(error?.response?.data?.detail || error?.message || '서버 연결 중 오류가 발생했습니다');
          setLoading(false);
        }
      };
  
      // 폴링 시작
      pollPrediction(predictionResponse.data.id);
    } catch (error) {
      console.error('합성 요청 오류:', error);
      setError(error?.response?.data?.detail || error?.message || '서버 연결 중 오류가 발생했습니다');
      setLoading(false);
      setProgress({ status: '', percent: 0 });
    }
  };

  // File 객체를 Base64로 변환하는 함수 - handleImageUpload 함수 아래에 추가
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 전체 데이터 URI가 아닌 순수 base64 문자열만 반환
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => {
        console.error('파일 읽기 오류:', error);
        reject(error);
      };
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

      {/* 후원 동물 선택 섹션 (이미지 업로드 위) */}
      <div className="relative mb-6 px-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">내가 후원하는 동물 선택</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {donationAnimals.map((animal) => (
            <div 
              key={animal.animalId}
              onClick={() => handleAnimalSelect(animal)}
              className={`
                flex flex-col items-center cursor-pointer
                ${selectedAnimal?.animalId === animal.animalId 
                  ? 'opacity-100' 
                  : 'opacity-50 hover:opacity-75'}
              `}
            >
              <div 
                className={`
                  w-20 h-20 rounded-full border-2 flex items-center justify-center
                  ${selectedAnimal?.animalId === animal.animalId 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 bg-gray-100'}
                `}
              >
                <FaPaw className="text-2xl text-gray-600" />
              </div>
              <span className="mt-2 text-sm text-center">{animal.animalName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 사람 이미지 업로드 섹션 */}
        <div className="space-y-4 relative">
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
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 동물 이미지 섹션 */}
        <div className="space-y-4 relative">
          <h2 className="text-xl font-semibold text-gray-700">동물 이미지</h2>
          <div className="flex items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            {selectedAnimalPhoto ? (
              <img
                src={selectedAnimalPhoto}
                alt="Selected animal"
                className="max-h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center p-6">
                <p className="text-gray-600">동물을 선택해주세요</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={!personImage || !selectedAnimal || !selectedAnimalPhoto || loading}
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

      {/* 동물 사진 선택 모달 */}
      {isAnimalPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[20px]"></div>
          <div className="relative w-2/3 h-2/3 bg-white/90 rounded-[30px] shadow-2xl p-10">
            <div className="h-full flex flex-col">
              {/* 모달 헤더 */}
              <div className="relative border-b border-gray-300 pb-3 mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedAnimal?.animalName} 사진 선택
                </h2>
                <p className="text-lg text-gray-600 mt-1">
                  총 {animalPhotos.length}장
                </p>
                <button
                  onClick={() => setIsAnimalPhotoModalOpen(false)}
                  className="absolute right-0 top-0 text-2xl text-gray-500 hover:text-black transition-all"
                >
                  ✕
                </button>
              </div>

              {/* 이미지 그리드 */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-3 gap-4 justify-center">
                  {animalPhotos.map((photoUrl, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleAnimalPhotoSelect(photoUrl);
                      }}
                      className="w-full aspect-square rounded-lg overflow-hidden cursor-pointer shadow-lg transition-all hover:scale-105"
                    >
                      <img
                        src={photoUrl}
                        alt={`동물 사진 ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.png';
                          e.target.alt = '이미지를 불러올 수 없습니다';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPhotoCardImageUpload;