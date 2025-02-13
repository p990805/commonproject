import React from "react";
import SidebarMenu from "./SidebarMenu";

const CommunityLayout = ({ title, children, sidebarMenu }) => {
  return (
    <div className="w-full bg-white">
      {/* 배너 영역 */}
      <div className="relative max-w-7xl mx-auto">
        <img
          src="/assets/banner.png"
          alt="배너"
          className="w-full object-cover"
        />
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
        

        {/* 컨텐츠 래퍼: 좌측 사이드바와 우측 본문 */}
        <div className="flex items-start">
          {/* 사이드바 */}
          <aside className="w-1/4 mr-6">
            <nav className="bg-white rounded border border-gray-300 p-4">
              {/* sidebarMenu prop이 없으면 기본 SidebarMenu 컴포넌트를 사용 */}
              {sidebarMenu || <SidebarMenu />}
            </nav>
          </aside>
          {/* 우측 메인 콘텐츠 영역 */}
          <section className="flex-1 border-y border-gray-300">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommunityLayout;
