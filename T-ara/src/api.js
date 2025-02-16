// src/api.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import { isTokenExpired } from './utils/token';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

console.log("VITE_API_BASE_URL", import.meta.env.VITE_API_BASE_URL);

// 요청 인터셉터: 토큰 만료 시간이 60초 미만이면 /reissue 호출 후 Authorization 헤더 업데이트
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("authToken"); // "Bearer ..." 형식으로 저장되어 있다고 가정
    if (token) {
      // 토큰에서 Bearer 접두어 제거
      const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;
      try {
        const decoded = jwtDecode(actualToken);
        const currentTime = Date.now() / 1000; // 초 단위
        // 토큰 만료 시간까지 남은 시간이 60초 미만이면 reissue 호출
        if (decoded.exp - currentTime < 60) {
          try {
            // 재발급 요청: 재발급 엔드포인트는 인터셉터의 영향을 피하기 위해 기본 axios 인스턴스를 사용
            const reissueResponse = await axios.get("/member/reissue", {
              baseURL: import.meta.env.VITE_API_BASE_URL,
              withCredentials: true,
            });
            const newToken =
              reissueResponse.headers.authorization ||
              reissueResponse.headers["Authorization"];
            if (newToken) {
              localStorage.setItem("authToken", newToken);
              config.headers.Authorization = newToken;
              console.log("토큰 재발급 성공:", newToken);
            } else {
              console.warn("새 토큰이 반환되지 않았습니다.");
              config.headers.Authorization = token;
            }
          } catch (reissueError) {
            console.error("토큰 재발급 실패:", reissueError);
            // 재발급 실패 시 기존 토큰 사용 또는 로그아웃 처리할 수 있음
            config.headers.Authorization = token;
          }
        } else {
          // 만료 임박이 아니라면 기존 토큰 사용
          config.headers.Authorization = token;
        }
      } catch (decodeError) {
        console.error("토큰 디코딩 실패:", decodeError);
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 Unauthorized 응답 시 로그아웃 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 비밀번호 확인 요청은 제외
      if (
        error.response.config &&
        error.response.config.url === '/member/passwordcheck'
      ) {
        return Promise.reject(error);
      }
      alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("userId");
      // 보호소 정보 제거
      localStorage.removeItem("shelterId");
      localStorage.removeItem("shelterName");
      localStorage.removeItem("cityCategoryId");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
