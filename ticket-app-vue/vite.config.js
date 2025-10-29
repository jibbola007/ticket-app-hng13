import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '/shared-assets': path.resolve(__dirname, '../shared-assets'),
    },
  },
  server: {
    fs: {
      allow: [
        './',
        '../shared-assets', // ✅ allow vite to serve files outside src/public
      ],
    },
  },
})
