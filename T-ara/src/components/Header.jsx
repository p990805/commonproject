import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, userName, userProfile, handleLogout }) => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img className="w-10 h-10" src="/assets/dog-icon.png" alt="로고" />
        </Link>
      </div>
      <nav className="flex space-x-8 text-lg font-medium">
        <Link to="/shelters" className="text-gray-700 hover:text-black transition">
          보호소 찾기
        </Link>
        <Link to="/live" className="text-gray-700 hover:text-black transition">
          라이브
        </Link>
        <Link to="/donate" className="text-gray-700 hover:text-black transition">
          후원하기
        </Link>
        <Link to="/community" className="text-gray-700 hover:text-black transition">
          소식
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            <img src={userProfile} alt="프로필" className="w-8 h-8 rounded-full" />
            <span className="text-gray-700">안녕하세요, {userName}님</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              로그아웃
            </button>
          </div>
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
