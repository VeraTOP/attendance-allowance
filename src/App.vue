<template lang="pug">
van-config-provider(:theme="currentTheme")
  #app
    van-sticky
      van-nav-bar(v-if="isNavBar" :title="title" left-arrow  @click-left="onClickLeft")
    router-view
    van-tabbar(v-if="isTabbar" v-model="active")
      van-tabbar-item(v-for="(item, i) in tabList" :key="item.name" :name="i" :icon="item.icon" :to="item.link") {{ t(item.name) }}
</template>

<script setup lang="ts">
import { useI18n } from '@/i18n'
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const userStore = useUserStore()

// 响应式变量存储当前主题
const currentTheme = ref('light')
const active = ref(0)
const tabList = ref([
  {
    labels: '首页',
    icon: 'home-o',
    name: 'home',
    link: '/home',
  },
  {
    labels: '统计',
    icon: 'notes-o',
    name: 'statistics',
    link: '/statistics',
  },
  {
    labels: '我的',
    icon: 'contact-o',
    name: 'profile',
    link: '/profile',
  },
])

/**
 * 监听当前路由变化
 */
const router = useRouter()
const route = useRoute()

// 响应式变量存储是否显示底部导航栏
const isTabbar = ref(false)
const isNavBar = ref(false)
const title = ref('')

// 监听路由变化
watch(() => route, (val: any) => {
  console.log('当前路由路径:', val)
  if(val) {
    init(val)
  }
}, {
  deep: true,
})
const init = (val: any) => {
  active.value = tabList.value.findIndex(item => item.link === val.path)
  isTabbar.value = val?.meta?.isTabbar || false
  isNavBar.value = val?.meta?.isNavbar
  if (val?.meta?.key) title.value = document.title = t(val?.meta?.key)
}

const onClickLeft = () => {
  router.back()
}
// 模拟登录函数
const handleLogin = () => {
  // 这里应该调用实际的登录API
  // 模拟登录成功后设置用户信息和token
  const mockUserInfo = {
    id: 1,
    username: '张伟',
    email: 'test@example.com',
    avatar: 'https://picsum.photos/200/200',
    sex: '1',
    department: '高级开发工程师'
  }

  const mockToken = 'mock-jwt-token-123456'

  userStore.setUserInfo(mockUserInfo)
  userStore.setToken(mockToken)

  console.log('登录成功:', userStore.userInfo, userStore.token)
}
onMounted(() => {
  init(route)
  handleLogin()
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
.van-tabbar-item__icon {
  padding: 0.625rem 0.375rem;
}
.van-tabbar-item--active .van-tabbar-item__icon {
  background-color: var(--van-blue-lightest);
  border-radius: 1rem;
}
</style>