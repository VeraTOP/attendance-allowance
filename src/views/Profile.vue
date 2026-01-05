<template lang="pug">
div
  div(class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl")
    div(class="relative w-full bg-white dark:bg-[var(-van-blue)] rounded-b-[2.5rem] shadow-[0_8px_30px_-8px_rgba(14,165,233,0.15)] overflow-hidden pb-3")
      div(class="absolute inset-0 bg-gradient-to-b from-sky-200/50 via-blue-50/30 to-white dark:from-sky-300/90 dark:to-[var(-van-blue)] pointer-events-none")
      UserInfoMain
    TotalDataMain(class="mt-[-2rem]")
    CommonFunction(class="mt-2")
</template>

<script setup lang="ts">
  import UserInfoMain from '@/components/UserInfoMain.vue'
  import TotalDataMain from '@/components/TotalDataMain.vue'
  import CommonFunction from '@/components/CommonFunction.vue'
</script>

<style scoped lang="scss">
// 我的页面样式

</style>