<template lang="pug">
div
  div(class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl")
    div(class="relative w-full bg-white dark:bg-[var(-van-blue)] rounded-b-[2.5rem] shadow-[0_8px_30px_-8px_rgba(14,165,233,0.15)] overflow-hidden pb-3")
      div(class="absolute inset-0 bg-gradient-to-b from-sky-200/50 via-blue-50/30 to-white dark:from-sky-300/90 dark:to-[var(-van-blue)] pointer-events-none")
      UserInfoMain
    TotalDataMain(class="mt-[-2rem]" :data="{attendanceLen, confirmDataLen}")
    CommonFunction(class="mt-2" :data=" { confirmData }")
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import { Allowance } from '@/api'
import UserInfoMain from '@/components/UserInfoMain.vue'
import TotalDataMain from '@/components/TotalDataMain.vue'
import CommonFunction from '@/components/CommonFunction.vue'

const attendanceLen = ref()
const confirmDataLen = ref(0)
const currentDate = computed(() => dateUtil.format(new Date(), 'YYYY-MM'))
// const currentDate = ref('20')


const getAttendanceList = async () => {
  const params = {
    // attendanceMonth: '2025-12',
    attendanceMonth: currentDate.value,
    current: 1,
    size: 31
  }

  const res = await Allowance.getAttendanceInfoList(params)
  console.log('getAttendanceList', res)
  attendanceLen.value = res.data?.records?.length || 0
}
const confirmData = ref([])
const getConfirmData = async () => {
  const params = {
  }
  const res = await Allowance.getListConfirmable(params)
  console.log('getConfirmData', res)
  confirmDataLen.value = res.data?.filter((item: any) => !item.confirm).length || 0
  confirmData.value = res.data
}
onMounted(() => {
  getAttendanceList()
  getConfirmData()
})
</script>

<style scoped lang="scss">
// 我的页面样式

</style>