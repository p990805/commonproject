import SidebarNavigation from "./SidebarNavigation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import api from "../../api";

const ShelterUsageRegister = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // 사용분야 옵션
  const usageFieldOptions = [
    "동물",
    "보호소"
  ];

  const formatDateString = (dateStr) => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const year = parts[0].length === 2 ? '20' + parts[0] : parts[0];
      const month = parts[1].padStart(2, '0');
      const day = parts[2].padStart(2, '0');
      return `${year}${month}${day}`;
    }
    return dateStr;
  };
  
  const convertDateToServerFormat = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.replace(/-/g, '');
  };

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
        `https://tara-receipt-server.fly.dev/ocr`,
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
      // OCR 결과를 폼 데이터로 변환하는 부분
      if (receipt) {
        // OCR에서 받은 날짜를 YYYYMMDD 형식으로 변환
        const ocrDate = receipt.paymentInfo?.date?.text || 
                      receipt.paymentInfo?.date?.formatted?.value || "";
        let formattedDate = ocrDate.replace(/[^0-9]/g, ''); // 숫자만 추출
        
        // 2자리 연도를 4자리로 변환 (예: 24 -> 2024)
        if (formattedDate.length === 6) { // YYMMDD 형식인 경우
          formattedDate = `20${formattedDate}`;
        }

        const items = receipt.subResults?.[0]?.items?.map(item => ({
          name: item.name?.text || item.name?.formatted?.value || "",
          count: (item.count?.text || item.count?.formatted?.value || "").replace(/[^0-9]/g, ''), // 숫자만 추출
          price: (item.price?.price?.text || item.price?.price?.formatted?.value || "").replace(/[^0-9]/g, ''), // 숫자만 추출
          category: "",
          isOCR: true
        })) || [];

        let totalAmount = (receipt.totalPrice?.price?.text || 
                        receipt.totalPrice?.price?.formatted?.value || "").replace(/[^0-9]/g, ''); // 숫자만 추출

        setFormData({
          storeName: receipt.storeInfo?.name?.text || receipt.storeInfo?.name?.formatted?.value || "",
          businessNumber: receipt.storeInfo?.bizNum?.text || receipt.storeInfo?.bizNum?.formatted?.value || "",
          date: formattedDate,
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
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: value
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
      items: [...prev.items, { name: "", count: "", price: "", category: "", usageField: "", isOCR: false }]
    }));
  };

  // 아이템 삭제 핸들러 (추가된 항목만 삭제 가능)
  const handleRemoveItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    // 데이터 검증 로직
    const isValid = formData.items.every(item => 
      item.name && item.count && item.price && item.category && item.usageField
    );
  
    if (!isValid) {
      alert("모든 항목의 정보를 완전히 입력해주세요.");
      return;
    }
 
    if (!formData.date) {
      alert("날짜를 선택해주세요.");
      return;
    }
  
    try {
      setIsSubmitting(true);
  
      // 제출용 데이터 포맷팅
      const submitData = {
        expenseDate: convertDateToServerFormat(formData.date),
        amount: parseInt(formData.totalAmount.replace(/[^0-9]/g, '')),
        content: formData.items.map(item => 
          `구매 품목: ${item.name} (${item.count}개)`
        ).join(', '),
        expenseItems: formData.items.map(item => ({
          name: item.name,
          quantity: parseInt(item.count.replace(/[^0-9]/g, '')),
          price: parseInt(item.price.replace(/[^0-9]/g, '')),
          category: item.category,
          usageField: item.usageField
        }))
      };

      return api.post("/shelter/receipt", submitData)
        .then(response => {
          console.log("전송 성공:", response);
          alert('영수증이 성공적으로 등록되었습니다.');
          navigate('/shelter/usage-list');
        })
        .catch(error => {
          console.error('영수증 제출 중 오류 발생:', error);
          alert(error.response?.data?.message || '영수증 제출 중 오류가 발생했습니다.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      console.error('데이터 준비 중 오류 발생:', error);
      alert('데이터 준비 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
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
              readOnly={ocrResult ? false : !!formData.storeName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">사업자등록번호</label>
            <input
              type="text"
              value={formData.businessNumber}
              onChange={(e) => handleInputChange(e, 'businessNumber')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly={ocrResult ? false : !!formData.storeName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">날짜</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange(e, 'date')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">시간</label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => handleInputChange(e, 'time')}
              className="w-full p-2 border rounded bg-gray-50"
              readOnly={ocrResult ? false : !!formData.storeName}
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
                readOnly={ocrResult ? false : !!formData.storeName}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">결제 수단</label>
              <input
                type="text"
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange(e, 'paymentMethod')}
                className="w-full p-2 border rounded bg-gray-50"
                readOnly={ocrResult ? false : !!formData.storeName}
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
          <div className="grid grid-cols-19 gap-3 mb-2 text-sm font-medium text-gray-600">
            <div className="col-span-7">구매 물품</div>
            <div className="col-span-2">구매 개수</div>
            <div className="col-span-3">구매 금액</div>
            <div className="col-span-4">카테고리</div>
            <div className="col-span-3">사용분야</div>
          </div>
          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-19 gap-3 items-start">
                <div className="col-span-7 relative">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="품목명"
                    className={`w-full p-2 border rounded ${item.isOCR ? 'bg-gray-50' : ''}`}
                    readOnly={item.isOCR}
                  />
                  {!item.isOCR && (
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="absolute right-2 top-2.5 text-gray-400 hover:text-red-500"
                    >
                      <FaTimes size={16} />
                    </button>
                  )}
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    value={item.count}
                    onChange={(e) => handleItemChange(index, 'count', e.target.value)}
                    placeholder="수량"
                    className={`w-full p-2 border rounded ${item.isOCR ? 'bg-gray-50' : ''}`}
                    readOnly={item.isOCR}
                  />
                </div>
                <div className="col-span-3 relative">
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    placeholder="가격"
                    className={`w-full p-2 border rounded ${item.isOCR ? 'bg-gray-50' : ''} pr-8`}
                    readOnly={item.isOCR}
                  />
                  <span className="absolute right-3 top-2.5 text-gray-500">원</span>
                </div>
                <div className="col-span-4">
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
                <div className="col-span-3">
                  <select
                    value={item.usageField}
                    onChange={(e) => handleItemChange(index, 'usageField', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">사용분야 선택</option>
                    {usageFieldOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
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

                {/* 등록 완료 버튼 */}
                {!isLoading && ocrResult && (
                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={handleSubmit}
                      className="w-40 h-12 bg-[#4763E4] text-white rounded hover:bg-[#3951d3]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '등록 중...' : '등록 완료'}
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterUsageRegister;