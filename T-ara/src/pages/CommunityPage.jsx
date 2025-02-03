import { useState, useEffect } from "react";
import Notice from "../components/community/Notice";
import Board from "../components/community/Board";
import FAQ from "../components/community/FAQ";
import Inquiry from "../components/community/Inquiry";

const CommunityPage = () => {
  // 현재 활성화 된 탭 이름 (기본값 = "공지사항")
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "공지사항";
  });

  // 컴포넌트 언마운트 시 localStorage에서 activeTab 제거
  useEffect(() => {
    return () => {
      localStorage.removeItem("activeTab");
    };
  }, []);

  // 사이드바 메뉴 클릭
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", tabName);
  };

  // 우측에서 보여줄 콘텐츠 결정
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
    <div className="w-full bg-white">
      {/* 배너 영역 */}
      <div className="relative w-full">
        {/* 배너 이미지 (흐름 속) */}
        <img
          src="./assets/banner.png"
          alt="배너"
          className="w-full object-cover"
        />

        {/* 텍스트를 겹쳐 보여주고 싶으면 absolute로 위치 지정 */}
        <div className="absolute bottom-5 right-5 text-white text-lg md:text-xl font-thin text-right pr-5 z-10">
          <span className="font-bold text-lg md:text-xl">후원</span>과{" "}
          <span className="font-bold text-lg md:text-xl">입양</span>,{" "}
          <span className="font-bold text-lg md:text-xl">보호소</span>들의
          <br />
          <span className="font-bold text-lg md:text-xl">중요한 정보</span>와{" "}
          <span className="font-bold text-lg md:text-xl">소식</span>을 안내드립니다.
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* 제목 및 '글 작성하기' 버튼 영역 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">소식</h2>
        </div>

        {/* 컨텐츠 래퍼: 좌측 사이드바, 우측 본문 */}
        <div className="flex items-start">
          {/* 사이드바 */}
          <aside className="hidden md:block w-1/4 mr-6">
            <nav className="bg-white rounded border border-gray-300 p-4">
              <ul>
                {["공지사항", "게시판", "자주묻는 질문", "1:1 문의"].map((menu) => (
                  <li className="mb-2" key={menu}>
                    <button
                      className={`
                        w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition
                        ${activeTab === menu ? "bg-red-500 text-white" : "bg-white"}
                        cursor-pointer
                      `}
                      onClick={() => handleTabClick(menu)}
                    >
                      {menu}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* 우측 메인 콘텐츠 */}
          <section className="flex-1 border-y border-gray-300">{renderContent()}</section>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
