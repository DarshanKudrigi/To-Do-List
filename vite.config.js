import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for a simple React app
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
