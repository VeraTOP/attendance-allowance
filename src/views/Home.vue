<template lang="pug">
#Home(class="relative")
  div(class="absolute top-0 w-full h-[36vh] bg-primary-gradient rounded-b-[2.5rem] z-[-1]")
  UserInfo
  TotalData(:data="{days: list.length, num: allowanceList.length }" :onlyAttendance="onlyAttendance")
  ToBeDone(v-if="!onlyAttendance" :data='confirmData')
  AttendanceList(:data="list")
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '@/i18n'
import UserInfo from '@/components/UserInfo.vue'
import TotalData from '@/components/TotalData.vue'
import ToBeDone from '@/components/ToBeDone.vue'
import AttendanceList from '@/components/AttendanceList.vue'
import { isEmpty } from 'lodash'
import { dateUtil } from '@/assets/scripts/date-util'
import { Allowance } from '@/api'
import { useUserStore } from '@/stores/user'

const { t, locale, changeLocale } = useI18n()

const userStore: any = useUserStore()
const onlyAttendance = computed(() => userStore?.userInfo?.applyPersonType === null)
const list = ref([])
const confirmData = ref({})
const currentDate = computed(() => dateUtil.format(new Date(), 'YYYY-MM'))
// const currentDate = ref('2026-02')

const getAttendanceList = async () => {
  const params = {
    // attendanceMonth: ',
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
  confirmData.value = res.data?.filter((item: any) => !item.confirm)[0] || {}
}

const allowanceList = ref([])
const getAllowanceList = async () => {
  const params = {
    allowanceMonth: currentDate.value
  }
  const res = await Allowance.getAllowanceInfoList(params)
  console.log('getAllowanceInfoList', res)
  allowanceList.value = res.data || []
}
onMounted(() => {
  getAttendanceList()
  getConfirmData()
  getAllowanceList()
})
</script>

<style lang="scss" scoped>


</style>