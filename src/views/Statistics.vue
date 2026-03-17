<template lang="pug">
#Statistics
  div(class="mx-10 py-3")
    //- p --{{singinData}}
    van-tabs(van-tabs v-model:active="active" type="card")
      van-tab(:title="t('attendanceCalendar')" :name="1")
      van-tab(:title="t('allowanceCalendar')" :name="2")
  div(class="px-5")
    // ref="calendarRef"
    van-calendar(title="" :poppable="false" :show-confirm="false" switch-mode="month" :show-title="false" :formatter="formatter" :min-date="new Date(2020, 0, 1)" :max-date="new Date()"
      :default-date="selectedDate.data" @panel-change="onChangeDate" @select="onSelectDate")
      //- template(#subtitle )
      template(#bottom-info="{ type, bottomInfo }")
        div(v-if="type !== 'selected'")
          div(v-if="bottomInfo === '1'" class="m-auto size-1.5 rounded-full bg-[--van-blue] shadow-glow group-hover:scale-125 transition-transform duration-300")
          div(v-else-if="bottomInfo === '2'" class="m-auto size-1.5 rounded-full bg-orange-400 shadow-glow-orange group-hover:scale-125 transition-transform duration-300")
  div(class="px-5 py-3 bg-white rounded-t-[2.25rem] mt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.03)] border-t border-slate-50/80")
    div(class="w-full flex justify-center pb-4 cursor-grab active:cursor-grabbing")
      div(class="w-12 h-1.5 bg-slate-200/80 rounded-full hover:bg-slate-300 transition-colors")
    AttendanceStatisticsDetail(v-if="active === 1")
    AllowanceStatisticsDetail(v-else-if="active === 2")
    //- AttendanceStatisticsDetail(v-if="active === 1" :data="{singinNum: singinData?.length || 0, unSigninNum: unSigninData?.length || 0, slectSinginData, selectedDate}")
    //- AllowanceStatisticsDetail(v-else-if="active === 2" :date="{allowanceDays: Object.keys(allowanceGroupByDate)?.length, slectSinginData, selectedDate, allowanceTotal, }")
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import { isEmpty, groupBy, sumBy, cloneDeep, sortBy } from 'lodash'
import { Allowance } from '@/api'
import AttendanceStatisticsDetail from '@/components/AttendanceStatisticsDetail.vue'
import AllowanceStatisticsDetail from '@/components/AllowanceStatisticsDetail.vue'
import { useStatisticsStore } from '@/stores/statistics'

const { setAttendanceForDay, setAllowanceForDay } = useStatisticsStore()

import { useI18n } from '@/i18n'

const { t, locale } = useI18n()

// 统计页面逻辑
const calendarRef: any = ref(null)
const active = ref(1)
const attendanceConfirmList: any = ref([]);
const confirmStatus = ref()
const singinData: any = ref([]);
const unSigninData: any = ref([]); // 补录

const currentDate = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY-MM');
});
const slectSinginData = ref()
const selectedDate = ref({
  // data: dateUtil.formatDate(new Date(), 'YYYY-MM-DD'),
  info: dateUtil.formatDate(new Date(), 'YYYY-MM-DD'),
  data: new Date(),
})
// setTimeout(() => {
//   singinData.value = ['2025-12-01', '2025-12-03', '2025-12-05', '2025-12-06', '2025-12-07', '2025-12-08'];
//   unSigninData.value = ['2025-12-02', '2025-12-04', '2025-12-09'];
// }, 1000);
const loading = ref(false)
const list = ref([])
const allowanceList = ref([])
const allowanceGroupByDate: any = ref({})
const allowanceTotal = ref(0)

