// src/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // axios 인스턴스

// S3 URL에서 파일 키 추출 함수 (필요시 사용)
// 예: "profile_img/gigwan3.png" → "gigwan3.png"
const extractFileKey = (url) => {
  try {
    const parsedUrl = new URL(url);
    let key = parsedUrl.pathname.startsWith("/")
      ? parsedUrl.pathname.substring(1)
      : parsedUrl.pathname;
    if (key.startsWith("profile_img/")) {
      key = key.replace("profile_img/", "");
    }
    return key;
  } catch (error) {
    console.error("파일 키 추출 오류:", error);
    return url;
  }
};

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

    // console.log("💡 [프론트] 로그인 요청 데이터:", { loginId, password });

    // memberType에 따라 엔드포인트 선택
    const endpoint =
      memberType === "shelter" ? "/member/login/shelter" : "/member/login/user";

    try {
      // 1. 로그인 요청
      const response = await api.post(
        endpoint,
        { loginId, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log("응답 헤더:", response.headers);
      // console.log("✅ [프론트] 로그인 응답 데이터:", response.data);

      // 토큰 추출
      const token =
        response.headers.authorization || response.headers["Authorization"];
      if (!token) {
        console.error("Authorization 헤더가 없습니다.");
      } else {
        // console.log("토큰", token);
      }

      // 로컬스토리지에 토큰 저장
      localStorage.setItem("authToken", token);

      // 보호소든 개인회원이든, /member/myinfo API 호출하여 사용자 정보를 가져옵니다.
      const userInfoResponse = await api.get("/member/myinfo", {
        headers: { Authorization: token },
      });
      // console.log("✅ [프론트] 사용자 정보 응답:", userInfoResponse.data);
      // 응답 구조가 { user: { ... } } 또는 { shelter: { ... } }로 내려온다고 가정합니다.
      const userData =
        userInfoResponse.data.user || userInfoResponse.data.shelter || {};

      let presignedProfileUrl = "";
      if (memberType === "personal") {
        // 개인회원 로그인 시
        const { userId, name, profileImg } = userData;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", name);
        const originalProfileImg = profileImg ? profileImg : "";
        if (originalProfileImg) {
          if (originalProfileImg.includes("placeholder")) {
            presignedProfileUrl = originalProfileImg;
          } else {
            const fileKey = extractFileKey(originalProfileImg);
            // console.log("추출된 파일 키:", fileKey);
            try {
              const presignedResponse = await api.get(
                "/upload/presigned-get-url",
                {
                  params: { fileName: fileKey },
                }
              );
              // console.log("presigned URL 응답:", presignedResponse.data);
              presignedProfileUrl = presignedResponse.data.url;
            } catch (error) {
              console.error("presigned URL 가져오기 실패:", error);
              presignedProfileUrl = originalProfileImg;
            }
          }
          localStorage.setItem("userProfile", presignedProfileUrl);
        }
      } else {
        // 보호소 로그인 시
        // shelter 객체에서 필요한 정보를 저장
        const { shelterId, cityCategoryId, name } = userData;
        localStorage.setItem("shelterId", shelterId);
        localStorage.setItem("shelterName", name);
        localStorage.setItem("cityCategoryId", cityCategoryId);
        // 보호소 로그인 시, userName은 shelterName으로 사용
        localStorage.setItem("userName", name);
        localStorage.setItem("userProfile", ""); // 보호소는 별도 프로필 이미지 없다고 가정
      }

      // onLoginSuccess 호출 (객체 형태로 전달하여 키-값 매핑 오류를 방지)
      onLoginSuccess({
        token,
        userId: memberType === "personal" ? userData.userId : "",
        userName: userData.name,
        userProfile: memberType === "personal" ? presignedProfileUrl : "",
        role: memberType === "personal" ? "ROLE_USER" : "ROLE_SHELTER",
      });

      // 보호소 로그인인 경우 "/shelter"로, 그렇지 않으면 홈 화면("/")으로 이동
      if (memberType === "shelter") {
        navigate("/shelter");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("❌ [프론트] 로그인 요청 실패:", error);
      if (error.response) {
        console.error(
          "🛑 [프론트] 서버 응답 에러 데이터:",
          error.response.data
        );
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

          {/* <div className="flex justify-end text-sm">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              비밀번호 찾기
            </a>
          </div> */}

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
            className="text-black-500 hover:underline font-bold cursor-pointer"
          >
            회원가입
          </a>
          {/* <span className="mx-2 text-black-500 font-bold">|</span>
          <a
            href="/find-id"
            className="text-black-500 hover:underline font-bold"
          >
            아이디 찾기
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
