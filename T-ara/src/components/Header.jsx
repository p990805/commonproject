import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, userName, userProfile, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md mx-auto my-auto">
      {/* 로고 */}
      <div className="flex items-center">
        <Link to="/">
          <img className="w-45 h-10" src="/assets/logo.png" alt="로고" />
        </Link>
      </div>

      {/* 네비게이션 */}
      <nav className="flex space-x-8 text-lg font-medium">
        <Link
          to="/shelterFinder"
          className="text-gray-700 hover:text-black transition"
        >
          보호소 찾기
        </Link>
        <Link to="/live" className="text-gray-700 hover:text-black transition">
          라이브
        </Link>
        <Link
          to="/donation"
          className="text-gray-700 hover:text-black transition"
        >
          후원하기
        </Link>
        <Link
          to="/community"
          className="text-gray-700 hover:text-black transition"
        >
          소식
        </Link>
        <Link
          to="/reservation"
          className="text-gray-700 hover:text-black transition"
        >
          산책예약
        </Link>
      </nav>

      {/* 사용자 정보 및 드롭다운 */}
      <div className="flex items-center space-x-4 relative">
        {isLoggedIn ? (
          <>
            {/* 프로필 및 드롭다운 토글 */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                src={userProfile}
                alt="프로필"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">{userName}님</span>
              <p className="text-xl">▼</p>
            </div>

            {/* 드롭다운 메뉴 */}
            {dropdownOpen && (
              <div
                className="absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                onMouseLeave={closeDropdown}
              >
                <Link
                  to="/mypage"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  onClick={closeDropdown}
                >
                  마이페이지
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  로그아웃
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* 로그인/회원가입 */}
            <div className="flex items-center text-gray-700 space-x-2">
              <Link to="/login" className="hover:text-black transition">
                로그인
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/signup" className="hover:text-black transition">
                회원가입
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
