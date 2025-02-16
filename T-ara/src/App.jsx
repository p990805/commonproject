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
import { jwtDecode } from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userName, userProfile, role } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // "Bearer " 접두어가 있다면 제거
      const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;
      try {
        const decoded = jwtDecode(actualToken);
        const userRole = decoded.role; // 예: "ROLE_SHELTER" 또는 "ROLE_USER"
        
        if (userRole === "ROLE_USER") {
          // 개인회원 로그인일 경우에만 /member/myinfo 호출
          api.get("/member/myinfo", {
            headers: { Authorization: token },
          })
            .then((response) => {
              console.log(response.data);
              // 응답이 { user: { name, profileImg, ... } } 형태라고 가정합니다.
              const { name, profileImg } = response.data.user;
              // 프로필 이미지가 없으면 기본값 처리
              const finalProfileImg = profileImg ? profileImg : "/assets/placeholder.png";
              // Redux 상태 업데이트
              dispatch(
                loginSuccess({
                  token,
                  userName: name,
                  userProfile: finalProfileImg,
                  role: userRole,
                  userId: response.data.user.userId,
                })
              );
            })
            .catch((error) => {
              console.error("사용자 정보 로드 실패:", error);
            });
        } else if (userRole === "ROLE_SHELTER") {
          // 보호소 로그인인 경우, 별도의 API 호출 없이 decoded 토큰(또는 기본값)으로 처리
          // decoded 토큰에 name, profileImg 등이 있다면 사용하고, 없다면 기본값을 설정합니다.
          const name = decoded.name || "보호소 사용자";
          const profileImg = decoded.profileImg || "/assets/placeholder.png";
          const userId = decoded.userId || ""; // 토큰에 userId가 없다면, 백엔드 로그인 응답에 shelter 데이터에 포함되어 있어야 함.
          dispatch(
            loginSuccess({
              token,
              userName: name,
              userProfile: profileImg,
              role: userRole,
              userId,
            })
          );
          // 보호소 계정이면 보호소 페이지로 리다이렉트
          if (!window.location.pathname.startsWith("/shelter")) {
            navigate("/shelter");
          }
        }
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    api
      .get("/member/logout")
      .then(() => {
        toast.success("로그아웃이 완료되었습니다.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("userId");
        localStorage.removeItem("shelterId");
        localStorage.removeItem("shelterName");
        localStorage.removeItem("cityCategoryId");

        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃 오류:", error);
        toast.error("로그아웃 중 오류가 발생했습니다.");
      });
  };

  // 보호소 계정이면 Header, Footer 렌더링하지 않음
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
          userProfile={userProfile}  // 이 값은 전체 URL 또는 파일 키일 수 있음
          handleLogout={handleLogout}
        />
      )}
      <AppRouter />
      {showLayout && <Footer />}
    </>
  );
}

export default App;
