import { useState } from "react";
import AddInquiry from "./AddInquiry";

const Inquiry = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // AddInquiry 화면을 보여줄지 여부
  const [showAddInquiry, setShowAddInquiry] = useState(false);

  const toggleInquiry = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // answer가 비어있으면 '[답변 전]' / 있으면 '[답변 완료]'
  const inquiryList = [
    {
      question: "후원 취소는 어떻게 하나요?",
      answer:
        "후원 취소를 원하시면 홈페이지 내 마이페이지에서 직접 신청하거나, 고객센터(010-xxxx-xxxx)로 연락주시면 도와드리겠습니다.",
    },
    {
      question: "입양을 고민 중인데 방문 상담이 가능한가요?",
      answer:
        "네, 가능합니다. 보호소에 방문하시면 입양 상담을 도와드리고 강아지들을 직접 만나보실 수 있습니다. 방문 상담 예약은 홈페이지에서 신청해 주세요.",
    },
    {
      question: "유기견 보호소에서 자원봉사를 할 수 있나요?",
      answer:
        "네, 가능합니다! 보호소에서는 정기적으로 봉사자를 모집하고 있으며, 강아지 산책, 청소, 돌봄 등의 활동을 도와주실 수 있습니다. 봉사 신청은 홈페이지에서 가능합니다.",
    },
    {
      question: "긴급 구조가 필요한 강아지가 있어요. 어떻게 해야 하나요?",
      answer:
        "긴급한 구조가 필요한 경우, 가까운 동물 보호 센터(120 다산콜센터) 또는 동물보호단체에 신고해 주세요. 또한, 저희 사이트에 제보해 주시면 가능한 범위 내에서 도와드리겠습니다.",
    },
    {
      question: "답변 전 예시",
      answer: "", // 답변이 아직 없을 경우
    },
  ];

  // showAddInquiry 가 true이면 AddInquiry 컴포넌트 렌더링
  if (showAddInquiry) {
    // AddInquiry 화면
    return (
      <AddInquiry 
        onCancel={() => setShowAddInquiry(false)} 
      />
    );
  }

  // showAddInquiry가 false일 때 => 문의 목록 화면
  return (
    <div className="w-full p-6 bg-white rounded shadow-md relative">
      {/* 상단 헤더 부분: 제목 & 버튼을 우측에 배치 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">1대1 문의 내역</h1>
        <button
          onClick={() => setShowAddInquiry(true)} // 상태 변경
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          문의 작성하기
        </button>
      </div>

      <hr className="border-gray-300" />

      {/* 문의 목록 */}
      <ul className="space-y-6 mt-6">
        {inquiryList.map((faq, index) => {
          const isOpen = openIndex === index;
          const hasAnswer = faq.answer && faq.answer.trim() !== "";

          return (
            <li
              key={index}
              className="border-b border-gray-300 last:border-b-0 pb-4"
            >
              {/* 질문 영역 */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleInquiry(index)}
              >
                <p className="text-lg font-medium">
                  Q. {faq.question}
                  {/* 답변 여부 표시 */}
                  {hasAnswer ? (
                    <span className="ml-2 text-sm text-green-600">
                      [답변 완료]
                    </span>
                  ) : (
                    <span className="ml-2 text-sm text-red-500">
                      [답변 전]
                    </span>
                  )}
                </p>
                {/* 화살표 아이콘 */}
                <button
                  className={`cursor-pointer transform transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* 답변 영역 (열렸을 때만) */}
              {isOpen && (
                <div className="py-4 text-gray-600 text-sm">
                  <p className="font-bold text-red-500 mb-2">A.</p>
                  {hasAnswer ? (
                    <p>{faq.answer}</p>
                  ) : (
                    <p className="italic text-gray-400">
                      아직 답변이 등록되지 않았습니다.
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Inquiry;
