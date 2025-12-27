import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    watch: {
      // 确保所有文件都被监听
      usePolling: true,
      interval: 100,
      binaryInterval: 300
    },
    hmr: {
      // 确保热更新连接正常
      protocol: 'ws',
      port: 24678,
      clientPort: 24678
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/styles/variables.scss" as *;\n',
        quietDeps: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'pinia', 'vant'],
          'axios': ['axios']
        }
      }
    }
  }
})