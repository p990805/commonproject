// src/Router.jsx
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ShelterProtectedRoute from "./components/ShelterProtectedRoute";

// 필요한 페이지들을 lazy 로딩합니다.
const MainPage = lazy(() => import("./pages/MainPage"));
const LoginPageWrapper = lazy(() => import("./pages/LoginPageWrapper"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Individual = lazy(() => import("./components/signup/Individual/Individual"));
const Institution = lazy(() => import("./components/signup/Institution/Institution"));
const SuccessfulSignup = lazy(() => import("./components/signup/SuccessfulSignup"));
const ShelterPage = lazy(() => import("./pages/ShelterPage"));
//const LocationsPage = lazy(() => import("./pages/LocationsPage"));
const NoticePage = lazy(() => import("./pages/community/NoticePage"));
const BoardPage = lazy(() => import("./pages/community/BoardPage"));
const FAQPage = lazy(() => import("./pages/community/FAQPage"));
const InquiryPage = lazy(() => import("./pages/community/InquiryPage"));
const ModifyInquiryPage = lazy(() => import("./pages/community/ModifyInquiryPage"));
const BoardDetailPage = lazy(() => import("./pages/community/BoardDetailPage"));
const BoardEditPage = lazy(() => import("./pages/community/BoardEditPage"));
const NoticeDetailPage = lazy(() => import("./pages/community/NoticeDetailPage"));

{/* 마이 페이지 영역 */}
const MyPage = lazy(() => import("./pages/MyPage"));
const MyInformationPage = lazy(() => import("./pages/mypage/MyInformationPage"));
const WithdrawPage = lazy(() => import("./pages/mypage/WithdrawPage"));
const RegularSponPage = lazy(() => import("./pages/mypage/RegularSponPage"));
const TemporarySponPage = lazy(() => import("./pages/mypage/TemporarySponPage"));
const CampaignSponPage = lazy(() => import("./pages/mypage/CampaignSponPage"));
const WorkJournalPage = lazy(() => import("./pages/mypage/WorkJournalPage"));
const PhotocardPage = lazy(() => import("./pages/mypage/PhotocardPage"));



const ShelterDonation = lazy(() => import("./components/shelter/ShelterDonation"));
const ShelterDonationUsage = lazy(() => import("./components/shelter/ShelterDonationUsage"));
const ShelterUsageRegister = lazy(() => import("./components/shelter/ShelterUsageRegister"));
const ShelterCampaign = lazy(() => import("./components/shelter/ShelterCampaign"));
const ShelterCampaignRegister = lazy(() => import("./components/shelter/ShelterCampaignRegister"));
const ShelterAnimal = lazy(() => import("./components/shelter/ShelterAnimal"));
const ShelterAnimalRegister = lazy(() => import("./components/shelter/ShelterAnimalRegister"));
const ShelterAnimalDiary = lazy(() => import("./components/shelter/ShelterAnimalDiary"));
const ShelterAnimalDiaryRegister = lazy(() => import("./components/shelter/ShelterAnimalDiaryRegister"));
const ShelterWalkReservation = lazy(() => import("./components/shelter/ShelterWalkReservation"));
const ShelterPhotoUpload = lazy(() => import("./components/shelter/ShelterPhotoUpload"));
const ShelterNotice = lazy(() => import("./components/shelter/ShelterNotice"));
const ShelterNoticeRegister = lazy(() => import("./components/shelter/ShelterNoticeRegister"));
const ShelterInfo = lazy(() => import("./components/shelter/ShelterInfo"));
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
const StartLive = lazy(() => import("./components/shelter/streaming/StartLive"))
const DailyLivePage = lazy(() => import("./pages/live/DailyLivePage"));
const MySponLivePage =lazy(() => import("./pages/live/MySponLivePage"));
const LivePlayer = lazy(() => import("./components/live/LivePlayer"));
const EmailReject = lazy(() => import("./pages/footer/EmailReject"));
const Privacy = lazy(() => import("./pages/footer/Privacy"));
const TermsOfUse = lazy(() => import("./pages/footer/TermsOfUse"));
const PasswordCheckPage = lazy(() => import("./pages/mypage/PasswordCheckPage"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const ShelterNoticeEdit = lazy(() => import("./components/shelter/notice/ShelterNoticeEdit"));


const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPageWrapper />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/individual" element={<Individual />} />
        <Route path="/signup/institution" element={<Institution />} />
        <Route path="/signup/successfulsignup" element={<SuccessfulSignup />} />
        <Route path="/shelters" element={<ShelterPage />} />
        <Route path="/community/notice" element={<NoticePage />} />
        <Route path="/community/board" element={<BoardPage />} />
        <Route path="/community/faq" element={<FAQPage />} />
        <Route path="/community/inquiry" element={<InquiryPage />} />
        <Route path="/community/inquiry/modifyinfo/:inquiryId" element={<ModifyInquiryPage />}/>
        <Route path="/community/board/:communityId" element={<BoardDetailPage />}/>
        <Route path="/community/board/:communityId/edit" element={<BoardEditPage />}/>
        <Route path="/community/notice/:noticeId" element={<NoticeDetailPage />}/>

        {/* 로그인한 사용자만 접근 가능한 페이지 */}
        <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>}/>
        <Route path="/mypage/information" element={<ProtectedRoute><MyInformationPage /></ProtectedRoute>}/>
        <Route path="/mypage/withdraw" element={<ProtectedRoute><WithdrawPage /></ProtectedRoute>}/>
        <Route path="/mypage/regularspon" element={<ProtectedRoute><RegularSponPage /></ProtectedRoute>}/>
        <Route path="/mypage/temporaryspon" element={<ProtectedRoute><TemporarySponPage /></ProtectedRoute>}/>
        <Route path="/mypage/campaignspon" element={<ProtectedRoute><CampaignSponPage /></ProtectedRoute>}/>
        <Route path="/mypage/workjournal" element={<ProtectedRoute><WorkJournalPage /></ProtectedRoute>}/>
        <Route path="/mypage/photocard" element={<ProtectedRoute><PhotocardPage /></ProtectedRoute>}/>
        <Route path="/mypage/passwordcheck" element={<ProtectedRoute><PasswordCheckPage /></ProtectedRoute>}/>

        {/* 보호소 관련 페이지는 ShelterProtectedRoute로 보호 */}
        <Route path="/shelter" element={<ShelterProtectedRoute><ShelterDonation /></ShelterProtectedRoute>}
        />
        <Route path="/shelter/usage" element={<ShelterProtectedRoute><ShelterDonationUsage /></ShelterProtectedRoute>}/>
        <Route path="/shelter/usage-register" element={<ShelterProtectedRoute><ShelterUsageRegister /></ShelterProtectedRoute>}/>
        <Route path="/shelter/campaign" element={<ShelterProtectedRoute><ShelterCampaign /></ShelterProtectedRoute>}/>
        <Route path="/shelter/campaign-register" element={<ShelterProtectedRoute><ShelterCampaignRegister /></ShelterProtectedRoute>}/>
        <Route path="/shelter/animal" element={<ShelterProtectedRoute><ShelterAnimal /></ShelterProtectedRoute>}/>
        <Route path="/shelter/animal-register" element={<ShelterProtectedRoute><ShelterAnimalRegister /></ShelterProtectedRoute>}/>
        <Route path="/shelter/animal-diary" element={<ShelterProtectedRoute><ShelterAnimalDiary /></ShelterProtectedRoute>}/>
        <Route path="/shelter/diary-register" element={<ShelterProtectedRoute><ShelterAnimalDiaryRegister /></ShelterProtectedRoute>}/>
        <Route path="/shelter/walk" element={
            // <ShelterProtectedRoute>
              <ShelterWalkReservation />
            // </ShelterProtectedRoute>
          }
        />
        <Route path="/shelter/photo" element={
            // <ShelterProtectedRoute>
              <ShelterPhotoUpload />
            // </ShelterProtectedRoute>
          }
        />
        <Route path="/shelter/notice" element={<ShelterProtectedRoute><ShelterNotice /></ShelterProtectedRoute>}/>
        <Route path="/shelter/notice-register" element={<ShelterProtectedRoute><ShelterNoticeRegister /></ShelterProtectedRoute>}/>
        <Route path="/shelter/notice/edit/:noticeId" element={<ShelterProtectedRoute><ShelterNoticeEdit /></ShelterProtectedRoute>}/>
        <Route path="/shelter/live" element={<ShelterProtectedRoute><StartLive /></ShelterProtectedRoute>}/>
        <Route path="/shelter/info" element={<ShelterProtectedRoute><ShelterInfo /></ShelterProtectedRoute>}/>

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
        <Route path="/live/daily" element={<DailyLivePage />} />
        <Route path="/live/myanimal" element={<MySponLivePage />} />
        <Route path="/live/:streamId" element={<LivePlayer />} />
        <Route path="/emailreject" element={<EmailReject/>} />
        <Route path="/privacy" element={<Privacy/>} />
        <Route path="/terms" element={<TermsOfUse/>} />
       

        {/* 만약 존재하지 않는 경로라면 메인 페이지로 리다이렉트 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
