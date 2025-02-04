// api.js 또는 직접 axios 호출 시
import axios from 'axios';

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  baseURL: "http://localhost:8090", // 백엔드 서버 주소 및 포트 설정
  withCredentials: true, 
});

export default api;
