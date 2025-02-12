import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // Redux store에서 로그인 상태 확인
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // 로그인되어 있으면 자식 컴포넌트 렌더링, 아니면 로그인 페이지로 리다이렉트
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
