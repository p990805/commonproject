import React, { useState } from "react";

const SidebarNavigation = () => {
  const [activeItem, setActiveItem] = useState("후원금 내역");
  const [expandedSections, setExpandedSections] = useState({
    "후원 관리": true,
    "유기 동물 관리": true,
    "공지사항 관리": true,
    "스트리밍 관리": true,
    "보호소 정보 관리": true,
  });

  const navigationItems = {
    "후원 관리": ["후원금 내역", "후원금 사용 내역", "캠페인 후원"],
    "유기 동물 관리": ["전체 유기 동물", "동물 일지", "산책 예약"],
    "공지사항 관리": ["전체 공지사항"],
    "스트리밍 관리": [
      "전체 라이브 스트리밍",
      "라이브 스트리밍 연결",
      "CCTV 라이브",
    ],
    "보호소 정보 관리": ["보호소 정보 수정"],
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-[200px] h-[1080px] px-4 bg-[#f5f4fd] flex-col justify-start items-start gap-4 inline-flex">
      {Object.entries(navigationItems).map(([section, items]) => (
        <div
          key={section}
          className="self-stretch flex-col justify-start items-start gap-1 flex"
        >
          <button
            onClick={() => toggleSection(section)}
            className="self-stretch py-2 justify-start items-center gap-1 inline-flex hover:bg-[#eae9f8] rounded"
          >
            <div className="w-4 h-4 flex items-center justify-center text-[#a7abc3] ">
              {expandedSections[section] ? "-" : "+"}
            </div>
            <div className="text-[#a7abc3] text-[12px] font-medium uppercase leading-none">
              {section}
            </div>
          </button>

          {expandedSections[section] &&
            items.map((item) => (
              <button
                key={item}
                onClick={() => setActiveItem(item)}
                className={`self-stretch p-2 justify-start items-start gap-2.5 inline-flex w-full transition-all duration-200 ${
                  activeItem === item
                    ? "bg-[#d5d4f5] rounded-tr-[99px] rounded-br-[99px] shadow-[inset_3px_0px_0px_0px_rgba(123,97,255,1.00)]"
                    : "hover:bg-[#eae9f8] rounded-tr-[99px] rounded-br-[99px]"
                }`}
              >
                <div className="text-[#434657] text-[13px] font-medium leading-tight">
                  • {item}
                </div>
              </button>
            ))}
        </div>
      ))}
    </div>
  );
};

export default SidebarNavigation;
