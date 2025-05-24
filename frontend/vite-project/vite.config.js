import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server:{ // change port on client
    port: 8080
  },
  plugins: [react(),tailwindcss()],
})
