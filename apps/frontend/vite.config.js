import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Encaminha chamadas /api para o backend Express durante o desenvolvimento.
    proxy: {
      '/api': 'http://localhost:3333',
    },
  },
})
