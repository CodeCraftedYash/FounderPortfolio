import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['refined-unburned-railing.ngrok-free.dev']
  },
  plugins: [react()],
})
