import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request starting with /api will be redirected to the express server
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      }
    }
  }
})