import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for smaller build
    chunkSizeWarningLimit: 1600, // Increase chunk size warning limit
  },
  // Add base URL for proper routing in production
  base: './',
})