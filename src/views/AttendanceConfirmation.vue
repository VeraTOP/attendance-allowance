<template lang="pug">
#AttendanceConfirmation(class="px-4")
  //- p {{selectedDate}}
  div(class="flex justify-center py-6")
    van-button(type="primary" plain round class="w-56" size="large" @click="onClick")
      div(class="flex items-center gap-2")
        span(class="inline-block bg-primary rounded-full w-6 h-6 flex items-center justify-center")
          van-icon(name="notes-o" size="16" color="var(--van-white)" class="m-1")
        span(class="text-lg font-bold text-slate-800 dark:text-white tracking-tight") {{isEmpty(selectedDate) ? currentDate :  `${selectedDate[0]}年${selectedDate[1]}月`}}
        span
          van-icon(name="play" size="12" color="var(--van-blue)" class="rotate-90")
  van-row(gutter="16")
    van-col(class="" span="8")
      div(class="text-center bg-white rounded-3xl overflow-hidden px-2 py-4 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-blue-50 ")
        van-icon(name="fire-o" size="24" color="var(--van-blue)")
        div(class="mt-2")
          p(class="text-xl font-bold text-slate-850 tracking-tight") {{days}}
          p(class="text-xs text-slate-400 mt-1") 连续考勤(天)
    van-col(class="" span="8")
      div(class="text-center bg-white rounded-3xl overflow-hidden px-2 py-4 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-blue-50")
        van-icon(name="notes-o" size="24" color="var(--van-blue)")
        div(class="mt-2")
          p(class="text-xl font-bold text-slate-850 tracking-tight") {{number}}
          p(class="text-xs text-slate-400 mt-1") 出勤天数
    van-col(class="" span="8")
      div(class="text-center bg-white rounded-3xl overflow-hidden px-2 py-4 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-blue-50")
        van-icon(name="gold-coin-o" size="24" color="var(--van-blue)")
        div(class="mt-2")
          p(class="text-xl font-bold text-slate-850 tracking-tight mr-1") {{number}}
          p(class="text-xs text-slate-400 mt-1") 预计补助
  DailyDetails(class="mt-6 mb-36")
  div(class="fixed bottom-0 left-0 right-0 px-6 py-5 bg-white van-hairline--top-bottom van-safe-area-bottom border-t border-slate-200/60")
    van-checkbox(class="mr-2 mb-4" shape="square" v-model="isChecked")
      span(class="text-sm font-medium text-slate-500 dark:text-slate-400") 本人已核对无误，确认数据真实有效
    van-button(class="rounded-xl bg-primary-gradient shadow-lg shadow-sky-500/30" type="primary" size="large" :disabled="!isChecked")
      span(class="text-[17px]") 确认考勤
      van-icon(name="passed" size="20" class="ml-2 relative top-[2px]")
  van-popup(v-model:show="isPicker" position="bottom")
    van-date-picker(v-model="dateValue" title="选择年月" :max-date="new Date()" :columns-type="columnsType" @confirm="handleConfirm")
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { dateUtil } from '@/assets/scripts/date-util'
  import DailyDetails from '@/components/DailyDetails.vue'
  import { isEmpty } from 'lodash'
  // 使用日期工具格式化日期
const currentDate = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY年MM月')
})

// 模拟数据
const days = ref(22)
const number = ref(1)

// 确认考勤复选框
const isChecked = ref(false)
const isPicker = ref(false)

const columnsType = ref(['year', 'month']);
const selectedDate = ref();
const dateValue = ref(dateUtil.formatDate(new Date(), 'YYYY-MM').split('-'));
const onClick = () => {
  isPicker.value = true
}
// 处理日期选择确认
const handleConfirm = (date: any) => {
  isPicker.value = false
  console.log(date)
  selectedDate.value = date.selectedValues
  // 格式化日期为YYYY-MM-DD格式
  // const formattedDate = dateUtil.formatDate(date, 'YYYY-MM-DD')
  // 更新当前日期显示
  // currentDate.value = formattedDate
}
</script>

<style lang="scss">
  .van-checkbox__icon .van-icon {
    border-radius: 0.375rem;
  }
</style>