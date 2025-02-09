import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/member": {
        target: "https://i12c201.duckdns.org:8090", // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "https://i12c201.duckdns.org:8090",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
