// src/LoginPageWrapper.jsx
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "./LoginPage";
import { loginSuccess } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

const LoginPageWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSuccess = (token, userName, userProfile) => {
    // 로컬 스토리지에 저장
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userProfile", userProfile);

    // JWT 토큰 디코드하여 role 추출 (토큰 구조에 따라 경로 수정 필요)
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role; // 예: "ROLE_SHELTER" 또는 "ROLE_USER"

    // Redux에 role도 함께 저장
    dispatch(loginSuccess({ token, userName, userProfile, role }));
    console.log(role);

    // 보호소 계정이면 /shelter로, 아니면 홈("/")으로 이동
    navigate(role === "ROLE_SHELTER" ? "/shelter" : "/");
  };

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPageWrapper;