const formatter = (day: any) => {
  // return (day: any) => {
  // console.log('day', day, singinData.value)
    if (singinData.value.includes(dateUtil.formatDate(day.date))) {
      // day.className = 'success-label'
      day.bottomInfo = '1'
    } else if (unSigninData.value.includes(dateUtil.formatDate(day.date))) {
      // day.className = 'danger-label'
      day.bottomInfo = '2'
    } else {
      day.bottomInfo = '0'
    }
  return day;
  // };
}
const getAttendanceList = async (date: string = currentDate.value) => {
  // loading.value = true
  const params = {
    attendanceMonth: date,
    // attendanceMonth: '2025-12',
    // attendanceMonth: currentDate.value,
    current: 1,
    size: 31
  }
  const res = await Allowance.getAttendanceInfoList(params)
  console.log('getAttendanceList', res)
  // loading.value = false
  list.value = res.data?.records || []
  // const arr = cloneDeep(list.value)
  // console.log('singinData', list.value.filter((item: any) => item.status === '1').map((item: any) => item.attendanceDate))
  singinData.value = list.value.filter((item: any) => item.status === 1).map((item: any) => item.attendanceDate)
  unSigninData.value = list.value.filter((item: any) => item.status === 2).map((item: any) => item.attendanceDate)
  slectSinginData.value = selectedDate.value ? list.value.find((item: any) => item.attendanceDate === selectedDate.value?.info) || {} : {}
  setAttendanceForDay({
    singinNum: singinData.value?.length || 0,
    unSigninNum: unSigninData.value?.length || 0,
    slectSinginData: slectSinginData.value || {},
    selectedDate: selectedDate.value?.info,
  })
}
const onChangeDate = ({ date }: any) => {
  console.log('onChangeDate', date, dateUtil.formatDate(date, 'YYYY-MM'), dateUtil.formatDate(date, 'YYYY-MM-DD'))
  const formatDate = dateUtil.formatDate(date, 'YYYY-MM')
  // selectedDate.value = formatDate === currentDate.value ? dateUtil.formatDate(date, 'YYYY-MM-DD') : ''
  selectedDate.value = {
    info: dateUtil.formatDate(date, 'YYYY-MM-DD'),
    data: date,
  }
  if (active.value === 1) {
    getAttendanceList(formatDate)
    getConfirmSummary(formatDate)
  } else if (active.value === 2) {
    getAllowanceList(formatDate)
  }
}
const onSelectDate = (value : any) => {
  console.log('onSelectDate', value, dateUtil.formatDate(value, 'YYYY-MM-DD'))
  const formatDate = dateUtil.formatDate(value, 'YYYY-MM-DD')
  selectedDate.value = {
    info: formatDate,
    data: value,
  }
  if (active.value === 1) {
    slectSinginData.value = list.value.find((item: any) => item.attendanceDate === formatDate) || {}
    console.log('slectSinginData.value', slectSinginData.value?.id, attendanceConfirmList.value)
    const { back, reason } = attendanceConfirmList.value.find((item: any) => item.attendanceId === slectSinginData.value?.id) || {}
    setAttendanceForDay({
      singinNum: singinData.value?.length || 0,
      unSigninNum: unSigninData.value?.length || 0,
      slectSinginData: slectSinginData.value || {},
      selectedDate: selectedDate.value?.info,
      roundTrip: {
        back,
        reason,
      },
      confirmStatus: confirmStatus.value
    })
  } else if (active.value === 2) {
    // selectedDate
    console.log('formatDate', formatDate)
    slectSinginData.value = allowanceGroupByDate.value[formatDate] || {}
    setAllowanceForDay({
      allowanceDays: Object.keys(allowanceGroupByDate.value)?.length || 0,
      allowanceTotal: allowanceTotal.value || 0,
      slectSinginData: slectSinginData.value || {},
      selectedDate: selectedDate.value?.info,
    })
  }
}
const getLatestMonthAllowance = async () => {
  const res = await Allowance.getLatestMonthAllowance()
  console.log('getLatestMonthAllowance', res)
  // if (res.code === 0) {
    // selectedDate.value = {
    //   info: res.data?.month || '',
    //   data: new Date(res.data?.month || ''),
    // }
    // getAllowanceList(res.data?.month || '')
  // }
  allowanceList.value = res.data || []
  allowanceGroupByDate.value = groupBy(allowanceList.value, 'date')
  allowanceTotal.value = sumBy(allowanceList.value, (item: any) => item.amount)
  singinData.value = allowanceList.value.map((item: any) => item.date)
  // singinData.value = allowanceList.value.map((item: any) => item.date)
  unSigninData.value = []
  // 获取最大日期值
  const dates = sortBy(Object.keys(allowanceGroupByDate.value))
  // console.log('dates', dates)
  const lastDate = dates.length > 0 ? dates[dates.length - 1] : ''
  selectedDate.value = {
    info: lastDate,
    data: new Date(lastDate),
  }
  // unSigninData.value = allowanceList.value.filter((item: any) => item.status === '2').map((item: any) => item.attendanceDate)
  slectSinginData.value = allowanceGroupByDate.value[selectedDate.value?.info] || {}
  console.log('Allowance singinData.value', slectSinginData.value)
  console.log('Allowance slectSinginData.value', slectSinginData.value)
  console.log('Allowance allowanceGroupByDate.value', allowanceGroupByDate.value)
  // console.log('Allowance selectedDate.value', llowanceGroupByDate.value.[])

  setAllowanceForDay({
    allowanceDays: Object.keys(allowanceGroupByDate.value)?.length || 0,
    allowanceTotal: allowanceTotal.value || 0,
    slectSinginData: slectSinginData.value || {},
    selectedDate: selectedDate.value?.info || '',
  })
}
const getAllowanceList = async (date: string = currentDate.value) => {
  const params = {
    allowanceMonth:date
  }
  const res = await Allowance.getAllowanceInfoList(params)
  console.log('getAllowanceInfoList', res)
  allowanceList.value = res.data || []
  allowanceGroupByDate.value = groupBy(allowanceList.value, 'date')
  allowanceTotal.value = sumBy(allowanceList.value, (item: any) => item.amount)
  singinData.value = allowanceList.value.map((item: any) => item.date)
  // singinData.value = allowanceList.value.map((item: any) => item.date)
  unSigninData.value = []
  // unSigninData.value = allowanceList.value.filter((item: any) => item.status === '2').map((item: any) => item.attendanceDate)
  slectSinginData.value = allowanceGroupByDate.value[selectedDate.value?.info] || {}
  // slectSinginData.value = allowanceList.value.find((item: any) => item.date === dateUtil.formatDate(date, 'YYYY-MM-DD')) || {}
  console.log('Allowance singinData.value', slectSinginData.value)
  console.log('Allowance slectSinginData.value', slectSinginData.value)
  console.log('Allowance allowanceGroupByDate.value', allowanceGroupByDate.value)
  setAllowanceForDay({
    allowanceDays: Object.keys(allowanceGroupByDate.value)?.length || 0,
    allowanceTotal: allowanceTotal.value || 0,
    slectSinginData: slectSinginData.value || {},
    selectedDate: selectedDate.value?.info || '',
  })
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
      // isRoundTrip.value = res.data?.back || '0'
      // reason.value = res.data?.reason || ''
    }
  } catch (error) {
    console.error('获取确认考勤往返信息摘要失败:', error)
  }
}
watch(() => active.value, (newVal : number) => {
  selectedDate.value = {
    info: dateUtil.formatDate(new Date(), 'YYYY-MM-DD'),
    data: new Date()
  }
  singinData.value = []
  if (newVal === 1) {
    getAttendanceList()
    getConfirmSummary()
  } else if (newVal === 2) {
    // getAllowanceList()
    getLatestMonthAllowance()
  }
  // getAttendanceList(newVal)
  // getAllowanceList(newVal)
}, { immediate: true })
onMounted(() => {
  // getAttendanceList()
})
</script>

<style lang="scss">
  .van-tabs__nav--card {
    border: none;
    border-radius: 5rem;
    // overflow: hidden;
    padding: 0.5rem;

  }
  .van-tab--card.van-tab--active {
    border-radius: 5rem;
    // --tw-shadow-color: rgb(14, 165, 233, 0.3);
    // --tw-shadow: var(--tw-shadow-colored);
  }
  .van-tab--card {
    border-right: none;
  }
  .van-tabs__nav {
    --tw-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.2);
    --tw-shadow-colored: 0 10px 25px -5px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  .van-tabs__wrap {
    overflow: visible;
  }
// 统计页面样式
.van-calendar {
  background: none;
}
.van-calendar__header {
  box-shadow: none;
}
.van-calendar__selected-day {
  border-radius: var(--van-radius-max);
}
.shadow-glow {
  --tw-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
  --tw-shadow-colored: 0 0 10px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-glow-orange {
  --tw-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
  --tw-shadow-colored: 0 0 10px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>