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
            src: './public/icons/android-launchericon-72-72.png',
            sizes: '72x72',
            type: 'jpg/png'
          },
          {
            src: './public/icons/android-launchericon-96-96.png',
            sizes: '96x96',
            type: 'jpg/png'
          },
          {
            src: './public/icons/android-launchericon-128-128.png',
            sizes: '128x128',
            type: 'jpg/png'
          },
          {
            src: './public/icons/android-launchericon-144-144.png',
            sizes: '144x144',
            type: 'jpg/png'
          },
          {
            src: './public/icons/android-launchericon-152-152.png',
            sizes: '152x152',
            type: 'jpg/png'
          },
          {
            src: './public/icons/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'jpg/png',
            purpose: 'maskable'
          },
          {
            src: './public/icons/android-launchericon-384-384.png',
            sizes: '384x384',
            type: 'jpg/png'
          },
          {
            src: './public/icons/android-launchericon-512-512.png',
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