import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* 왼쪽: 로고 */}
      <div className="flex items-center">
        <Link to="/">
          <img
            className="w-10 h-10"
            src="/assets/dog-icon.png"
            alt="로고"
          />
        </Link>
      </div>

      {/* 중앙: 메뉴 */}
      <nav className="flex space-x-8 text-lg font-medium">
        <Link
          to="/shelters"
          className="text-gray-700 hover:text-black transition"
        >
          보호소 찾기
        </Link>
        <Link
          to="/live"
          className="text-gray-700 hover:text-black transition"
        >
          라이브
        </Link>
        <Link
          to="/donate"
          className="text-gray-700 hover:text-black transition"
        >
          후원하기
        </Link>
        <Link
          to="/news"
          className="text-gray-700 hover:text-black transition"
        >
          소식
        </Link>
      </nav>

      {/* 오른쪽: 검색 + 로그인/회원가입 + 후원하기 버튼 */}
      <div className="flex items-center space-x-4">
        {/* 검색 아이콘 */}
        <button className="p-2">
          <img
            src="/assets/search-icon.png"
            alt="검색"
            className="w-5 h-5"
          />
        </button>

        {/* 로그인/회원가입 */}
        <div className="flex items-center text-gray-700 space-x-2">
          <Link
            to="/login"
            className="hover:text-black transition"
          >
            로그인
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/signup"
            className="hover:text-black transition"
          >
            회원가입
          </Link>
        </div>

        {/* 후원하기 버튼 */}
        <Link to="/donate">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
            후원하기
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
