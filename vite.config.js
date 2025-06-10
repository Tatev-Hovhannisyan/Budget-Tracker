import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Budget-Tracker/', // 👈 добавь эту строку
  plugins: [react()],
})

