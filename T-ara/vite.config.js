import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
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
      "/shelter": {
        target: "http://localhost:8090",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
