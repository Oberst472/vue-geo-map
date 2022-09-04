import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcss from './postcss.config.cjs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '/vue-geo-map/',
  css: {
    postcss
  }
})
