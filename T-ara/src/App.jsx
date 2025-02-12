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

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userName, userProfile } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUserName = localStorage.getItem("userName") || "사용자";
      const storedUserProfile =
        localStorage.getItem("userProfile") || "/assets/default-profile.png";
      dispatch(
        loginSuccess({
          token,
          userName: storedUserName,
          userProfile: storedUserProfile,
        })
      );
    }
  }, [dispatch]);

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
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        userProfile={userProfile}
        handleLogout={handleLogout}
      />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
