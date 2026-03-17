<template lang="pug">
#AttendanceConfirmation(class="px-4")
  //- p {{selectedDate}}
  div(class="flex justify-center py-6")
    van-button(type="primary" plain round class="w-56" size="large" )
      div(class="flex items-center gap-2")
        span(class="inline-block bg-primary rounded-full w-6 h-6 flex items-center justify-center")
          van-icon(name="notes-o" size="16" color="var(--van-white)" class="m-1")
        span(class="text-lg font-bold text-slate-800 dark:text-white tracking-tight") {{confirmYearMonth}}
        //- span
          van-icon(name="play" size="12" color="var(--van-blue)" class="rotate-90")
  van-row(gutter="16")
    van-col(class="" span="12")
      div(class="text-center bg-white rounded-3xl overflow-hidden px-2 py-4 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-blue-50 ")
        van-icon(name="fire-o" size="24" color="var(--van-blue)")
        div(class="mt-2")
          p(class="text-xl font-bold text-slate-850 tracking-tight") {{days}}
          p(class="text-xs text-slate-400 mt-1") {{t('continuousAttendance')}}({{t('attendanceDaysUnit')}})
    van-col(class="" span="12")
      div(class="text-center bg-white rounded-3xl overflow-hidden px-2 py-4 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-blue-50")
        van-icon(name="notes-o" size="24" color="var(--van-blue)")
        div(class="mt-2")
          p(class="text-xl font-bold text-slate-850 tracking-tight") {{attendanceList.length}}
          p(class="text-xs text-slate-400 mt-1") {{t('attendanceDays')}}
    //- van-col(class="" span="8")
      div(class="text-center bg-white rounded-3xl overflow-hidden px-2 py-4 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-blue-50")
        van-icon(name="gold-coin-o" size="24" color="var(--van-blue)")
        div(class="mt-2")
          p(class="text-xl font-bold text-slate-850 tracking-tight mr-1") {{utils.formatCurrency(allowanceTotal || 0)}}
          p(class="text-xs text-slate-400 mt-1") {{t('allowanceAmount')}}
  DailyDetails(class="mt-6 mb-36" :data="attendanceList" :confirmData="attendanceConfirmList" :confirmStatus="confirmStatus")
  div(class="fixed bottom-0 left-0 right-0 px-6 py-5 bg-white van-hairline--top-bottom van-safe-area-bottom border-t border-slate-200/60")
    template(v-if="!confirmData?.confirm")
      van-checkbox(class="mr-2 mb-4" shape="square" v-model="isChecked")
        span(class="text-sm font-medium text-slate-500 dark:text-slate-400") {{t('confirmDescription')}}
      van-button( class="rounded-xl bg-primary-gradient shadow-lg shadow-sky-500/30" type="primary" size="large" :disabled="!isChecked" :loading="loading" @click="confirm")
        span(class="text-[17px]") {{t('confirmAttendance')}}
        van-icon(name="passed" size="20" class="ml-2 relative top-[2px]")
    template(v-else)
      //-撤销按钮
      //- van-button(class="rounded-xl bg-red-500 shadow-lg shadow-red-500/30" type="danger" size="large" @click="confirm")
      //-   span(class="text-[17px]") {{t('revokeAttendance')}}
      //-   van-icon(name="undo" size="20" class="ml-2 relative top-[2px]")
      van-button(class="rounded-xl bg-orange-400 shadow-lg shadow-orange-400/30" type="warning" size="large" @click="confirm")
        span(class="text-[17px]") {{t('revokeAttendance')}}
        van-icon(name="revoke" size="20" class="ml-2 relative top-[2px]")
      //- p(class="text-center text-base text-green-600 dark:text-slate-400")
      //-   van-icon(name="passed" size="22" class="inline-block mr-2 relative top-[2px]")
      //-   span {{t('attendanceConfirmed')}}
  //- van-popup(v-model:show="isPicker" position="bottom")
    van-date-picker(v-model="dateValue" title="选择年月" :max-date="new Date()" :columns-type="columnsType" @confirm="handleConfirm")
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import DailyDetails from '@/components/DailyDetails.vue'
import { isEmpty, sumBy, groupBy } from 'lodash'
import { Allowance } from '@/api'
import { utils } from '@/assets/scripts/utils'
import { useI18n } from '@/i18n'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()
const { t, locale } = useI18n()
  // 使用日期工具格式化日期
const currentDate = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY-MM')
})

