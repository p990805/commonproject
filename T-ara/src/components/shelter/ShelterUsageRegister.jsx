import SidebarNavigation from "./SidebarNavigation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ShelterUsageRegister = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 파일 형식 체크
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert("JPG, JPEG, PNG 형식의 파일만 업로드 가능합니다.");
      return;
    }

    // 이미지 미리보기 설정
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      setIsLoading(true);
      // CLOVA OCR API 호출 (백엔드 구현 필요)
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/receipt-ocr`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('OCR 처리 중 오류가 발생했습니다.');
      }

      const data = await response.json();
      setOcrResult(data);
    } catch (error) {
      console.error('OCR 처리 중 오류 발생:', error);
      alert('영수증 분석 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // OCR 결과 렌더링 함수
  const renderOcrResult = () => {
    if (!ocrResult) return null;

    return (
      <div className="mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">영수증 분석 결과</h3>
        <div className="space-y-4">
          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm">
              <span className="font-medium">상호명:</span>
              <span className="ml-2">{ocrResult.storeInfo?.name || '-'}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">사업자등록번호:</span>
              <span className="ml-2">{ocrResult.storeInfo?.bizNum || '-'}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">날짜:</span>
              <span className="ml-2">{ocrResult.paymentInfo?.date || '-'}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">시간:</span>
              <span className="ml-2">{ocrResult.paymentInfo?.time || '-'}</span>
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">결제 정보</h4>
            <div className="space-y-2">
              <div className="text-sm flex justify-between">
                <span>결제 금액</span>
                <span className="font-medium">
                  {ocrResult.paymentInfo?.totalAmount?.toLocaleString() || '-'}원
                </span>
              </div>
              <div className="text-sm flex justify-between">
                <span>결제 수단</span>
                <span>{ocrResult.paymentInfo?.method || '-'}</span>
              </div>
            </div>
          </div>

          {/* 구매 항목 */}
          {ocrResult.items && ocrResult.items.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">구매 항목</h4>
              <div className="space-y-1">
                {ocrResult.items.map((item, index) => (
                  <div key={index} className="text-sm flex justify-between">
                    <span className="flex-1">{item.name}</span>
                    <span className="flex-1 text-center">{item.quantity}개</span>
                    <span className="flex-1 text-right">
                      {item.price.toLocaleString()}원
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[#191919] text-[22.50px] font-bold font-['Roboto'] leading-relaxed">
              후원금 사용 등록
            </h1>
          </div>

          <div className="bg-white rounded shadow-[3px_3px_10px_0px_rgba(151,152,159,0.15)] p-7">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="mb-6">
                  <label className="text-sm mb-2 block">영수증 사진</label>
                  <div className="flex items-start gap-4">
                    <div className="w-40 h-40 border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="영수증 미리보기"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-gray-400 mb-2">No Image</div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-2">
                        <div>권장 사이즈 : 최소 200 X 200 이상</div>
                        <div>파일형식 : JPG, JPEG, PNG</div>
                        <div>최대 용량 : 5MB 이하</div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="main-image"
                        onChange={handleImageUpload}
                      />
                      <label
                        htmlFor="main-image"
                        className="px-4 py-2 bg-gray-200 text-sm rounded cursor-pointer inline-block hover:bg-gray-300"
                      >
                        사진등록
                      </label>
                    </div>
                  </div>
                </div>

                {/* 로딩 상태 표시 */}
                {isLoading && (
                  <div className="mt-4 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">영수증을 분석중입니다...</p>
                  </div>
                )}

                {/* OCR 결과 표시 */}
                {!isLoading && renderOcrResult()}

                <div className="flex justify-center gap-4 mt-8">
                  <button 
                    className="w-40 h-12 bg-[#4763E4] text-white rounded hover:bg-[#3951d3]"
                    disabled={!ocrResult || isLoading}
                  >
                    등록 완료
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterUsageRegister;