// src/pages/LivePage.jsx
import { useState, useEffect } from "react";
import MySponLive from "../components/live/MySponLive";
import DailyLive from "../components/live/DailyLive";

const LivePage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab_live") || "일상 라이브";
  });

  // 컴포넌트가 unmount될 때 "activeTab_live" 값을 localStorage에서 제거합니다.
  useEffect(() => {
    return () => {
      localStorage.removeItem("activeTab_live");
    };
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab_live", tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "일상 라이브":
        return <DailyLive />;
      case "내 후원동물 라이브":
        return <MySponLive />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="relative w-full">
        <img
          src="/assets/livebanner.png"
          alt="라이브배너"
          className="w-full object-cover brightness-90"
        />

        <div className="absolute bottom-[33%] right-[10%] text-white text-lg md:text-xl font-thin text-right">
          <p className="text-left">
            후원자가 되시면 <br />
            <span className="font-semibold">
              후원자 카드, 연차보고서 제공 및 <br />
              기부금 세액공제 혜택
            </span>
            을 드립니다.
          </p>
        </div>
      </div>

      <div className="w-full bg-white px-4 py-6 md:py-10">
        <div className="flex items-start">
          <aside className="hidden md:block w-1/4 mr-6">
            <nav className="bg-white rounded border border-gray-300 p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">라이브</h1>
                <hr className="border-gray-300" />
              </div>
              <ul>
                {["일상 라이브", "내 후원동물 라이브"].map((menu) => (
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
          <section className="flex-1 border-y border-gray-300">
            {renderContent()}
          </section>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
