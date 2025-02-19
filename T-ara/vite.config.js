// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      [/^\/(member|api|donation|animal|diary|campaigns|shelter|list|walk)/]: {
        target: "http://localhost:8090",
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          }
        },
      },
    },
  },
});
