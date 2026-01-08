<template lang="pug">
#Home(class="relative")
  div(class="absolute top-0 w-full h-[36vh] bg-primary-gradient rounded-b-[2.5rem] z-[-1]")
  UserInfo
  TotalData(:data="{days: list.length, num: 8 }")
  ToBeDone(:data='confirmData')
  AttendanceList(:data="list")
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '@/i18n'
import UserInfo from '@/components/UserInfo.vue'
import TotalData from '@/components/TotalData.vue'
import ToBeDone from '@/components/ToBeDone.vue'
import AttendanceList from '@/components/AttendanceList.vue'

import { dateUtil } from '@/assets/scripts/date-util'
import { Allowance } from '@/api'


const { t, locale, changeLocale } = useI18n()

const list = ref([])
const confirmData = ref({})
const currentDate = computed(() => dateUtil.format(new Date(), 'YYYY-MM'))

const getAttendanceList = async () => {
  const params = {
    // attendanceMonth: '2025-12',
    attendanceMonth: currentDate.value,
    current: 1,
    size: 31
  }
  const res = await Allowance.getAttendanceInfoList(params)
  console.log('getAttendanceList', res)
  list.value = res.data?.records || []
}
const getConfirmData = async () => {
  const params = {
    // current: 1,
    // size: 10
  }
  const res = await Allowance.getListConfirmable(params)
  console.log('getConfirmData', res)
  confirmData.value = res.data?.[0]
}
onMounted(() => {
  getAttendanceList()
  getConfirmData()
})
</script>

<style lang="scss" scoped>


</style>