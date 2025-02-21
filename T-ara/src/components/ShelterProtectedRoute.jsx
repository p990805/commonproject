import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShelterProtectedRoute = ({ children }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  
  // 로그인하지 않았으면 로그인 페이지로 이동
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // 보호소 계정이 아니면 메인 페이지(또는 원하는 경로)로 이동
  if (role !== "ROLE_SHELTER") {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ShelterProtectedRoute;
