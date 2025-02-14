import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqList = [
    {
      question: "유기견 기부는 어떻게 하나요?",
      answer:
        "문의 주셔서 감사합니다. 유기견 기부는 보호소와 협력하여 진행됩니다. 가까운 보호소에 직접 방문하시거나, 저희 사이트에서 온라인 신청을 하실 수 있습니다. 기부 절차에 대한 자세한 안내는 010-xxxx-xxxx로 문의 부탁드립니다.",
    },
    {
      question: "기부한 후에 강아지의 소식을 받을 수 있나요?",
      answer:
        "네, 가능합니다. 기부하신 강아지는 보호소에서 입양을 준비하게 되며, 희망하시면 정기적인 소식(사진 및 건강 상태)을 이메일이나 문자로 받아보실 수 있습니다.",
    },
    {
      question: "정기 후원은 어떻게 신청하나요?",
      answer:
        "정기 후원은 홈페이지 '정기 후원' 메뉴에서 신청하실 수 있습니다. 원하시는 후원 금액과 기간을 설정하면 자동이체로 후원이 진행됩니다. 후원금은 유기견 보호 및 치료비로 사용됩니다.",
    },
    {
      question: "기부금 영수증을 받을 수 있나요?",
      answer:
        "네, 기부금 영수증을 발급해 드립니다. 기부 후 마이페이지에서 신청하시거나, 010-xxxx-xxxx로 문의 주시면 이메일로 영수증을 보내드립니다.",
    },
    {
      question: "유기견을 직접 보호하고 싶은데 방법이 있을까요?",
      answer:
        "네, 가능합니다! 보호소에서 임시 보호를 신청하시면 일정 기간 동안 강아지를 돌볼 수 있습니다. 이후 입양을 원하시면 우선권이 부여되며, 임시 보호 신청은 사이트 또는 보호소 방문을 통해 가능합니다.",
    },
    {
      question: "기부한 돈이 어떻게 사용되는지 알 수 있을까요?",
      answer:
        "기부금은 유기견의 사료, 의료비, 예방 접종, 보호소 운영비 등에 사용됩니다. 매달 후원금 사용 내역을 홈페이지에 투명하게 공개하고 있으니 참고 부탁드립니다.",
    },
    
  ];

  return (
    <div className="w-full p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold  mb-6">자주묻는 질문</h1>
      <hr className="border-gray-300"/>
      {/* ul에 상단 여백 추가 */}
      <ul className="space-y-6 mt-6"> {/* 추가: mt-6 */}
        {faqList.map((faq, index) => (
          <li
            key={index}
            className="border-b border-gray-300 last:border-b-0 pb-4" // 아래 간격 추가
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <p className="text-lg font-medium">Q. {faq.question}</p>
              <button
                className={`cursor-pointer transform transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
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
            {openIndex === index && (
              <div className="py-4 text-gray-600 text-sm">
                <p className="font-bold text-red-500 mb-2">A.</p>
                <p>{faq.answer}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
