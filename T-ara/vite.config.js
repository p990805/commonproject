import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/member": {
        target: "http://localhost:8090", // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:8090",
        changeOrigin: true,
        secure: false,
      },
      "/donation": {
        target: "http://localhost:8090",
        changeOrigin: true,
        secure: false,
      },
      "/animal": {
        target: "http://localhost:8090",
        changeOrigin: true,
        secure: false,
      },
      // "/shelter" 경로는 클라이언트 라우팅용으로 사용되므로,
      // 브라우저가 HTML을 요청할 때는 index.html을 반환하도록 bypass 함수를 추가합니다.
      "/shelter": {
        target: "http://localhost:8090",
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
            // HTML 요청이면 프록시를 우회하여 index.html 반환
            return "/index.html";
          }
        },
      },
      "/diary": {
        target: "http://localhost:8090",
        changeOrigin: true,
        secure: false,
      },
      "/campaigns": {
        target: "http://localhost:8090",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
