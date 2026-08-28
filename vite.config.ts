import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/GeumCha/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    cors: true,
    allowedHosts: true,
  },
})
