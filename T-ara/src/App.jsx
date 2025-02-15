// src/App.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./Router";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess, logout } from "./features/auth/authSlice";
import { jwtDecode } from "jwt-decode"; // default export

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userName, userProfile, role } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // "Bearer " 접두어 제거
      const actualToken = token.startsWith("Bearer ")
        ? token.slice(7)
        : token;
      try {
        const decoded = jwtDecode(actualToken);
        const userRole = decoded.role; // 예: "ROLE_SHELTER" 또는 "ROLE_USER"
        const loginId = decoded.sub; // 토큰에 loginId가 포함되어 있다고 가정 (예: sub 필드)
        // 사용자 정보를 백엔드에서 가져옵니다.
        api.get(`/member/myinfo`)
          .then((response) => {
            console.log(response.data);
            // 응답이 { user: { name, profileImg, ... } } 형태인 경우
            const { name, profileImg } = response.data.user;
            // 프로필 이미지가 없으면 기본값 사용
            const finalProfileImg = profileImg ? profileImg : "/assets/placeholder.png";
            // Redux 상태 업데이트
            dispatch(
              loginSuccess({
                token,
                userName: name,
                userProfile: finalProfileImg,
                role: userRole,
              })
            );
            // 보호소 계정이면 보호소 페이지로 리다이렉트
            if (userRole === "ROLE_SHELTER" && !window.location.pathname.startsWith("/shelter")) {
              navigate("/shelter");
            }
          })
          .catch((error) => {
            console.error("사용자 정보 로드 실패:", error);
          });
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, [dispatch, navigate]);

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

  // 보호소 계정이면 Header, Footer를 렌더링하지 않음
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
