// src/App.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./Router";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess, logout } from "./features/auth/authSlice";
import { jwtDecode} from "jwt-decode"; // npm install jwt-decode

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userName, userProfile, role } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      const userRole = decoded.role; // 예: "ROLE_SHELTER" 또는 "ROLE_USER"
      const storedUserName = localStorage.getItem("userName") || "사용자";
      const storedUserProfile =
        localStorage.getItem("userProfile") || "/assets/default-profile.png";
      dispatch(
        loginSuccess({
          token,
          userName: storedUserName,
          userProfile: storedUserProfile,
          role: userRole,
        })
      );
      // 현재 경로가 shelter 하위가 아니라면 리다이렉트 수행
      if (
        userRole === "ROLE_SHELTER" &&
        !location.pathname.startsWith("/shelter")
      ) {
        navigate("/shelter");
      }
    }
  }, [dispatch, navigate, location.pathname]);
  

  const handleLogout = () => {
    api
      .get("/member/logout")
      .then((response) => {
        toast.success("로그아웃이 완료되었습니다.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userProfile");
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃 오류:", error);
        toast.error("로그아웃 중 오류가 발생했습니다.");
      });
  };

  // 사용자가 보호소 계정이면 Header, Footer를 렌더링하지 않음
  const showLayout = !(isLoggedIn && role === "ROLE_SHELTER");

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {showLayout && (
        <Header
          isLoggedIn={isLoggedIn}
          userName={userName}
          userProfile={userProfile}
          handleLogout={handleLogout}
        />
      )}
      <AppRouter />
      {showLayout && <Footer />}
    </>
  );
}

export default App;
