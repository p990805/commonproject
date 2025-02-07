import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer flex items-center justify-center">
      <div className="footer-content">
        {/* 왼쪽: 후원 정보 */}
        <div className="footer-left">
          {/* 파이 차트 영역 */}
          <div className="pie-chart">
            <span className="pie-center-text">83%</span>
          </div>
        </div>

        <div className="left-text">
          <h3>
                후원금의 83%가
                <br />
                유기동물들에게 지원됩니다
            </h3>

            <ul className="footer-stats">
                <li>
                <span className="stat-circle red"></span>
                유기동물을 위한 사업비 83%
                </li>
                <li>
                <span className="stat-circle blue"></span>
                후원개발 및 관리비 15%
                </li>
                <li>
                <span className="stat-circle yellow"></span>
                일반관리비 2%
                </li>
            </ul>
        </div>

        {/* 중앙: 링크 및 회사 정보 */}
        <div className="footer-center">
          <ul className="footer-links">
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>오시는 길</li>
            <li>자주 묻는 질문</li>
            <li>이메일 무단수집거부</li>
            <li>사이트맵</li>
          </ul>
          <p>티아라코리아 광주 광산구 하남산단로</p>
          <p>대표전화 010-1234-5678</p>
          <p>사업자번호 123456789 | 통신판매업신고번호 1234-12345</p>
          <p>&copy; T-ara Korea All Rights Reserved.</p>
        </div>

        {/* 오른쪽: 소셜 미디어와 드롭다운 */}
        <div className="footer-right">
          <div className="social-icons">
            <span className="icon facebook"></span>
            <span className="icon instagram"></span>
            <span className="icon twitter"></span>
            <span className="icon youtube"></span>
          </div>
          <div className="dropdowns">
            <select>
              <option>Tara</option>
            </select>
            <select>
              <option>Family Site</option>
            </select>
            <select>
              <option>English</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
