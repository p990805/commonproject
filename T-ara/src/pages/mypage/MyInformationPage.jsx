// src/pages/mypage/MyInformationPage.jsx
import MyPageLayout from "../../components/common/MyPageLayout";
import MyInformation from "../../components/mypage/MyInformation";

const MyInformationPage = () => {
  return (
    <MyPageLayout title="회원정보">
      <MyInformation />
    </MyPageLayout>
  );
};

export default MyInformationPage;
