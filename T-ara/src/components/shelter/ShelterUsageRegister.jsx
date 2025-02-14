import SidebarNavigation from "./SidebarNavigation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ShelterUsageRegister = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    businessNumber: "",
    date: "",
    time: "",
    totalAmount: "",
    paymentMethod: "",
    items: []
  });

  // 카테고리 옵션
  const categoryOptions = [
    "사료/간식",
    "의약품/의료용품",
    "위생용품",
    "장난감/의류",
    "설비/기자재",
    "기타"
  ];

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("JPG, JPEG, PNG 형식의 파일만 업로드 가능합니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ocr`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
          withCredentials: false,
        }
      );

      setOcrResult(response.data);
      
      // OCR 결과를 폼 데이터로 변환
      const receipt = response.data?.images?.[0]?.receipt?.result;
      if (receipt) {
        const items = receipt.subResults?.[0]?.items?.map(item => ({
          name: item.name?.text || item.name?.formatted?.value || "",
          count: item.count?.text || item.count?.formatted?.value || "",
          price: (item.price?.price?.text || item.price?.price?.formatted?.value || "").replace(/원$/, ""),
          category: "",
          isOCR: true // OCR로 인식된 항목 표시
        })) || [];

        let totalAmount = receipt.totalPrice?.price?.text || 
                         receipt.totalPrice?.price?.formatted?.value || "";
        // '원'이 없는 경우 추가
        if (!totalAmount.endsWith('원')) {
          totalAmount += '원';
        }

        setFormData({
          storeName: receipt.storeInfo?.name?.text || receipt.storeInfo?.name?.formatted?.value || "",
          businessNumber: receipt.storeInfo?.bizNum?.text || receipt.storeInfo?.bizNum?.formatted?.value || "",
          date: receipt.paymentInfo?.date?.text || receipt.paymentInfo?.date?.formatted?.value || "",
          time: receipt.paymentInfo?.time?.text || receipt.paymentInfo?.time?.formatted?.value || "",
          totalAmount: totalAmount,
          paymentMethod: receipt.paymentInfo?.cardInfo?.company?.text || 
                        receipt.paymentInfo?.cardInfo?.company?.formatted?.value || "",
          items: items
        });
      }
    } catch (error) {
      console.error("OCR 처리 중 오류 발생:", error);
      if (error.response) {
        alert(`영수증 분석 중 오류가 발생했습니다: ${error.response.data.message || '서버 오류'}`);
      } else if (error.request) {
        alert("서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.");
      } else {
        alert("영수증 분석 요청 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 데이터 업데이트 핸들러
  const handleInputChange = (e, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // 아이템 업데이트 핸들러
  const handleItemChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // 아이템 추가 핸들러
  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: "", count: "", price: "", category: "", isOCR: false }]
    }));
  };

  // 아이템 삭제 핸들러 (추가된 항목만 삭제 가능)
  const handleRemoveItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const renderForm = () => {
    return (
      <div className="mt-6 space-y-6">
        {/* 기본 정보 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">상호명</label>
            <input
              type="text"
              value={formData.storeName}
              onChange={(e) => handleInputChange(e, 'storeName')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">사업자등록번호</label>
            <input
              type="text"
              value={formData.businessNumber}
              onChange={(e) => handleInputChange(e, 'businessNumber')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">날짜</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => handleInputChange(e, 'date')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">시간</label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => handleInputChange(e, 'time')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly
            />
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-4">결제 정보</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">결제 금액</label>
              <input
                type="text"
                value={formData.totalAmount}
                onChange={(e) => handleInputChange(e, 'totalAmount')}
                className="w-full p-2 border rounded bg-gray-50"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">결제 수단</label>
              <input
                type="text"
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange(e, 'paymentMethod')}
                className="w-full p-2 border rounded bg-gray-50"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* 구매 항목 */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">구매 항목</h4>
            <button
              onClick={handleAddItem}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              항목 추가
            </button>
          </div>
          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="품목명"
                    className={`w-full p-2 border rounded ${item.isOCR ? 'bg-gray-50' : ''}`}
                    readOnly={item.isOCR}
                  />
                </div>
                <div className="w-24">
                  <input
                    type="text"
                    value={item.count}
                    onChange={(e) => handleItemChange(index, 'count', e.target.value)}
                    placeholder="수량"
                    className={`w-full p-2 border rounded ${item.isOCR ? 'bg-gray-50' : ''}`}
                    readOnly={item.isOCR}
                  />
                </div>
                <div className="w-32">
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    placeholder="가격"
                    className={`w-full p-2 border rounded ${item.isOCR ? 'bg-gray-50' : ''}`}
                    readOnly={item.isOCR}
                  />
                </div>
                <div className="w-40">
                  <select
                    value={item.category}
                    onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">카테고리 선택</option>
                    {categoryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                {!item.isOCR && (
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFF]">
      <SidebarNavigation />

      <div className="flex-1 p-8">
        <div className="mx-4">
          <div className="text-center mb-6">
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
                    <div className="max-w-md border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="영수증 미리보기"
                          className="max-w-full h-auto"
                        />
                      ) : (
                        <div className="text-center p-8">
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
                    <p className="mt-2 text-gray-600">
                      영수증을 분석중입니다...
                    </p>
                  </div>
                )}

                {/* 폼 렌더링 */}
                {!isLoading && ocrResult && renderForm()}

                <div className="flex justify-center gap-4 mt-8">
                  <button
                    className="w-40 h-12 bg-[#4763E4] text-white rounded hover:bg-[#3951d3]"
                    disabled={isLoading}
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