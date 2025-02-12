// src/Router.jsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";


// 필요한 페이지들을 lazy 로딩합니다.
const MainPage = lazy(() => import("./pages/MainPage"));
// const LoginPage = lazy(() => import("./pages/LoginPage"));
const LoginPageWrapper = lazy(() => import("./pages/LoginPageWrapper"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const IndividualSignup = lazy(() => import("./components/signup/IndividualSignup"));
const InstitutionSignup = lazy(() => import("./components/signup/InstitutionSignup"));
const SuccessfulSignup = lazy(() => import("./components/signup/SuccessfulSignup"));
const ShelterPage = lazy(() => import("./pages/ShelterPage"));
const LocationsPage = lazy(() => import("./pages/LocationsPage"));
//const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const NoticePage = lazy(() => import("./pages/community/NoticePage"));
const BoardPage = lazy(() => import("./pages/community/BoardPage"));
const FAQPage = lazy(() => import("./pages/community/FAQPage"));
const InquiryPage = lazy(() => import("./pages/community/InquiryPage"));
const ModifyInquiryPage = lazy(() => import("./pages/community/ModifyInquiryPage"));
const BoardDetailPage = lazy(() => import("./pages/community/BoardDetailPage"));
const BoardEditPage = lazy(() => import("./pages/community/BoardEditPage"))


const MyPage = lazy(() => import("./pages/MyPage"));
const ShelterDonation = lazy(() => import("./components/shelter/ShelterDonation"));
const ShelterDonationUsage = lazy(() => import("./components/shelter/ShelterDonationUsage"));
const ShelterCampaign = lazy(() => import("./components/shelter/ShelterCampaign"));
const ShelterCampaignRegister = lazy(() => import("./components/shelter/ShelterCampaignRegister"));
const ShelterAnimal = lazy(() => import("./components/shelter/ShelterAnimal"));
const ShelterAnimalRegister = lazy(() => import("./components/shelter/ShelterAnimalResiter"));
const ShelterAnimalDiary = lazy(() => import("./components/shelter/ShelterAnimalDiary"));
const ShelterWalkReservation = lazy(() => import("./components/shelter/ShelterWalkReservation"));
const ShelterFinder = lazy(() => import("./components/map/ShelterFinder"));
const ShelterDetailPage = lazy(() => import("./pages/ShelterDetailPage"));
const WalkReservationPage = lazy(() => import("./pages/WalkReservationPage"));
const LivePage = lazy(() => import("./pages/LivePage"));
const DonationPage = lazy(() => import("./pages/DonationPage"));
const CampaignPage = lazy(() => import("./pages/CampaignPage"));
const CampaignDetail = lazy(() => import("./components/campaign/CampaignDetail"));
const CampaignDonation = lazy(() => import("./components/campaign/CampaignDonation"));
const CampaignDonationSuccess = lazy(() => import("./components/campaign/CampaignDonationSuccess"));
const AnimalPage = lazy(() => import("./pages/AnimalPage"));
const AnimalDetail = lazy(() => import("./components/animal/AnimalDetail"));
const CommunityDetail = lazy(() => import("./components/community/CommunityDetail"));
const AlertPage = lazy(() => import("./pages/AlertPage"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPageWrapper />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/individual" element={<IndividualSignup />} />
        <Route path="/signup/institution" element={<InstitutionSignup />} />
        <Route path="/signup/successfulsignup" element={<SuccessfulSignup />} />
        <Route path="/shelters" element={<ShelterPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/community/notice" element={<NoticePage />} />
        <Route path="/community/board" element={<BoardPage />} />
        <Route path="/community/faq" element={<FAQPage />} />
        <Route path="/community/inquiry" element={<InquiryPage />} />
        <Route path="/community/inquiry/modifyinfo/:inquiryId" element={<ModifyInquiryPage />} />
        <Route path="/community/board/:communityId" element={<BoardDetailPage />} />
        <Route path="/community/board/:communityId/edit" element={<BoardEditPage />} />
        {/* 로그인한 사용자만 접근 가능한 페이지 */}
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route path="/shelter" element={<ShelterDonation />} />
        <Route path="/shelter/usage" element={<ShelterDonationUsage />} />
        <Route path="/shelter/campaign" element={<ShelterCampaign />} />
        <Route path="/shelter/campaign-register" element={<ShelterCampaignRegister />} />
        <Route path="/shelter/animal" element={<ShelterAnimal />} />
        <Route path="/shelter/animal-register" element={<ShelterAnimalRegister />} />
        <Route path="/shelter/animal-diary" element={<ShelterAnimalDiary />} />
        <Route path="/shelter/walk" element={<ShelterWalkReservation />} />
        <Route path="/shelter-finder" element={<ShelterFinder />} />
        <Route path="/shelter/:id" element={<ShelterDetailPage />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/reservation" element={<WalkReservationPage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/campaign" element={<CampaignPage />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/campaign/donation" element={<CampaignDonation />} />
        <Route path="/campaign/success" element={<CampaignDonationSuccess />} />
        <Route path="/animal" element={<AnimalPage />} />
        <Route path="/animal/:id" element={<AnimalDetail />} />
        <Route path="/community/detail/:id" element={<CommunityDetail />} />
        <Route path="/alert" element={<AlertPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