// // 模拟数据
const days = ref(22)
// const number = ref(1)
const isChecked = ref(false)
const confirmYearMonth = ref()
const confirmData = ref()

const attendanceList = ref([])
const allowanceList = ref([])
const allowanceGroupByDate = ref({})
const allowanceTotal = ref(0)
const attendanceConfirmList = ref([])
const confirmStatus = ref(0)

const getConfirmData = async () => {
  const params = {
    allowanceMonth: currentDate.value
  }
  const res = await Allowance.getListConfirmable(params)
  console.log('getAllowanceInfoList', res)
  confirmData.value = res.data?.[0]
  const dateArr = confirmData.value?.currentMonth?.split('-')
  confirmYearMonth.value = locale.value === 'zh-CN' ? dateArr?.[0] + '年' + dateArr?.[1] + '月' : dateArr?.[1] + '/' + dateArr?.[0]
  getAttendanceList(confirmData.value?.currentMonth)
  getConfirmSummary(confirmData.value?.currentMonth)
  getAllowanceList(confirmData.value?.currentMonth)
}
const getAttendanceList = async (date: string) => {
  const params = {
    // attendanceMonth: '2025-12',
    attendanceMonth: date,
    current: 1,
    size: 31
  }
  const res = await Allowance.getAttendanceInfoList(params)
  console.log('getAttendanceList', res)
  attendanceList.value = res.data?.records || []
  days.value = dateUtil.getConsecutiveAttendanceDays(attendanceList.value.map((item: any) => item.attendanceDate))
}
const getAllowanceList = async (date: string) => {
  const params = {
    allowanceMonth:date
  }
  const res = await Allowance.getAllowanceInfoList(params)
  console.log('getAllowanceInfoList', res)
  allowanceList.value = res.data || []
  allowanceGroupByDate.value = groupBy(allowanceList.value, 'date')
  allowanceTotal.value = sumBy(allowanceList.value, (item: any) => item.amount)
  // singinData.value = allowanceList.value.map((item: any) => item.date)
  // singinData.value = allowanceList.value.map((item: any) => item.date)
  // unSigninData.value = []
  // unSigninData.value = allowanceList.value.filter((item: any) => item.status === '2').map((item: any) => item.attendanceDate)
  // slectSinginData.value = allowanceGroupByDate.value[dateUtil.formatDate(date, 'YYYY-MM-DD')] || {}
  // slectSinginData.value = allowanceList.value.find((item: any) => item.date === dateUtil.formatDate(date, 'YYYY-MM-DD')) || {}
  // console.log('Allowance singinData.value', slectSinginData.value)
  // console.log('Allowance slectSinginData.value', slectSinginData.value)
}
const loading = ref(false)
const confirm = async () => {
  const params = {
    attendanceMonth: confirmData.value?.currentMonth,
    confirmStatus: confirmData.value?.confirm ? 0 : 1
    // ...confirmData.value
  }
  try {
    loading.value = true
    const res: any = await Allowance.confirmAllowance(params)
    console.log('confirmAllowance', res)
    loading.value = false
    if (res.code === 0) {
      showToast({
        message: res?.msg || t('confirmSuccess'),
        onClose: () => {
          // confirmData.value.confirm = !confirmData.value?.confirm
          // router.back()
          getConfirmData()
          isChecked.value = false

        }
      })
    } else {
      showToast({
        message: res?.msg || t('confirmFailed'),
      })
    }

  } catch (error: any) {
    loading.value = false
    console.log('confirmAllowance error', error)
    showToast({
      message: error.msg || t('confirmFailed'),
    })
  }
}
const getConfirmSummary = async (date: string = currentDate.value) => {
  try {
    const params = {
      month: date
    }

    const res = await Allowance.getAttendanceConfirmSummary(params)
    console.log('获取确认考勤往返信息摘要成功:', res)

    // 处理返回数据，更新组件状态
    if (res.code === 0) {
      console.log('getConfirmSummary res.data', res.data)
      attendanceConfirmList.value = res.data?.attendanceConfirmList || []
      confirmStatus.value = res.data?.confirmStatus
      // reason.value = res.data?.reason || ''
    }
  } catch (error) {
    console.error('获取确认考勤往返信息摘要失败:', error)
  }
}
onMounted(() => {
  getConfirmData()
})
</script>

<style lang="scss">
  .van-checkbox__icon .van-icon {
    border-radius: 0.375rem;
  }
</style>