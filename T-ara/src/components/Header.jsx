import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* 왼쪽: 로고 */}
      <div className="header-left">
        <img
          className="logo"
          src="/assets/dog-icon.png"
          alt="로고"
        />
      </div>

      {/* 중앙: 메뉴 */}
      <nav className="header-nav">
        <ul>
          <li>보호소 찾기</li>
          <li>라이브</li>
          <li>후원하기</li>
          <li>소식</li>
        </ul>
      </nav>

      {/* 오른쪽: 검색아이콘 + 로그인/회원가입 + 후원하기 버튼 */}
      <div className="header-right">
        {/* 검색 아이콘 */}
        <button className="icon-button search">
          <img src="/assets/search-icon.png" alt="검색" />
        </button>

        {/* 로그인 / 회원가입 텍스트 */}
        <div className="login-join">
          <span>로그인</span>
          <span className="divider"> | </span>
          <span>회원가입</span>
        </div>

        {/* 후원하기 버튼 */}
        <button className="donate-button">후원하기</button>
      </div>
    </header>
  );
};

export default Header;
