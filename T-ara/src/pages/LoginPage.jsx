import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ onLoginSuccess }) => {
  const [memberType, setMemberType] = useState("personal");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 기본 유효성 검사
    if (!loginId || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 백엔드 로그인 API 호출
      const response = await axios.post(
        "http://localhost:8090/member/login/user",
        {
          loginId,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 로그인 성공 시 응답 데이터 처리
      console.log("로그인 성공:", response.data);

      const { token, userName, userProfile } = response.data; // 백엔드 응답 데이터 기반
      localStorage.setItem("authToken", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userProfile", userProfile);

      // 상위 컴포넌트(App.js)에 로그인 성공 알림
      onLoginSuccess(token, userName, userProfile);

      // 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 min-h-[calc(100vh-200px)]">
      {/* 상단 안내문 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">티아라에 방문해주셔서 감사합니다</h2>
        <p className="text-gray-600 text-sm">
          로그인을 통해 나의 후원정보를 확인해보세요.
        </p>
      </div>

      {/* 로그인 박스 */}
      <div className="w-full max-w-md border border-gray-200 rounded-md p-6 shadow-sm">
        {/* 탭 전환 영역 */}
        <div className="flex mb-6">
          <button
            onClick={() => setMemberType("personal")}
            className={`flex-1 py-2 text-center font-semibold cursor-pointer ${
              memberType === "personal"
                ? "border-2 border-red-500 text-red-500 shadow-sm rounded"
                : "text-gray-300 border-2 border-gray-300 rounded"
            }`}
          >
            개인 회원
          </button>
          <button
            onClick={() => setMemberType("shelter")}
            className={`flex-1 py-2 text-center font-semibold cursor-pointer ${
              memberType === "shelter"
                ? "border-2 border-red-500 text-red-500 shadow-sm rounded"
                : "text-gray-300 border-2 border-gray-300 rounded"
            }`}
          >
            보호소 회원
          </button>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
          />

          <div className="flex justify-end text-sm">
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              비밀번호 찾기
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition-colors cursor-pointer"
          >
            로그인
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <a onClick={navSignup} className="text-black-500 hover:underline font-bold">
            회원가입
          </a>
          <span className="mx-2 text-black-500 font-bold">|</span>
          <a href="/find-id" className="text-black-500 hover:underline font-bold">
            아이디 찾기
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
