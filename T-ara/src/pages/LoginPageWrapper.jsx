import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "./LoginPage";
import { loginSuccess } from "../features/auth/authSlice";

const LoginPageWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSuccess = (token, userName, userProfile) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userProfile", userProfile);
    dispatch(loginSuccess({ token, userName, userProfile }));
    navigate("/");
  };

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPageWrapper;
