<template lang="pug">
#AttendanceItem(class="mb-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-card active:scale-[0.99] active:shadow-sm transition-all cursor-pointer group relative overflow-hidden")
  //- 考勤类型
  //- p locale {{ locale }}
  van-row(:gutter="0")
    van-col(:span="5")
      div(class="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-xl w-[3.25rem] h-[3.25rem] shrink-0 text-slate-900 shadow-sm")
        p(class="text-[10px] font-bold uppercase text-slate-400 tracking-wide") {{dateUtil.getDayOfWeek(item.attendanceDate, {format: 'short'})}}
        p(class="text-[19px]  leading-none mt-1") {{dateUtil.format(item.attendanceDate, 'DD')}}
    van-col(:span="18")
      div()
        span(class="mr-2 text-slate-900 font-bold text-[15px]")
          span() {{dateUtil.format(item.attendanceDate, (locale === 'zh-CN' ? 'MM月DD日' : 'DD/MM'))}}
        span(:class="[item.status === '1' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20', 'px-1', 'py-0.5', 'text-[11px]', 'font-bold', 'border', 'rounded-sm']") {{t('attendanceType.' + item.status)}}
      div(class="text-slate-500")
        van-icon(name='underway-o' size="14")
        span(class="text-xs font-medium ml-1") {{t('workDuration')}} {{dateUtil.calculateDuration(item.attendanceStartDatetime, item.attendanceEndDatetime, {unit: 'hours'})}}h
  div(class="mt-4 bg-slate-50/50 rounded-xl pl-6 pr-3 py-3 border border-slate-100/50 relative")
    div(class="absolute left-3 top-[1.125rem] bottom-[1.125rem] w-0.5 bg-slate-200 rounded-full")
    div(class="flex items-center mb-4")
      span(class="inline-block w-2 h-2 rounded-full bg-white border-[2.5px] border-primary shadow-sm z-10 -ml-[0.4rem] mr-3")
      span(clss="text-slate-900 text-[13px] font-semibold") {{dateUtil.formatTime(item.attendanceStartDatetime, 'HH:mm')}}
      span(class="text-slate-500 text-xs ml-4") {{t('attendanceSignIn')}}
      //- span(class="flex-1 text-slate-500 text-xs ml-4 text-right")
        span(class="text-slate-400 text-xs bg-white px-1.5 py-0.5 rounded border border-slate-100")
          van-icon(name='location-o' size="12" class="mr-1")
          | {{item.position}}
    div(class="flex items-center")
      span(class="inline-block w-2 h-2 rounded-full bg-white border-[2.5px] border-primary shadow-sm z-10 -ml-[0.4rem] mr-3")
      span(clss="text-slate-900 text-[13px] font-semibold") {{dateUtil.formatTime(item.attendanceEndDatetime, 'HH:mm')}}
      span(class="text-slate-500 text-xs ml-4") {{t('attendanceSignOut')}}
      //- span(class="flex-1 text-slate-500 text-xs ml-4 text-right")
        span(class="text-slate-400 text-xs bg-white px-1.5 py-0.5 rounded border border-slate-100")
          van-icon(name='location-o' size="12" class="mr-1")
          | {{item.position}}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import { useI18n } from '@/i18n'
const { t, locale, changeLocale } = useI18n()
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const item = computed(() => props.data)
// 考勤明细项组件逻辑
</script>

<style scoped lang="scss">
// 考勤明细项组件样式
</style>