<template lang="pug">
van-config-provider(:theme="currentTheme")
  #app
    router-view
</template>

<script setup lang="ts">
import { useI18n } from '@/i18n'
import { ref, onMounted } from 'vue'

useI18n()

// 响应式变量存储当前主题
const currentTheme = ref('light')

onMounted(() => {
  // 获取浏览器初始颜色模式
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  currentTheme.value = mediaQuery.matches ? 'dark' : 'light'

  // 监听浏览器颜色模式变化
  const handleThemeChange = (e: MediaQueryListEvent) => {
    currentTheme.value = e.matches ? 'dark' : 'light'
  }

  // 添加事件监听器
  mediaQuery.addEventListener('change', handleThemeChange)
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f7fa;
}

#app {
  min-height: 100vh;
}
</style>