<template lang="pug">
#AllowanceDetails(ref="containerRef")
  //- h3 1
  van-sticky(:container="containerRef" :offset-top="46" )
    van-row(:gutter="16" class="bg-[#f5f7fa] p-4")
      van-col(:span="10")
        //- div(class="flex justify-center") {{currentDate}}
        van-button(type="primary" round class="h-8" plain @click="onClick")
          span {{isEmpty(selectedDate) ? currentDate :  `${selectedDate[0]}年${selectedDate[1]}月`}}
          van-icon(name="notes-o" size="18" class="relative top-[1px]")
    div(class="px-4 bg-[#f5f7fa]")
      div(class="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-sky-600 via-sky-500 to-sky-600 p-6 shadow-soft shadow-blue-500/20 ring-1 ring-black/5")
        div(class="text-sm font-medium text-sky-50") {{t('totalAllowance')}}
        div(class="text-white mt-2")
          span(class="text-2xl font-semibold opacity-90 mr-1") ¥
          span(class="text-4xl font-semibold tracking-tight") {{utils.formatCurrency(totalAmount || 0)}}
  div(class="px-4")
    div(class="mt-4 mb-2 flex items-center justify-between")
      span(class="text-base font-bold text-slate-800") {{t('allowanceDetail')}}
      span(class="text-xs text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100") 共{{list.length}}条
    template(v-for="item in list")
      AllowanceItem(:data="item")
  van-popup(v-model:show="isPicker" position="bottom")
    van-date-picker(v-model="dateValue" :title="t('selectYearMonth')" :max-date="new Date()" :columns-type="columnsType" @confirm="handleConfirm")
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { isEmpty, sumBy } from 'lodash'
import { dateUtil } from '@/assets/scripts/date-util'
import { utils } from '@/assets/scripts/utils'
import AllowanceItem from '@/components/AllowanceItem.vue'
import { Allowance } from '@/api'
import { useI18n } from '@/i18n'
const { t } = useI18n()

const currentDate = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY-MM')
})
const isPicker = ref(false)
const selectedDate = ref()
const dateValue = ref(dateUtil.formatDate(new Date(), 'YYYY-MM').split('-'));
const columnsType = ref(['year', 'month'])
const totalAmount = ref(0)
// const list = ref([
//   {
//     id: 1,
//     name: "餐饮补助",
//     datetime: '2023-08-01 08:00:00',
//     type: 1,
//     status: 1,
//     allowance: 100,
//   },
//   {
//     id: 2,
//     name: "交通补助",
//     datetime: '2023-08-02 08:00:00',
//     type: 2,
//     status: 2,
//     allowance: 50,
//   },
//   // {
//   //   id: 3,
//   //   name: "加班补助",
//   //   datetime: '2023-08-03 08:00:00',
//   //   type: 3,
//   //   status: 1,
//   //   allowance: 200,
//   // },
// ])
const list = ref([])
const onClick = () => {
  isPicker.value = true
}
const handleConfirm = (date: any) => {
  isPicker.value = false
  console.log(date)
  selectedDate.value = date.selectedValues
  getAllowanceList(selectedDate.value.join('-'))
  // 格式化日期为YYYY-MM-DD格式
  // const formattedDate = dateUtil.formatDate(date, 'YYYY-MM-DD')
  // 更新当前日期显示
  // currentDate.value = formattedDate
}
const getAllowanceList = async (date: string = currentDate.value) => {
  const params = {
    allowanceMonth: date
  }
  const res = await Allowance.getAllowanceSummary(params)
  console.log('getAllowanceSummary', res)
  list.value = res.data || []
  totalAmount.value = sumBy(list.value, (item: any) => item.amount)
}
onMounted(() => {
  getAllowanceList()
})
</script>

<style lang="scss">
// 考勤明细页面样式

</style>