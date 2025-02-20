// src/LoginPageWrapper.jsx
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "./LoginPage";
import { loginSuccess } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const LoginPageWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSuccess = (data) => {
    // data: { token, userId, userName, userProfile, role }
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("userProfile", data.userProfile);
    localStorage.setItem("userId", data.userId);
    // jwtDecode token
    const decodedToken = jwtDecode(data.token);
    const role = decodedToken.role;
    dispatch(loginSuccess({ ...data, role }));
    // console.log(role);
    navigate(role === "ROLE_SHELTER" ? "/shelter" : "/");
  };

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPageWrapper;
