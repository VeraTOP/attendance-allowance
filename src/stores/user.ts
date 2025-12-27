import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户信息类型定义
interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
  // 可以根据实际需求添加更多字段
}

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<UserInfo | null>(null)
  // 认证token
  const token = ref<string | null>(null)

  // 设置用户信息
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
    // 可以选择将用户信息存储到本地存储
    sessionStorage.setItem('a_userinfo', JSON.stringify(info))
  }

  // 设置token
  const setToken = (newToken: string) => {
    token.value = newToken
    // 将token存储到本地存储，实现持久化
    sessionStorage.setItem('a_token', newToken)
  }

  // 获取用户信息
  const getCurrentUser = () => {
    return userInfo.value
  }

  // 获取token
  const getToken = () => {
    return token.value
  }

  // 清除用户信息和token（登出）
  const clearUserInfo = () => {
    userInfo.value = null
    token.value = null
    sessionStorage.removeItem('a_userinfo')
    sessionStorage.removeItem('a_token')
  }

  // 初始化用户信息和token（从本地存储加载）
  const initUserInfo = () => {
    const savedToken = sessionStorage.getItem('a_token')
    const savedUserInfo = sessionStorage.getItem('a_userinfo')

    if (savedToken) {
      token.value = savedToken
    }

    if (savedUserInfo) {
      try {
        userInfo.value = JSON.parse(savedUserInfo)
      } catch (e) {
        console.error('Failed to parse userInfo from sessionStorage:', e)
        sessionStorage.removeItem('a_userinfo')
      }
    }
  }

  return {
    userInfo,
    token,
    setUserInfo,
    setToken,
    getCurrentUser,
    getToken,
    clearUserInfo,
    initUserInfo
  }
})