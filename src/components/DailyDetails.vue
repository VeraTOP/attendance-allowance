<template lang="pug">
#AttendanceList()
  div(class="flex items-center justify-between mb-3 px-1")
    p(class="text-[17px] font-bold text-slate-800 tracking-tight flex items-center")
      span(class="inline-block w-1 h-4 bg-primary rounded-full mr-2")
      span 每日明细
    //- p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") 查看全部
      van-icon(name="arrow" class="ml-1")
  div(v-for="item in list" :key="item.id" class="mb-3 relative p-4 rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-slate-100")
    van-row(class="mb-4" :gutter="24")
      van-col(:span="18")
        span(class="text-[17px] font-bold text-slate-800 dark:text-white tracking-tight mr-2") {{dateUtil.format(item.date, 'MM月DD日')}}
        span(class="text-xs font-medium text-slate-400 dark:text-slate-500") {{dateUtil.getDayOfWeek(item.date, {format: 'short'})}}
      van-col(:span="6")
        div(class="flex justify-end")
          span(:class="['rounded-full', item.status === '1' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20', 'px-2.5', 'py-0.5', 'text-[11px]', 'font-bold', 'border']") {{item.status == '1' ? '正常' : '迟到'}}
    van-row(class="" :gutter="24")
      van-col(:span="12")
        div(class="flex items-center justify-between ")
          div
            p(class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold") 签到
            p(class="text-base font-bold font-mono text-slate-700 dark:text-slate-200") {{dateUtil.formatTime(item.date + ' ' + item.startTime, 'HH:mm')}}
          div
            p(class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold") 签退
            p(class="text-base font-bold font-mono text-slate-700 dark:text-slate-200") {{dateUtil.formatTime(item.date + ' ' + item.endTime, 'HH:mm')}}
      van-col(:span="12")
        div(class="flex justify-end")
          span(class="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700") {{dateUtil.calculateDuration(item.startTime, item.endTime, {unit: 'hours'})}}h
      //- van-col(:span="6")
      //-   div(v-if="item.status == '1'" class="flex items-center justify-center rounded-2xl bg-green-50 text-green-600 w-12 h-12 shadow-sm border border-green-100/50")
      //-     van-icon( name="passed" size="24")
      //-   div(v-else-if="item.status == '2'" class="flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600 w-12 h-12 shadow-sm border border-amber-100/50")
      //-     van-icon(name="underway-o" size="24")
      //- van-col(:span="18")
      //-   p(class="text-[17px] font-bold text-slate-800 tracking-tight") {{item.title}}
      //-   p(class="text-[13px] text-slate-500 leading-relaxed mt-1")
      //-     van-icon(name="clock-o" size="12" class="mr-1")
      //-     span {{item.datetime}}
      //-   p(class="text-[13px] text-slate-500 leading-relaxed mt-1")
      //-     van-icon(name="location-o" size="12" class="mr-1")
      //-     span {{item.position}}
        //- p(class="text-[15px] text-slate-500 tracking-tight") {{item.status}}

</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
import { dateUtil } from '@/assets/scripts/date-util'
// const data = ref()
const list = ref([
  {
    id: 1,
    title: '正常考勤',
    // describe: '10月考勤数据已生成，请在10月31日之前确认',
    // datetime: '2023-10-01 00:00:00',
    date: '2023-10-9',
    startTime: '08:00:00',
    endTime: '18:00:00',
    status: '1',
    position: '教学楼-1-203'
  },
  {
    id: 2,
    title: '迟到打卡',
    // describe: '10月考勤数据已生成，请在10÷月31日之前确认',
    // datetime: '2023-10-01 00:00:00',
    date: '2023-10-10',
    startTime: '09:23:09',
    endTime: '18:00:00',
    status: '2',
    position: '教学楼-1-203'
  }
])

const handleClick = () => {
  router.push({ name: 'attendance-details' })
}
</script>