<template lang="pug">
#Statistics
  div(class="mx-10 py-3")
    //- p --{{singinData}}
    van-tabs(van-tabs v-model:active="active" type="card")
      van-tab(:title="t('attendanceCalendar')" :name="1")
      van-tab(:title="t('allowanceCalendar')" :name="2")
  div(class="px-5")
    van-calendar(title="" :poppable="false" :show-confirm="false" switch-mode="month" :show-title="false" :formatter="formatter" @panel-change="onChangeDate" @select="onSelectDate")
      //- template(#subtitle )
      template(#bottom-info="{ type, bottomInfo }")
        div(v-if="type !== 'selected'")
          div(v-if="bottomInfo === '1'" class="m-auto size-1.5 rounded-full bg-[--van-blue] shadow-glow group-hover:scale-125 transition-transform duration-300")
          div(v-else-if="bottomInfo === '2'" class="m-auto size-1.5 rounded-full bg-orange-400 shadow-glow-orange group-hover:scale-125 transition-transform duration-300")
  div(class="px-5 py-3 bg-white rounded-t-[2.25rem] mt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.03)] border-t border-slate-50/80")
    div(class="w-full flex justify-center pb-4 cursor-grab active:cursor-grabbing")
      div(class="w-12 h-1.5 bg-slate-200/80 rounded-full hover:bg-slate-300 transition-colors")
    AttendanceStatisticsDetail(v-if="active === 1" :data="{singinNum: singinData?.length || 0, unSigninMum: unSigninData?.length || 0, slectSinginData, selectedDate}")
    AllowanceStatisticsDetail(v-else-if="active === 2")
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import { isEmpty } from 'lodash'
import { Allowance } from '@/api'
import AttendanceStatisticsDetail from '@/components/AttendanceStatisticsDetail.vue'
import AllowanceStatisticsDetail from '@/components/AllowanceStatisticsDetail.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

// 统计页面逻辑
const active = ref(1)
const singinData :any = ref([]);
const unSigninData :any = ref([]); // 补录
const formatter = computed(() => {
  // if (!singinData.value) {
  //   return (day: any) => day;
  // }
  if (loading.value) {
    return (day: any) => day;
  }
  return (day: any) => {
    // day.bottomInfo = asyncData.value;
    if (singinData.value.includes(dateUtil.formatDate(day.date))) {
      // day.className = 'success-label'
      day.bottomInfo = '1'
    } else if (unSigninData.value.includes(dateUtil.formatDate(day.date))) {
      // day.className = 'danger-label'
      day.bottomInfo = '2'
    } else {
      day.bottomInfo = '0'
    }
    // console.log(day, dateUtil.formatDate(day.date))
    // day.bottomInfo = '0'
    // day.className = 'rt-1'
    return day;
  };
});
const currentDate = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY-MM');
});
const slectSinginData = ref()
const selectedDate = ref(dateUtil.formatDate(new Date(), 'YYYY-MM-DD'))
// setTimeout(() => {
//   singinData.value = ['2025-12-01', '2025-12-03', '2025-12-05', '2025-12-06', '2025-12-07', '2025-12-08'];
//   unSigninData.value = ['2025-12-02', '2025-12-04', '2025-12-09'];
// }, 1000);
const loading = ref(false)
const list = ref([])
const getAttendanceList = async (date: string = currentDate.value) => {
  loading.value = true
  const params = {
    attendanceMonth: date,
    // attendanceMonth: '2025-12',
    // attendanceMonth: currentDate.value,
    current: 1,
    size: 31
  }
  const res = await Allowance.getAttendanceInfoList(params)
  console.log('getAttendanceList', res)
  loading.value = false
  list.value = res.data?.records || []
  singinData.value = list.value.filter((item: any) => item.status === '1').map((item: any) => item.attendanceDate)
  unSigninData.value = list.value.filter((item: any) => item.status === '2').map((item: any) => item.attendanceDate)
  slectSinginData.value = list.value.find((item: any) => item.attendanceDate === dateUtil.formatDate(date, 'YYYY-MM-DD')) || {}
}
const onChangeDate = ({ date }: any) => {
  console.log('onChangeDate', date, dateUtil.formatDate(date, 'YYYY-MM'))
  const formatDate = dateUtil.formatDate(date, 'YYYY-MM')
  getAttendanceList(formatDate)
}
const onSelectDate = (value : any) => {
  console.log('onSelectDate', value, dateUtil.formatDate(value, 'YYYY-MM-DD'))
  const formatDate = dateUtil.formatDate(value, 'YYYY-MM-DD')
  selectedDate.value = formatDate
  slectSinginData.value = list.value.find((item: any) => item.attendanceDate === formatDate) || {}
}
onMounted(() => {
  getAttendanceList()
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