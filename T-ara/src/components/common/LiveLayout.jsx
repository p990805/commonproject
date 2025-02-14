// src/components/common/LiveLayout.jsx
import React from "react";
import LiveSidebarMenu from "./LiveSidebarMenu";

const LiveLayout = ({ title, children, sidebarMenu }) => {
  return (
    <div className="w-full bg-white">
      {/* 라이브 배너 영역 */}
      <div className="relative max-w-7xl mx-auto">
        <img
          src="/assets/livebanner.png"
          alt="라이브 배너"
          className="w-full object-cover"
        />
        <div className="absolute bottom-5 right-5 text-white text-lg md:text-xl font-thin text-right pr-5 z-10">
          <span className="font-bold text-lg md:text-xl">라이브</span> 콘텐츠를 즐기세요!
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-start">
          {/* 좌측 사이드바 */}
          <aside className="w-1/4 mr-6">
            <nav className="bg-white rounded border border-gray-300 p-4">
              {/* sidebarMenu prop이 있으면 해당 컴포넌트 사용, 없으면 기본 LiveSidebarMenu 사용 */}
              {sidebarMenu || <LiveSidebarMenu />}
            </nav>
          </aside>
          {/* 우측 콘텐츠 영역 */}
          <section className="flex-1 border-y border-gray-300 p-4">
            {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
            {children}
          </section>
        </div>
      </div>
    </div>
  );
};

export default LiveLayout;
