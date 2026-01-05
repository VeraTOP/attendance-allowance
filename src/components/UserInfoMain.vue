<template lang="pug">
  //- #UserInfo(class="px-6 pt-8")
  div#UserInfoMain(class="relative pt-10 pb-8 px-6 flex flex-col items-center")
    div(class="relative group")
      div(class="h-24 w-24 rounded-full overflow-hidden border-[3px] border-white dark:border-[#1e293b] shadow-xl shadow-blue-500/20 bg-center bg-cover z-10 relative")
        van-image(:src="userinfo.sex === '1' ? maleAvatar : femaleAvatar" fit="cover" )
      div(class="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-green-500 border-[3px] border-white dark:border-[#1e293b] z-20 shadow-sm")
    div(class="mt-5 text-center relative z-10")
      h1(class="text-2xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight") {{userinfo.username}}
      p(class="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium") 欢迎回来，祝您工作愉快
      div(class="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-sm border border-blue-100 dark:border-slate-700")
        van-icon(name="idcard" size="18" color="var(--van-blue)")
        span(class="text-xs font-semibold text-slate-600 dark:text-slate-300") {{userinfo.department}}
        span(class="w-px h-3 bg-slate-300 dark:bg-slate-600 mx-1s")
        span(class="text-xs font-mono text-slate-500 dark:text-slate-400") 学工号: {{userinfo.sno}}
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

// 组件挂载时初始化用户信息（从本地存储加载）
onMounted(() => {
  userStore.initUserInfo()
})
</script>

<style scoped lang="scss">
</style>
