// src/api.js
import axios from 'axios';
import { isTokenExpired } from './utils/token';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

console.log("VITE_API_BASE_URL", import.meta.env.VITE_API_BASE_URL);

// 요청 인터셉터: localStorage에서 토큰을 읽어 Authorization 헤더에 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // 이미 "Bearer ..." 형식으로 저장되어 있다고 가정
    if (token) {
      if (isTokenExpired(token)) {
        console.warn("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        // 만료된 경우 백엔드에서 401 응답을 보내거나 추가 처리를 할 수 있습니다.
      }
      config.headers.Authorization = token;
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
      // 비밀번호 확인 요청의 경우 자동 로그아웃 처리 건너뛰기
      if (
        error.response.config &&
        error.response.config.url === '/member/passwordcheck'
      ) {
        return Promise.reject(error);
      }
      // 그 외의 경우 자동 로그아웃 처리
      alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userProfile");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
