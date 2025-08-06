import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_SERVER_URL || "http://localhost:8001",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost",
      }
    }
  }
});
