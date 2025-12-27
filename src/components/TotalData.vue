<template lang="pug">
#TotalData(class="px-5 mt-8")
  //- p 总数据
  van-row(gutter="24")
    van-col(class="" span="12")
      div(class="bg-white rounded-3xl overflow-hidden p-5 relative")
        div(class="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110 duration-500")
        div(class="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--van-primary-color-lightest)]")
          van-image(:src="calendar" class="w-6 h-6")
          //- van-icon(name="notes-o" size="24" color="var(--van-primary-color)")
        div(class="mt-4")
          p(class="text-xs text-slate-400") {{currentDate}}出勤
          p(class="mt-1")
            span(class="text-3xl font-bold text-slate-850 tracking-tight mr-1") {{days}}
            span(class="text-sm font-medium text-slate-400") /  {{daysInCurrentMonth}}
          p(class="mt-3")
            van-progress(:percentage="progressNum" color="linear-gradient(to right, #38bdf8, #0284c7)" :show-pivot="false" stroke-width="8")
          //- p(class="text-lg font-bold text-[#303133]") {{ totalDays }}
          //- p(class="text-xs text-slate-400 mt-1") 统计至 {{ currentDate }}
    van-col(class="" span="12")
      div(class="bg-white rounded-3xl overflow-hidden p-5 relative")
        div(class="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110 duration-500")
        div(class="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--van-blue-lightest)]")
          van-image(:src="cash" class="w-6 h-6")
          //- van-icon(name="pending-payment" size="24" color="var(--van-blue)")
        div(class="mt-4")
          p(class="text-xs text-slate-400 mt-1") 补助预估
          p(class="mt-1")
            span(class="text-3xl font-bold text-slate-850 tracking-tight mr-1") {{number}}
            span(class="text-sm font-medium text-slate-400") 次
          p(class="mt-5")
          //- p(class="text-lg font-bold text-[#303133]") ¥{{ totalAmount }}
          //- p(class="text-xs text-slate-400 mt-1") 上次更新 {{ updateTime }}

</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import calendar from '@/assets/images/icon/calendar.svg'
import cash from '@/assets/images/icon/cash.svg'
import { dateUtil } from '@/assets/scripts/date-util'

// 模拟数据
const days = ref(22)
const number = ref(31)
// const updateDate = ref('2025-12-27 10:30:00')

// 使用日期工具格式化日期
const currentDate = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY.MM')
})
// 计算进度百分比
const progressNum = computed(() => {
  return days.value / daysInCurrentMonth.value * 100
})
// 使用新增的获取月份总天数功能
const daysInCurrentMonth = computed(() => {
  return dateUtil.getDaysInCurrentMonth()
})

// 获取指定月份的天数示例
// const daysInFebruary = computed(() => {
//   return dateUtil.getDaysInMonth('2025-02-01')
// })

// const updateTime = computed(() => {
//   return dateUtil.fromNow(updateDate.value)
// })
</script>

<style scoped lang="scss">

</style>