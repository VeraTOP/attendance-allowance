<template lang="pug">

  div
    //- div data {{data}}
    van-row(:gutter="16")
      van-col(span="12")
        div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            //- van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
            span(class="flex h-2.5 w-2.5 rounded-full bg-primary shadow-glow")
            span(class="text-xs font-bold text-slate-400") {{t('monthlyAttendance')}}
          div
            span(class="text-3xl font-bold text-slate-800 tracking-tight") {{data.singinNum || 0}}
            span(class="text-xs font-medium text-slate-400 ml-1.5") {{t('attendanceDaysUnit')}}
      van-col(span="12")
        div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            //- van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
            span(class="flex h-2.5 w-2.5 rounded-full bg-orange-500 shadow-glow-orange animate-pulse")
            span(class="text-xs font-bold text-slate-400") {{t('monthlyAllowance')}}
          div
            span(class="text-3xl font-bold text-slate-800 tracking-tight") {{data.unSigninMum || 0}}
            span(class="text-xs font-medium text-slate-400 ml-1.5") {{t('allowanceTimesUnit')}}
    div(class="mt-6")
      //- p  {{currentDay}} -- {{data.selectedDate}}
      div(class="flex items-center justify-between mb-5")
        h3(class="text-lg font-bold text-slate-800 flex items-center gap-3") {{dateUtil.formatDate(data.selectedDate, locale === 'zh-CN' ? 'MM月DD日' : 'DD/MM')}}
          span(v-if="currentDay === data.selectedDate" class="text-[10px] font-bold px-2.5 rounded-full bg-[--van-blue-lightest] text-[--van-blue] border border-[--van-blue-lighter] shadow-sm") {{t('today')}}
        //- p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") 查看全部
          //- van-icon(name="arrow" class="ml-1")
      div(class="space-y-4")
        div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
          div(:class="['absolute','left-0','top-0','bottom-0','w-1.5', data.slectSinginData?.attendanceStartDatetime ? 'bg-primary' : 'bg-slate-200']")
          div(class="p-5 pl-7 flex justify-between items-center")
            div(class="flex gap-5")
              div(class="flex flex-col items-center pt-2")
                div(:class="['size-3.5','rounded-full','border-[3px]', data.slectSinginData?.attendanceStartDatetime ? 'border-primary' : 'border-slate-200','bg-white','relative','z-10','shadow-sm','ring-2','ring-blue-50']")
                div(class="w-0.5 h-10 bg-slate-100 -mt-1 rounded-b-full group-hover:bg-blue-100 transition-colors duration-500")
              div
                div(class="flex items-baseline gap-2.5")
                  span(class="text-sm font-semibold text-slate-900") {{t('attendanceSignInTime')}}
                  span(v-if="data.slectSinginData?.attendanceStartDatetime" class="text-xl font-bold text-slate-800 font-mono tracking-tight") {{ dateUtil.formatDate(data.slectSinginData?.attendanceStartDatetime, 'HH:mm')}}
                  span(v-else class="text-xl font-bold text-slate-400") --:--

                div(class="mt-3")
                  span(v-if="data.slectSinginData?.attendanceStartDatetime" class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-600 border border-green-200/50") {{t('attendanceType.' + data.slectSinginData?.status)}}
                  span(v-else class="text-slate-400 italic text-xs") {{t('noAttendanceRecord')}}
        div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
          //- div(class="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200")
          div(:class="['absolute','left-0','top-0','bottom-0','w-1.5', data.slectSinginData?.attendanceEndDatetime ? 'bg-primary' : 'bg-slate-200']")
          div(class="p-5 pl-7 flex justify-between items-center")
            div(class="flex gap-5")
              div(class="flex flex-col items-center pt-2")
                div(class="w-0.5 h-10 bg-slate-100 -mt-1 rounded-b-full group-hover:bg-blue-100 transition-colors duration-500")
                //- div(class="size-3.5 rounded-full border-[3px] border-slate-200 bg-white relative z-10 shadow-sm ring-2 ring-blue-50")
                div(:class="['size-3.5','rounded-full','border-[3px]', data.slectSinginData?.attendanceEndDatetime ? 'border-primary' : 'border-slate-200','bg-white','relative','z-10','shadow-sm','ring-2','ring-blue-50']")
              div
                div(class="flex items-baseline gap-2.5")
                  span(class="text-sm font-semibold text-slate-900") {{t('attendanceSignOutTime')}}
                  span(v-if="data.slectSinginData?.attendanceEndDatetime" class="text-xl font-bold text-slate-800 font-mono tracking-tight") {{ dateUtil.formatDate(data.slectSinginData?.attendanceEndDatetime, 'HH:mm')}}
                  span(v-else class="text-xl font-bold text-slate-400") --:--

                div(class="mt-3")
                  span(v-if="data.slectSinginData?.attendanceEndDatetime"  class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-600 border border-green-200/50") 正常
                  span(v-else class="text-slate-400 italic text-xs") {{t('noAttendanceRecord')}}

</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import { useStatisticsStore } from '@/stores/statistics'
import { useI18n } from '@/i18n'
const { t, locale } = useI18n()
const statisticsStore: any = useStatisticsStore()

const currentDay = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY-MM-DD')
});
const data = computed(() => {
  return statisticsStore.attendanceForDay || {}
})
// const props = defineProps({
//   data: {
//     type: Object,
//     default: () => ({})
//   }
// })
// const singinNum = ref(props.data.singinNum)
// const singinNum = computed(() => {
//   return props.data.singinNum || 0
// })
// const singoutNum = computed(() => {
//   return props.data.singoutNum || 0
// })
// const slectSinginData = computed(() => {
//   return props.data.slectSinginData
// })
// const selectedDate = computed(() => {
//   return props.data.selectedDate
// })

</script>