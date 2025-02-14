// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // jwt-decode의 default export 사용

const Header = ({ isLoggedIn, userName, userProfile, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("authToken");
      if (token) {
        // "Bearer " 접두어가 있다면 제거
        const actualToken = token.startsWith("Bearer ")
          ? token.slice(7)
          : token;
        try {
          const decoded = jwtDecode(actualToken);
          const exp = decoded.exp; // 만료 시간(초 단위)

          let intervalId = null;
          const updateRemainingTime = () => {
            const now = Date.now(); // 현재 시간 (ms)
            const timeLeft = Math.floor((exp * 1000 - now) / 1000); // 남은 시간(초)

            if (timeLeft <= 0) {
              setRemainingTime(0);
              clearInterval(intervalId);
              handleLogout(); // 남은 시간이 0 이하면 자동 로그아웃
            } else {
              setRemainingTime(timeLeft);
            }
          };

          updateRemainingTime();
          intervalId = setInterval(updateRemainingTime, 1000);

          return () => clearInterval(intervalId);
        } catch (error) {
          console.error("토큰 디코딩 실패:", error);
        }
      }
    }
  }, [isLoggedIn, handleLogout]);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img className="w-45 h-10" src="/assets/logo.png" alt="로고" />
        </Link>
      </div>

      <nav className="flex space-x-8 text-lg font-medium">
        <Link
          to="/shelter-finder"
          className="text-gray-700 hover:text-black transition"
        >
          보호소 찾기
        </Link>
        <Link to="/live/daily" className="text-gray-700 hover:text-black transition">
          라이브
        </Link>
        <Link
          to="/animal"
          className="text-gray-700 hover:text-black transition"
        >
          후원하기
        </Link>
        <Link
          to="/campaign"
          className="text-gray-700 hover:text-black transition"
        >
          캠페인
        </Link>
        <Link
          to="/community/notice"
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

      <div className="flex items-center space-x-4 relative">
        {isLoggedIn ? (
          <>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                src={userProfile}
                alt="프로필"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">
                {userName}님{" "}
                {remainingTime !== null && (
                  <span className="text-sm text-red-500">
                    ({remainingTime}초 남음)
                  </span>
                )}
              </span>
              <p className="text-xl">▼</p>
            </div>
            {dropdownOpen && (
              <div
                className="absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-[9999]"
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
          <div className="flex items-center text-gray-700 space-x-2">
            <Link to="/login" className="hover:text-black transition">
              로그인
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/signup" className="hover:text-black transition">
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
