// src/components/community/Inquiry.jsx
import { useState, useEffect } from "react";
import api from "../../api";
import AddInquiry from "./AddInquiry";
import InquiryHeader from "./inquiry/InquiryHeader";
import InquiryList from "./inquiry/InquiryList";

const Inquiry = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddInquiry, setShowAddInquiry] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 컴포넌트 마운트 시 문의 목록 불러오기
  useEffect(() => {
    fetchInquiryList();
  }, []);

  // 문의 목록 API 호출 (타임스탬프 추가로 캐시 우회)
  const fetchInquiryList = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(
        `/inquiry/list?timestamp=${new Date().getTime()}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        // inquiryId를 숫자로 변환하여 오름차순 정렬 (숫자가 작은 항목이 위로)
        const sortedList = response.data.inquiryList.sort(
          (a, b) => Number(a.inquiryId) - Number(b.inquiryId)
        );
        setInquiries(sortedList);
      } else {
        setError("문의 내역을 불러오지 못했습니다.");
      }
    } catch (err) {
      console.error("문의 목록 호출 중 에러:", err);
      setError("문의 내역을 불러오는 중 에러가 발생했습니다.");
    }
    setLoading(false);
  };

  // 문의 상세 정보(및 답변) API 호출
  // 400 에러(삭제된 문의)가 발생하면 해당 항목에 deleted 플래그 추가
  const fetchInquiryDetail = async (index, inquiryId) => {
    try {
      const response = await api.get(`/inquiry/detail/${inquiryId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const detailInquiry = response.data.inquiry;
        const detailAnswer = response.data.answer;
        setInquiries((prev) => {
          const newArr = [...prev];
          newArr[index] = {
            ...newArr[index],
            ...detailInquiry,
            answer: detailAnswer ? detailAnswer.content : "",
          };
          return newArr;
        });
      } else {
        console.error("문의 상세 정보를 불러오지 못했습니다.");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setInquiries((prev) => {
          const newArr = [...prev];
          newArr[index] = {
            ...newArr[index],
            deleted: true,
          };
          return newArr;
        });
      }
      console.error("문의 상세 정보 호출 중 에러:", err);
    }
  };

  // 문의 항목 클릭 시 열기/닫기 처리
  // 답변 상태(answerStatus가 "1")인데 상세 정보(답변)가 로드되지 않았고, 삭제되지 않은 경우 API 호출
  const toggleInquiry = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      const inquiry = inquiries[index];
      if (
        inquiry &&
        inquiry.answerStatus === "1" &&
        !inquiry.answer &&
        !inquiry.deleted
      ) {
        fetchInquiryDetail(index, inquiry.inquiryId);
      }
    }
  };

  // 삭제 완료 후 호출되는 콜백: 삭제된 문의 ID를 제외하고 상태 업데이트
  const handleDeleteInquiry = (deletedInquiryId) => {
    setInquiries((prev) =>
      prev.filter((inquiry) => inquiry.inquiryId !== deletedInquiryId)
    );
  };

  // 문의 작성 화면 렌더링 시 onSuccess prop에 fetchInquiryList 호출 (딜레이 적용)
  if (showAddInquiry) {
    return (
      <AddInquiry
        onCancel={() => setShowAddInquiry(false)}
        onSuccess={() => {
          setTimeout(fetchInquiryList, 300);
        }}
      />
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded shadow-md relative">
      <InquiryHeader onAddInquiry={() => setShowAddInquiry(true)} />
      <hr className="border-gray-300" />
      {loading && <p>문의 내역을 불러오는 중...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && inquiries.length === 0 && (
      <div className="text-center text-gray-500 py-8">
        <p>아직 등록된 문의 내역이 없습니다.</p>
      </div>
    )}
      <InquiryList
        inquiries={inquiries}
        openIndex={openIndex}
        onToggleInquiry={toggleInquiry}
        onDelete={handleDeleteInquiry} 
      />
    </div>
  );
};

export default Inquiry;
