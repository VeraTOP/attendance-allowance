<template lang="pug">
#AllowanceDetails(class="p-4")
  van-row(:gutter="16" class="mb-2")
    van-col(:span="10")
      //- div(class="flex justify-center") {{currentDate}}
      van-button(type="primary" round class="h-8" plain @click="onClick")
        span {{isEmpty(selectedDate) ? currentDate :  `${selectedDate[0]}年${selectedDate[1]}月`}}
        van-icon(name="notes-o" size="18" class="relative top-[1px]")
  div(class="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-sky-600 via-sky-500 to-sky-600 p-6 shadow-soft shadow-blue-500/20 ring-1 ring-black/5")
    div(class="text-sm font-medium text-sky-50") 本月实发补助
    div(class="text-white mt-2")
      span(class="text-2xl font-semibold opacity-90 mr-1") ¥
      span(class="text-4xl font-semibold tracking-tight") {{utils.formatCurrency(totalAmount)}}
  div(class="mt-4 mb-2 flex items-center justify-between")
    span(class="text-base font-bold text-slate-800") 明细记录
    span(class="text-xs text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100") 共{{list.length}}条
  template(v-for="item in list" :key="item.id")
    AllowanceItem(:data="item")
  van-popup(v-model:show="isPicker" position="bottom")
    van-date-picker(v-model="dateValue" title="选择年月" :max-date="new Date()" :columns-type="columnsType" @confirm="handleConfirm")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { isEmpty } from 'lodash'
import { dateUtil } from '@/assets/scripts/date-util'
import { utils } from '@/assets/scripts/utils'
import AllowanceItem from '@/components/AllowanceItem.vue'


const currentDate = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY年MM月')
})
const isPicker = ref(false)
const selectedDate = ref()
const dateValue = ref(dateUtil.formatDate(new Date(), 'YYYY-MM').split('-'));
const columnsType = ref(['year', 'month'])
const totalAmount = ref(1200)
const list = ref([
  {
    id: 1,
    name: "餐饮补助",
    datetime: '2023-08-01 08:00:00',
    type: 1,
    status: 1,
    allowance: 100,
  },
  {
    id: 2,
    name: "交通补助",
    datetime: '2023-08-02 08:00:00',
    type: 2,
    status: 2,
    allowance: 50,
  },
  // {
  //   id: 3,
  //   name: "加班补助",
  //   datetime: '2023-08-03 08:00:00',
  //   type: 3,
  //   status: 1,
  //   allowance: 200,
  // },
])

const onClick = () => {
  isPicker.value = true
}
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
// 考勤明细页面样式

</style>