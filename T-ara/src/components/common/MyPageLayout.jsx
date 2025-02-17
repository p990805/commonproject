// src/components/common/MyPageLayout.jsx
import MyPageSidebar from "./MyPageSidebar";

const MyPageLayout = ({ title, children, sidebarMenu }) => {
  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="flex">
          {/* 좌측 사이드바 */}
          <aside className="w-1/4 mr-6">
            <nav className="bg-white rounded border border-gray-300 p-4 shadow-md">
              {sidebarMenu || <MyPageSidebar />}
            </nav>
          </aside>
          {/* 우측 메인 콘텐츠 */}
          <section className="flex-1 bg-white p-4 rounded border border-gray-300 shadow-md">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;
