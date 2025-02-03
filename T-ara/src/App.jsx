import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
import ShelterWalkReservation from "./components/shelter/ShelterWalkReservation";
import ShelterFinder from "./components/map/ShelterFinder";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [userName, setUserName] = useState(""); // 사용자 이름
  const [userProfile, setUserProfile] = useState(""); // 사용자 프로필 이미지
  const navigate = useNavigate();

  // 로그인 상태 초기화 (로컬 스토리지에서 가져오기)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUserName = localStorage.getItem("userName") || "사용자";
      const storedUserProfile =
        localStorage.getItem("userProfile") || "/assets/default-profile.png";
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setUserProfile(storedUserProfile);
    }
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setUserName("");
    setUserProfile("");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <>
      {/* Header에 상태와 핸들러 전달 */}
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
                // 로그인 성공 시 상태 업데이트
                localStorage.setItem("authToken", token);
                localStorage.setItem("userName", userName);
                localStorage.setItem("userProfile", userProfile);
                setIsLoggedIn(true);
                setUserName(userName);
                setUserProfile(userProfile);
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
        <Route path="/shelter/walk" element={<ShelterWalkReservation />} />
        <Route path="/shelterFinder" element={<ShelterFinder />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
