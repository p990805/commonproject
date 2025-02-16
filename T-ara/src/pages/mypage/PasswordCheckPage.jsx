import { useNavigate, useLocation } from 'react-router-dom';
import MyPageLayout from '../../components/common/MyPageLayout';
import CheckPassword from '../../components/mypage/CheckPassword';

const PasswordCheckPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state.redirectKey가 'information' 또는 'withdraw' 등으로 전달되었다고 가정
  const redirectKey = location.state?.redirectKey || 'default';

  const handlePasswordChecked = () => {
    // 만약 원래 요청했던 경로가 있다면 해당 경로로 이동합니다.
    if (location.state?.from) {
      if (redirectKey === 'information') {
        sessionStorage.setItem('isVerifiedInformation', 'true');
      } else if (redirectKey === 'withdraw') {
        sessionStorage.setItem('isVerifiedWithdraw', 'true');
      }
      navigate(location.state.from, { replace: true });
    } else {
      // 원래 요청 경로가 없다면 기존 로직대로 처리
      if (redirectKey === 'information') {
        sessionStorage.setItem('isVerifiedInformation', 'true');
        navigate('/mypage/information', { replace: true });
      } else if (redirectKey === 'withdraw') {
        sessionStorage.setItem('isVerifiedWithdraw', 'true');
        navigate('/mypage/withdraw', { replace: true });
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <MyPageLayout>
      <CheckPassword onPasswordChecked={handlePasswordChecked} />
    </MyPageLayout>
  );
};

export default PasswordCheckPage;
