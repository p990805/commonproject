import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageLayout from '../../components/common/MyPageLayout';
import Withdraw from '../../components/mypage/Withdraw';

const WithdrawPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isVerified = sessionStorage.getItem('isVerifiedWithdraw') === 'true';
    if (!isVerified) {
      // 인증되지 않은 경우 비밀번호 확인 페이지로 이동하면서 redirectKey 전달
      navigate('/mypage/passwordcheck', { state: { redirectKey: 'withdraw' }, replace: true });
    }

    // 페이지를 떠날 때 인증 플래그 제거
    return () => {
      sessionStorage.removeItem('isVerifiedWithdraw');
    };
  }, [navigate]);

  return (
    <MyPageLayout>
      <Withdraw />
    </MyPageLayout>
  );
};

export default WithdrawPage;
