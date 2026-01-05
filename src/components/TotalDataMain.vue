<template lang="pug">
#TotalData(class="px-5")
  //- p 总数据
  van-row(gutter="24")
    van-col(class="" span="12")
      div(class="bg-white rounded-3xl overflow-hidden p-5 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-blue-50 ")
        div(class="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--van-primary-color-lightest)] mx-auto")
          //- van-image(:src="calendar" class="w-6 h-6")
          van-icon(name="passed" size="24" color="var(--van-blue)")
        div(class="mt-4 text-center")
          p(class="text-xs text-slate-400") {{currentDate}}出勤
          p(class="mt-1")
            span(class="text-xl font-bold text-slate-850 tracking-tight mr-1") {{days}}
            span(class="text-sm font-medium text-slate-400") 天
    van-col(class="" span="12")
      div(class="bg-white rounded-3xl overflow-hidden p-5 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-blue-50")
        div(class="w-11 h-11 rounded-2xl flex items-center justify-center bg-orange-50 mx-auto")
          //- van-image(:src="cash" class="w-6 h-6")
          van-icon(name="underway-o" size="24" color="#f97316")
        div(class="mt-4 text-center")
          p(class="text-xs text-slate-400 mt-1") 待确认
          p(class="mt-1")
            span(class="text-xl font-bold text-orange-500 tracking-tight mr-1") {{number}}
            span(class="text-sm font-medium text-orange-300") 项

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