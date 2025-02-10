// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Individual from "./components/signup/IndividualSignup";
import Institution from "./components/signup/InstitutionSignup";
import SuccessfulSignup from "./components/signup/SuccessfulSignup";
import ShelterPage from "./pages/ShelterPage";
import LocationsPage from "./pages/LocationsPage";
import CommunityPage from "./pages/CommunityPage";
import MyPage from "./pages/MyPage";
import ShelterDonation from "./components/shelter/ShelterDonation";
import ShelterDonationUsage from "./components/shelter/ShelterDonationUsage";
import ShelterAnimal from "./components/shelter/ShelterAnimal";
import ShelterAnimalRegister from "./components/shelter/ShelterAnimalResiter";
import ShelterAnimalDiary from "./components/shelter/ShelterAnimalDiary";
import ShelterWalkReservation from "./components/shelter/ShelterWalkReservation";
import ShelterFinder from "./components/map/ShelterFinder";
import WalkReservationPage from "./pages/WalkReservationPage";
import LivePage from "./pages/LivePage";
import DonationPage from "./pages/DonationPage";
import CampaignPage from "./pages/CampaignPage";
import CampaignDetail from "./components/campaign/CampaignDetail";
import CampaignDonation from "./components/campaign/CampaignDonation";
import CampaignDonationSuccess from "./components/campaign/CampaignDonationSuccess";
import AnimalPage from "./pages/AnimalPage";
import AnimalDetail from "./components/animal/AnimalDetail";
import CommunityDetail from "./components/community/CommunityDetail";
import api from "./api"; // 미리 설정한 axios 인스턴스
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux 액션 (auth slice에서 만들어둔 액션)
// 예를 들어, authSlice에 loginSuccess, logout 액션이 있다고 가정합니다.
import { loginSuccess, logout } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Redux store에서 로그인 관련 상태를 가져옴
  const { isLoggedIn, userName, userProfile } = useSelector(
    (state) => state.auth
  );

  // 앱 초기 렌더 시 localStorage에 저장된 토큰이 있다면 Redux에 로그인 상태를 반영
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUserName = localStorage.getItem("userName") || "사용자";
      const storedUserProfile =
        localStorage.getItem("userProfile") || "/assets/default-profile.png";
      // Redux에 로그인 성공 액션 디스패치
      dispatch(
        loginSuccess({
          token,
          userName: storedUserName,
          userProfile: storedUserProfile,
        })
      );
    }
  }, [dispatch]);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    api
      .get("/member/logout")
      .then((response) => {
        toast.success("로그아웃이 완료되었습니다.");
        // 로컬 스토리지에서 제거
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userProfile");
        // Redux logout 액션 디스패치
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
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              onLoginSuccess={(token, userName, userProfile) => {
                localStorage.setItem("authToken", token);
                localStorage.setItem("userName", userName);
                localStorage.setItem("userProfile", userProfile);
                // Redux에 로그인 성공 액션 디스패치
                dispatch(
                  loginSuccess({ token, userName, userProfile })
                );
                navigate("/");
              }}
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/individual" element={<Individual />} />
        <Route path="/signup/institution" element={<Institution />} />
        <Route path="/signup/successfulsignup" element={<SuccessfulSignup />} />
        <Route path="/shelters" element={<ShelterPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/shelter" element={<ShelterDonation />} />
        <Route path="/shelter/usage" element={<ShelterDonationUsage />} />
        <Route path="/shelter/animal" element={<ShelterAnimal />} />
        <Route
          path="/shelter/animal-register"
          element={<ShelterAnimalRegister />}
        />
        <Route path="/shelter/animal-diary" element={<ShelterAnimalDiary />} />
        <Route path="/shelter/walk" element={<ShelterWalkReservation />} />
        <Route path="/shelterFinder" element={<ShelterFinder />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/reservation" element={<WalkReservationPage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/campaign" element={<CampaignPage />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/campaign/donation" element={<CampaignDonation />} />
        <Route path="/campaign/success" element={<CampaignDonationSuccess />} />
        <Route path="/animal" element={<AnimalPage />} />
        <Route path="/animal/:id" element={<AnimalDetail />} />
        <Route
          path="/community/detail/:id"
          element={<CommunityDetail />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
