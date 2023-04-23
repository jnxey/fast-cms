import { fileURLToPath, URL } from 'node:url'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/resource-space/admin/',
  plugins: [vue(), vueSetupExtend()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: fileURLToPath(new URL('../assets/resource-space/admin/', import.meta.url))
  }
})
