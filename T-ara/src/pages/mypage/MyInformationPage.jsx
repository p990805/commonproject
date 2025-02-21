import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageLayout from '../../components/common/MyPageLayout';
import MyInformation from '../../components/mypage/MyInformation';

const MyInformationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isVerified = sessionStorage.getItem('isVerifiedInformation') === 'true';
    if (!isVerified) {
      // 인증되지 않은 경우 비밀번호 확인 페이지로 이동하면서 redirectKey 전달
      navigate('/mypage/passwordcheck', { state: { redirectKey: 'information' }, replace: true });
    }

    // 페이지를 떠날 때 인증 플래그 제거
    return () => {
      sessionStorage.removeItem('isVerifiedInformation');
    };
  }, [navigate]);

  return (
    <MyPageLayout title="회원정보">
      <MyInformation />
    </MyPageLayout>
  );
};

export default MyInformationPage;
