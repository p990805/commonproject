// api.js 또는 직접 axios 호출 시
import axios from 'axios';



const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});

console.log("VITE_API_BASE_URL", import.meta.env.VITE_API_BASE_URL);

export default api;
