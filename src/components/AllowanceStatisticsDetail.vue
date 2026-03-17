<template lang="pug">
  div
    //- p {{data}}
    van-row(:gutter="16")
      van-col(span="12")
        div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
            span(class="text-xs font-bold text-slate-400") {{t('allowanceAmount', {month: dateUtil.formatDate(data.selectedDate, locale === 'zh-CN' ? 'YYYY年MM月' : 'MM/YYYY')})}}
          div
            span(class="text-2xl font-bold text-slate-800 tracking-tight") {{utils.formatCurrency(data.allowanceTotal || 0)}}
            span(class="text-xs font-medium text-slate-400 ml-1.5") {{t('RMB')}}
      van-col(span="12")
        div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            van-icon(name="notes-o" color="#0d9488" size="18")
            span(class="text-xs font-bold text-slate-400") {{t('allowanceDays')}}
          div
            span(class="text-3xl font-bold text-slate-800 tracking-tight") {{data.allowanceDays || 0}}
            span(class="text-xs font-medium text-slate-400 ml-1.5") {{t('attendanceDaysUnit')}}
    div(class="mt-6")
      div(class="flex items-center justify-between mb-5")
        h3(class="text-lg font-bold text-slate-800 flex items-center gap-3") {{dateUtil.formatDate(data.selectedDate, locale === 'zh-CN' ? 'MM月DD日' : 'DD/MM')}}
          span(v-if="currentDay === data.selectedDate" class="text-[10px] font-bold px-2.5 rounded-full bg-[--van-blue-lightest] text-[--van-blue] border border-[--van-blue-lighter] shadow-sm") {{t('today')}}
        //- p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") 查看全部
          //- van-icon(name="arrow" class="ml-1")
      div(class="space-y-4")
        //- p {{data?.slectSinginData }}
        //- van-empty(v-if="isEmpty(data?.slectSinginData)" :description="t('noData')")
        van-empty(v-if="isEmpty(data?.slectSinginData)"  class="p-0 mb-6" :description="t('noAllowance')" image-size="8rem")
        template(v-else)
          div(v-for="(item, i) in data?.slectSinginData" :key="i" class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
            div(class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary")
            div(class="p-5 pl-7 w-[100%]")
              div(class="flex gap-5")
                div(class="flex flex-col items-center")
                  div(class="size-12 rounded-2xl bg-[var(--van-blue-lightest)] flex items-center justify-center")
                    van-image(:src="typeIconList[item.typeId] || 'subsidy'" width="24" height="24")
                div
                  div(class="flex items-baseline gap-2.5")
                    span(class="text-sm font-semibold text-slate-900") {{item.typeName}}
                  div(class="mt-2 text-slate-400 text-xs")
                    span(class="text-xs font-medium text-slate-400") {{item.deptName}}
                div(class="flex-1  text-right")
                  span(class="font-medium text-slate-800 mr-1") ¥
                  span(class="text-xl font-bold text-slate-800") {{utils.formatCurrency(item.amount || 0)}}
        //- div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
          div(class="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-400")
          div(class="p-5 pl-7 w-[100%]")
            div(class="flex gap-5")
              div(class="flex flex-col items-center")
                div(class="size-12 rounded-2xl bg-teal-400/10 flex items-center justify-center")
                  van-image(:src="traffic" width="24" height="24")
              div
                div(class="flex items-baseline gap-2.5")
                  span(class="text-sm font-semibold text-slate-900") 交通补助
                div(class="mt-2 text-slate-400 text-xs")
                  span(class="text-xs font-medium text-slate-400") 加班打车报销
              div(class="flex-1 text-xl font-bold text-slate-800 text-right")  30.00
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import { utils } from '@/assets/scripts/utils'
import traffic from '@/assets/images/icon/traffic.svg'
import dning from '@/assets/images/icon/dning.svg'
import subsidy from '@/assets/images/icon/subsidy.svg'
import fullAttendance from '@/assets/images/icon/full-attendance.svg'
import { isEmpty } from 'lodash'
import { useI18n } from '@/i18n'
import { useStatisticsStore } from '@/stores/statistics'
const statisticsStore: any = useStatisticsStore()
const { t, locale } = useI18n()
// const props = defineProps({
//   date: {
//     type: Object,
//     default: () => ({
//       // allowanceNum: 0,
//       allowanceTotal: 0,
//       allowanceDays: 0,
//       slectSinginData: [],
//       selectedDate: '',
//     }),
//   },
// })
const typeIconList = ref({
  '1': subsidy,
  '2': traffic,
  '3': fullAttendance,
  '4': dning,
})
const data = computed(() => {
  return statisticsStore.allowanceForDay || {}
})
const currentDay = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY-MM-DD')
});
// // const allowanceNum = computed(() => props.date.allowanceNum)
// const allowanceTotal = computed(() => props.date.allowanceTotal)
// const allowanceDays = computed(() => props.date.allowanceDays)
// const selectedDate = computed(() => props.date.selectedDate)
// const slectSinginData = computed(() => props.date.slectSinginData)
</script>