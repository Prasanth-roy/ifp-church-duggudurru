import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}']
      },
      manifest: {
        name: 'IFP Church Duggudurru',
        short_name: 'IFP Church',
        description: 'Worship, Testimony, Service',
        theme_color: '#4f46e5',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: './public/images/yt end logo.jpg',
            sizes: '72x72',
            type: 'jpg/png'
          },
          {
            src: './public/images/yt end logo.jpg',
            sizes: '96x96',
            type: 'jpg/png'
          },
          {
            src: './public/images/yt end logo.jpg',
            sizes: '128x128',
            type: 'jpg/png'
          },
          {
            src: './public/images/yt end logo.jpg',
            sizes: '144x144',
            type: 'jpg/png'
          },
          {
            src: './public/images/yt end logo.jpg',
            sizes: '152x152',
            type: 'jpg/png'
          },
          {
            src: './public/images/yt end logo.jpg',
            sizes: '192x192',
            type: 'jpg/png',
            purpose: 'maskable'
          },
          {
            src: './public/images/yt end logo.jpg',
            sizes: '384x384',
            type: 'jpg/png'
          },
          {
            src: './public/images/yt end logo.jpg',
            sizes: '512x512',
            type: 'jpg/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
})