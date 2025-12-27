<template lang="pug">
  #UserInfo(class="px-6 pt-8")
    div(class="flex justify-between items-center")
      div(class="text-white")
        p(class="text-sm")
          span(class="mr-1 opacity-80") {{t('welcomeBack')}}
          span(class="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse relative top-[-2px]")
        p(class="text-[2rem] font-bold ") {{userinfo.username}}
        p(class="flex items-center gap-1.5 mt-2 text-blue-50/90 bg-white/10 w-fit px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 shadow-sm transition-transform")
          van-icon(name="label-o")
          span {{userinfo.department}}
      div()
        div(class="w-14 h-14 rounded-full overflow-hidden border-2 border-white/40 bg-white/10 backdrop-blur-md overflow-hidden shadow-lg ring-2 ring-white/10 ring-offset-2 ring-offset-[#189bdc]")
          van-image(:src="userinfo.sex === '1' ? maleAvatar : femaleAvatar" fit="cover" )
</template>
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useI18n } from '@/i18n'
import { useUserStore } from '@/stores/user'
import femaleAvatar from '@/assets/images/female.svg'
import maleAvatar from '@/assets/images/male.svg'

// import { Button as VanButton, Image as VanImage } from 'vant'

const { t } = useI18n()
const userStore = useUserStore()

const userinfo = computed(() => userStore.userInfo)
// // 模拟登录函数
// const handleLogin = () => {
//   // 这里应该调用实际的登录API
//   // 模拟登录成功后设置用户信息和token
//   const mockUserInfo = {
//     id: 1,
//     username: '测试用户',
//     email: 'test@example.com',
//     avatar: 'https://picsum.photos/200/200'
//   }

//   const mockToken = 'mock-jwt-token-123456'

//   userStore.setUserInfo(mockUserInfo)
//   userStore.setToken(mockToken)

//   console.log('登录成功:', userStore.userInfo, userStore.token)
// }

// 组件挂载时初始化用户信息（从本地存储加载）
onMounted(() => {
  userStore.initUserInfo()
})
</script>

<style scoped lang="scss">
.user-info-container {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.user-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;

  :deep(.van-image) {
    width: 80px;
    height: 80px;
  }

  .avatar-placeholder {
    width: 80px;
    height: 80px;
    background-color: #0ea5e9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }
}

.user-details {
  text-align: center;
  margin-bottom: 16px;

  .username {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .email {
    font-size: 14px;
    color: #666;
  }
}

.no-user-info {
  text-align: center;
  padding: 24px;

  p {
    margin-bottom: 16px;
    color: #666;
  }
}
</style>
