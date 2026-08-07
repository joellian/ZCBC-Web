import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Strapi's admin panel runs its own Vite on *:5173. It binds the IPv6
    // wildcard, so it answers 127.0.0.1 too and this server would silently
    // land on [::1]:5173 instead of failing. strictPort keeps that quiet
    // collision from happening again.
    port: 5174,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
