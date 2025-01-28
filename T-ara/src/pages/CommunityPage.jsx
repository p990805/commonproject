import Notice from "../components/community/Notice";
import Board from "../components/community/Board";
import FAQ from "../components/community/FAQ";
import Inquiry from "../components/community/Inquiry";

import { useState } from "react";

const CommunityPage=() =>{

    // 현재 활성화 된 탭 이름 (공지사항)
    const [activeTab, setActiveTab] = useState("공지사항");

    //사이드바 메뉴 클릭 시 activeTab을 변경
    const handleTabClick=(tabName)=>{
        setActiveTab(tabName);
    }

  // 우측에서 보여줄 내용 결정 (예시)
    const renderContent = () => {
        switch (activeTab) {
        case "공지사항":
            return <Notice />;
        case "게시판":
            return <Board />;
        case "자주묻는 질문":
            return <FAQ />;
        case "1:1 문의":
            return <Inquiry />;
        default:
            return null;
        }
    };


    return (
        <div className="w-full">
          {/* 배너 */}
          <div className="relative w-full h-60 md:h-72 bg-pink-100 flex items-center justify-end">
            <img
              src="./assets/banner.png"
              alt="배너"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 text-white text-lg md:text-xl font-thin text-right pr-5">
                <span className="!text-white font-bold text-lg md:text-xl">후원</span>과 <span className="!text-white font-bold text-lg md:text-xl">입양</span>, <span className="!text-white font-bold text-lg md:text-xl">보호소</span>들의 <br /> 
                <span className="!text-white font-bold text-lg md:text-xl">중요한 정보</span>와 <span className="!text-white font-bold text-lg md:text-xl">소식</span>을 안내드립니다.
            </div>
          </div>
    
          {/* 메인 컨테이너 */}
          <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
            {/* 제목 및 '글 작성하기' 버튼 영역 */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">소식</h2>
              <button
                onClick={() => alert("글 작성하기 버튼 클릭됨!")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                글 작성하기
              </button>
            </div>
    
            {/* 컨텐츠 랩퍼: 좌측 사이드바, 우측 본문 */}
            <div className="flex items-start">
              {/* 사이드바 (상단 정렬) */}
              <aside className="hidden md:block w-1/4 mr-6">
                <nav className="bg-white rounded border p-4">
                  <ul>
                    {["공지사항", "게시판", "자주묻는 질문", "1:1 문의"].map(
                      (menu) => (
                        <li className="mb-2" key={menu}>
                          <button
                            className={
                              // activeTab이면 빨갛게 표시, 아니면 회색
                              `w-full text-left px-3 py-2 rounded hover:bg-gray-100  transition
                              ${
                                activeTab === menu
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-100"
                              }`
                            }
                            onClick={() => handleTabClick(menu)}
                          >
                            {menu}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </aside>
    
              {/* 우측 메인 컨텐츠: 현재 activeTab에 맞는 내용 표시 */}
              <section className="flex-1">
                {renderContent()}
              </section>
            </div>
          </div>
        </div>
      );
}
export default CommunityPage;