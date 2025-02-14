// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // api.js에서 설정한 axios 인스턴스

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

    if (!loginId || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    console.log("💡 [프론트] 로그인 요청 데이터:", { loginId, password });

    // memberType에 따라 엔드포인트 선택
    const endpoint =
      memberType === "shelter" ? "/member/login/shelter" : "/member/login/user";

    try {
      // 로그인 요청
      const response = await api.post(
        endpoint,
        { loginId, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("응답 헤더:", response.headers);
      console.log("✅ [프론트] 서버 응답 데이터:", response.data);

      const { name, userProfile } = response.data; // 응답 데이터에서 필요한 값 추출
      const token =
        response.headers.authorization ||
        response.headers["Authorization"]; // 응답 헤더에서 토큰 추출

      if (!token) {
        console.error("Authorization 헤더가 없습니다.");
      } else {
        console.log("토큰", token);
      }

      // 로컬 스토리지에 토큰 및 사용자 정보 저장
      localStorage.setItem("authToken", token);
      localStorage.setItem("userName", name);
      localStorage.setItem("userProfile", userProfile);

      const profileImage = userProfile || "/assets/cats.png";

      // onLoginSuccess 함수 호출
      onLoginSuccess(token, name, profileImage);

      // 홈 화면으로 이동
      navigate("/");
    } catch (error) {
      console.error("❌ [프론트] 요청 실패:", error);

      if (error.response) {
        console.error("🛑 [프론트] 서버 응답 에러 데이터:", error.response.data);
        alert(error.response.data.message || "로그인 실패. 다시 시도하세요.");
      } else if (error.request) {
        console.error("🚨 [프론트] 요청이 보내지지 않음:", error.request);
        alert("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
      } else {
        console.error("⚠️ [프론트] 기타 오류:", error.message);
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 min-h-[calc(100vh-200px)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          티아라에 방문해주셔서 감사합니다
        </h2>
        <p className="text-gray-600 text-sm">
          로그인을 통해 나의 후원정보를 확인해보세요.
        </p>
      </div>

      <div className="w-full max-w-md border border-gray-200 rounded-md p-6 shadow-sm">
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
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
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
          <a
            onClick={navSignup}
            className="text-black-500 hover:underline font-bold"
          >
            회원가입
          </a>
          <span className="mx-2 text-black-500 font-bold">|</span>
          <a
            href="/find-id"
            className="text-black-500 hover:underline font-bold"
          >
            아이디 찾기
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
