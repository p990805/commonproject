// // src/pages/MyPage.jsx
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import MyPageLayout from "../components/common/MyPageLayout";
// import MyPageSidebar from "../components/common/MyPageSidebar";

// import MyCampaignSpon from "../components/mypage/MyCampaignSpon";
// import MyHome from "../components/mypage/MyHome";
// import MyInformation from "../components/mypage/MyInformation";
// import MyPhotoCard from "../components/mypage/MyPhotoCard";
// import MyRegularSpon from "../components/mypage/MyRegularSpon";
// import MyTemporarySpon from "../components/mypage/MyTemporarySpon";
// import MyWorkJournal from "../components/mypage/MyWorkJournal";
// import Withdraw from "../components/mypage/Withdraw";
// import CheckPassword from "../components/mypage/CheckPassword";

// const MyPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // localStorage에 저장된 탭 상태(없으면 'myhome')로 초기화
//   const initialTab = localStorage.getItem("activeTab") || "myhome";
//   const [activeTab, setActiveTab] = useState(initialTab);
//   const [pendingTab, setPendingTab] = useState(null); // 비밀번호 확인 후 이동할 탭

//   // URL 경로에 따라 activeTab을 동기화 (단, checkpassword 상태에서는 유지)
//   useEffect(() => {
//     // 각 경로에 해당하는 탭 키 매핑
//     const pathToTab = {
//       "/mypage": "myhome",
//       "/mypage/information": "myinformation",
//       "/mypage/withdraw": "withdraw",
//       "/mypage/regularspon": "myregularspon",
//       "/mypage/temporaryspon": "mytemporaryspon",
//       "/mypage/campaignspon": "mycampaignspon",
//       "/mypage/workjournal": "myworkjournal",
//       "/mypage/photocard": "myphotocard",
//     };

//     const newTab = pathToTab[location.pathname];
//     if (newTab && newTab !== activeTab && activeTab !== "checkpassword") {
//       setActiveTab(newTab);
//       localStorage.setItem("activeTab", newTab);
//     }
//   }, [location.pathname, activeTab]);

//   // 탭별 컴포넌트 매핑
//   const components = {
//     myhome: MyHome,
//     myinformation: MyInformation,
//     myphotocard: MyPhotoCard,
//     myworkjournal: MyWorkJournal,
//     mycampaignspon: MyCampaignSpon,
//     myregularspon: MyRegularSpon,
//     mytemporaryspon: MyTemporarySpon,
//     withdraw: Withdraw,
//     checkpassword: CheckPassword,
//   };

//   // 탭 키에 따른 URL 경로 매핑
//   const tabToPath = {
//     myhome: "/mypage",
//     myinformation: "/mypage/information",
//     withdraw: "/mypage/withdraw",
//     myregularspon: "/mypage/regularspon",
//     mytemporaryspon: "/mypage/temporaryspon",
//     mycampaignspon: "/mypage/campaignspon",
//     myworkjournal: "/mypage/workjournal",
//     myphotocard: "/mypage/photocard",
//   };

//   // 탭 전환 시 (비밀번호 확인이 필요한 탭은 별도 처리)
//   const handleTabChange = (tab) => {
//     if (tab === "myinformation" || tab === "withdraw") {
//       setPendingTab(tab);
//       setActiveTab("checkpassword");
//       // 비밀번호 확인 전환 시 URL은 현재 페이지를 유지하거나 별도 경로를 지정할 수 있습니다.
//       navigate("/mypage");
//     } else {
//       setActiveTab(tab);
//       localStorage.setItem("activeTab", tab);
//       navigate(tabToPath[tab]);
//     }
//   };

//   // 비밀번호 확인 성공 시 pendingTab으로 이동
//   const handlePasswordCheckSuccess = () => {
//     if (pendingTab) {
//       setActiveTab(pendingTab);
//       localStorage.setItem("activeTab", pendingTab);
//       navigate(tabToPath[pendingTab]);
//       setPendingTab(null);
//     }
//   };

//   const CurrentComponent = components[activeTab];

//   return (
//     <MyPageLayout
//       title="마이페이지"
//       sidebarMenu={
//         <MyPageSidebar activeTab={activeTab} onTabChange={handleTabChange} />
//       }
//     >
//       {activeTab === "checkpassword" ? (
//         <CheckPassword onPasswordChecked={handlePasswordCheckSuccess} />
//       ) : (
//         <CurrentComponent />
//       )}
//     </MyPageLayout>
//   );
// };

// export default MyPage;
