import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/api': {
        target: 'https://life-insurance-server.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
