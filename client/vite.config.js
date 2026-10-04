import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // En desarrollo, las llamadas a /api van al backend de Express (sin CORS)
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
