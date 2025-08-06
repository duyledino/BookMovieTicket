import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  server:{
    proxy:{
      '/api':{
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost",
      }
    }
  }
});
