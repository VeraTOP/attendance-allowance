<template lang="pug">
  div
    p {{selectedData}}
    van-row(:gutter="16")
      van-col(span="12")
        div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            //- van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
            span(class="flex h-2.5 w-2.5 rounded-full bg-primary shadow-glow")
            span(class="text-xs font-bold text-slate-400") {{t('monthlyAttendance')}}
          div
            span(class="text-3xl font-bold text-slate-800 tracking-tight") {{singinNum}}
            span(class="text-xs font-medium text-slate-400 ml-1.5") {{t('attendanceDaysUnit')}}
          //- template(v-if="active === 2")
            div(class="flex items-center gap-2")
              van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
              span(class="text-xs font-bold text-slate-400") 本月预计补助
            div
              span(class="text-3xl font-bold text-slate-800 tracking-tight") 888
              span(class="text-xs font-medium text-slate-400 ml-1.5") 元
      van-col(span="12")
        div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            //- van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
            span(class="flex h-2.5 w-2.5 rounded-full bg-orange-500 shadow-glow-orange animate-pulse")
            span(class="text-xs font-bold text-slate-400") {{t('monthlyAllowance')}}
          div
            span(class="text-3xl font-bold text-slate-800 tracking-tight") {{singoutNum}}
            span(class="text-xs font-medium text-slate-400 ml-1.5") {{t('allowanceTimesUnit')}}
          //- template(v-if="active === 2")
            div(class="flex items-center gap-2")
              van-icon(name="notes-o" color="#0d9488" size="18")
              span(class="text-xs font-bold text-slate-400") 发放天数
            div
              span(class="text-3xl font-bold text-slate-800 tracking-tight") 20
              span(class="text-xs font-medium text-slate-400 ml-1.5") 天
    div(class="mt-6")
      //- p  {{slectSinginData}}
      div(class="flex items-center justify-between mb-5")
        h3(class="text-lg font-bold text-slate-800 flex items-center gap-3") {{dateUtil.formatDate(selectedDate|| new Date(), 'MM月DD日')}}
          span(v-if="currentDay === selectedDate" class="text-[10px] font-bold px-2.5 rounded-full bg-[--van-blue-lightest] text-[--van-blue] border border-[--van-blue-lighter] shadow-sm") 今日
        //- p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") 查看全部
          //- van-icon(name="arrow" class="ml-1")
      div(class="space-y-4")
        div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
          div(class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary")
          div(class="p-5 pl-7 flex justify-between items-center")
            div(class="flex gap-5")
              div(class="flex flex-col items-center pt-2")
                div(:class="['size-3.5','rounded-full','border-[3px]', slectSinginData?.attendanceStartDatetime ? 'border-primary' : 'border-slate-200','bg-white','relative','z-10','shadow-sm','ring-2','ring-blue-50']")
                div(class="w-0.5 h-10 bg-slate-100 -mt-1 rounded-b-full group-hover:bg-blue-100 transition-colors duration-500")
              div
                div(class="flex items-baseline gap-2.5")
                  span(class="text-sm font-semibold text-slate-900") 上班打卡
                  span(v-if="slectSinginData?.attendanceStartDatetime" class="text-xl font-bold text-slate-800 font-mono tracking-tight") {{ dateUtil.formatDate(slectSinginData?.attendanceStartDatetime, 'HH:mm')}}
                  span(v-else class="text-xl font-bold text-slate-400") --:--
                //- div(class="mt-2 text-slate-400 text-xs" )
                  van-icon(name="location-o")
                  span(class="text-xs font-medium text-slate-400 ml-1.5") 打卡地址: --
                div(class="mt-3")
                  span(v-if="slectSinginData?.attendanceStartDatetime" class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-600 border border-green-200/50") 正常
                  span(v-else class="text-slate-400 italic text-xs") 未打卡
        div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
          div(class="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200")
          div(class="p-5 pl-7 flex justify-between items-center")
            div(class="flex gap-5")
              div(class="flex flex-col items-center pt-2")
                div(class="w-0.5 h-10 bg-slate-100 -mt-1 rounded-b-full group-hover:bg-blue-100 transition-colors duration-500")
                //- div(class="size-3.5 rounded-full border-[3px] border-slate-200 bg-white relative z-10 shadow-sm ring-2 ring-blue-50")
                div(:class="['size-3.5','rounded-full','border-[3px]', slectSinginData?.attendanceEndDatetime ? 'border-primary' : 'border-slate-200','bg-white','relative','z-10','shadow-sm','ring-2','ring-blue-50']")
              div
                div(class="flex items-baseline gap-2.5")
                  span(class="text-sm font-semibold text-slate-900") 下班打卡
                  span(v-if="slectSinginData?.attendanceEndDatetime" class="text-xl font-bold text-slate-800 font-mono tracking-tight") {{ dateUtil.formatDate(slectSinginData?.attendanceEndDatetime, 'HH:mm')}}
                  span(v-else class="text-xl font-bold text-slate-400") --:--
                //- div(class="mt-2 text-slate-400 text-xs")
                  van-icon(name="location-o")
                  span(class="text-xs font-medium text-slate-400 ml-1.5") 打卡地址: --
                div(class="mt-3")
                  span(v-if="slectSinginData?.attendanceEndDatetime"  class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-600 border border-green-200/50") 正常
                  span(v-else class="text-slate-400 italic text-xs") 未打卡
                  //- span(class="text-xl font-bold text-slate-400") --:--
                //- div(class="mt-2 text-slate-400 text-xs")
                  van-icon(name="location-o")
                  span(class="text-xs font-medium text-slate-400 ml-1.5") 打卡地址
                //- div(class="mt-3")
                  span(class="text-slate-400 italic text-xs") 未打卡
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import { useI18n } from '@/i18n'
const { t } = useI18n()
const currentDay = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY-MM-DD')
});
// selectedData.value?.attendanceDate ||
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const singinNum = computed(() => {
  return props.data.singinNum || 0
})
const singoutNum = computed(() => {
  return props.data.singoutNum || 0
})
const slectSinginData = computed(() => {
  return props.data.slectSinginData
})
const selectedDate = computed(() => {
  return props.data.selectedDate
})

</script>