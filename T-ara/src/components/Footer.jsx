import { Link } from "react-router-dom";
import "./styles/Footer.css";
import { FaGitlab } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";
import { FaFigma } from "react-icons/fa";
import { MdFilterDrama } from "react-icons/md";


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
            <li>
              <Link to="/terms" className="hover:underline">
                이용약관
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                개인정보처리방침
              </Link>
            </li>
           
            <li>
              <Link to="/community/faq" className="hover:underline">
                자주 묻는 질문
              </Link>
            </li>
              <Link to="/emailreject" className="hoverLunderline">이메일 무단수집거부</Link>
          </ul>
          <p>티아라코리아 광주 광산구 하남산단로</p>
          <p>대표전화 010-1234-5678</p>
          <p>사업자번호 123456789 | 통신판매업신고번호 1234-12345</p>
          <p>&copy; T-ara Korea All Rights Reserved.</p>
        </div>

        {/* 오른쪽: 소셜 미디어와 드롭다운 */}
        <div className="footer-right">
        <div className="social-icons flex justify-end gap-2 mb-2">
            <a
              href="https://lab.ssafy.com/s12-webmobile1-sub1/S12P11C201"
              target="_blank"
              rel="noopener noreferrer"
              className="icon facebook block w-5 h-5 bg-[#555] rounded-full flex items-center justify-center"
            >
              <FaGitlab />
            </a>
            <a
              href="https://www.notion.so/2-16c56367f19f806284f2e194c48d7325"
              target="_blank"
              rel="noopener noreferrer"
              className="icon instagram block w-5 h-5 bg-[#555] rounded-full flex items-center justify-center"
            >
              <RiNotionFill />
            </a>
            <a
              href="https://www.figma.com/design/yx38WyEbfjmKf0EAq3bFnB/C201-PJT?t=Gi95o65dtWfHnLEk-0"
              target="_blank"
              rel="noopener noreferrer"
              className="icon twitter block w-5 h-5 bg-[#555] rounded-full flex items-center justify-center"
            >
              <FaFigma />
            </a>
            <a
              href="https://www.erdcloud.com/d/2pcLa4ASmdsZvMo7H"
              target="_blank"
              rel="noopener noreferrer"
              className="icon youtube block w-5 h-5 bg-[#555] rounded-full flex items-center justify-center"
            >
              <MdFilterDrama />
            </a>
          </div>

          <div className="dropdowns">
            <select>
              <option>Tara</option>
              <option>박주찬</option>
              <option>김가연</option>
              <option>김시원</option>
              <option>박시현</option>
              <option>손서현</option>
              <option>장희주</option>
            </select>
            <select>
              <option>Family Site</option>
              <option>Our Project</option>
              <option>Thank You SSAFY</option>
              <option>Good bye C201</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
