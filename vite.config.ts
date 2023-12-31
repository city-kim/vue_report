import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/vue_report/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/assets/scss/setup/_responsive.scss';
          @import './src/assets/scss/setup/_mixins.scss';
          @import './src/assets/scss/setup/chart.scss';
        `
      }
    }
  }
})
