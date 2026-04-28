<template lang="pug">
#AttendanceDetails(ref="containerRef")
  van-sticky(:container="containerRef" :offset-top="46" )
    van-row(:gutter="16" class="mb-2 bg-[#f5f7fa] p-4")
      van-col(:span="10")
        //- div(class="flex justify-center") {{currentDate}}
        van-button(type="primary" round class="h-8" plain @click="onClick")
          //- span {{isEmpty(selectedDate) ? currentDates :  `${selectedDate[0]}年${selectedDate[1]}月`}}
          span(v-if="locale === 'zh-CN'") {{isEmpty(selectedDate) ? dateUtil.formatDate(new Date(), 'YYYY年MM月') : `${selectedDate[0]}年${selectedDate[1]}月`}}
          span(v-else) {{isEmpty(selectedDate) ? dateUtil.formatDate(new Date(), 'YYYY/MM') : `${selectedDate[1]}/${selectedDate[0]}`}}
          van-icon(name="notes-o" size="18" class="relative top-[1px]")
        //- img(:src="calendar" width="18" height="18" class="inline ml-1 icon-white relative -top-0.5")
        //- van-icon(name="check")
  div(class="px-4")
    template(v-if="!isEmpty(list)" v-for="item in list" :key="item.id")
      AttendanceItem(:data="item")
      //- p {{item}}
    div(v-else)
      van-empty(class="p-0 mb-6" :description="t('noAttendanceDetail')" image-size="8rem")
  van-popup(v-model:show="isPicker" position="bottom")
      van-date-picker(v-model="dateValue" :title="t('selectYearMonth')" :max-date="new Date()" :columns-type="columnsType" @confirm="handleConfirm")
  //-   van-col(:span="8")
  //-     van-button(type="primary" plain) 全部类型
  //-   van-col(:span="8")
  //-     van-button(type="primary" plain) 异常考勤
</template>

<script setup lang="ts">
import  { ref, computed, onMounted } from 'vue'
import { isEmpty } from 'lodash'
import { dateUtil } from '@/assets/scripts/date-util'
import AttendanceItem from '@/components/AttendanceItem.vue'
import { Allowance } from '@/api/index'
import { useI18n } from '@/i18n'

const { t, locale } = useI18n()

const containerRef = ref(null)

const currentDate = computed(() => {
  // return '2026-02'
  return dateUtil.formatDate(new Date(), 'YYYY-MM')
  // return {
  //   date: dateUtil.formatDate(new Date(), 'YYYY-MM'),
  //   info: dateUtil.formatDate(new Date(), 'YYYY年MM月')
  // }
})
const list = ref([])
const getAttendanceList = async (date: string = currentDate.value) => {
  const params = {
    attendanceMonth: date,
    // attendanceMonth: currentDate.value,
    current: 1,
    size: 31
  }
  const res = await Allowance.getAttendanceInfoList(params)
  console.log('getAttendanceList', res)
  list.value = res.data?.records || []
}

const isPicker = ref(false)
const selectedDate = ref()
const dateValue = ref(dateUtil.formatDate(new Date(), 'YYYY-MM').split('-'));
const columnsType = ref(['year', 'month'])

const onClick = () => {
  isPicker.value = true
}
const handleConfirm = (date: any) => {
  isPicker.value = false
  console.log(date)
  selectedDate.value = date.selectedValues
  getAttendanceList(selectedDate.value.join('-'))
  // 格式化日期为YYYY-MM-DD格式
  // const formattedDate = dateUtil.formatDate(date, 'YYYY-MM-DD')
  // 更新当前日期显示
  // currentDate.value = formattedDate
}
onMounted(() => {
  getAttendanceList()
})
</script>

<style lang="scss">
// 考勤明细页面样式

</style>