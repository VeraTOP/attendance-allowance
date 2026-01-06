<template lang="pug">
#AttendanceDetails(class="p-4")
  van-row(:gutter="16" class="mb-3")
    van-col(:span="10")
      //- div(class="flex justify-center") {{currentDate}}
      van-button(type="primary" round class="h-8"  @click="onClick")
        span {{isEmpty(selectedDate) ? currentDate :  `${selectedDate[0]}年${selectedDate[1]}月`}}
        img(:src="calendar" width="18" height="18" class="inline ml-1 icon-white relative -top-0.5")
        //- van-icon(name="check")
  template(v-for="item in list" :key="item.id")
    AttendanceItem(:data="item")
  van-popup(v-model:show="isPicker" position="bottom")
    van-date-picker(v-model="dateValue" title="选择年月" :max-date="new Date()" :columns-type="columnsType" @confirm="handleConfirm")
  //-   van-col(:span="8")
  //-     van-button(type="primary" plain) 全部类型
  //-   van-col(:span="8")
  //-     van-button(type="primary" plain) 异常考勤
</template>

<script setup lang="ts">
import  { ref, computed } from 'vue'
import { isEmpty } from 'lodash'
import { dateUtil } from '@/assets/scripts/date-util'
import AttendanceItem from '@/components/attendanceItem.vue'
import calendar from '@/assets/images/icon/calendar.svg'


const currentDate = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY年MM月')
})
// 考勤明细页面逻辑
const list = ref([
  {
    id: 1,
    title: '正常考勤',
    // describe: '10月考勤数据已生成，请在10月31日之前确认',
    // datetime: '2023-10-01 00:00:00',
    date: '2023-10-9',
    startTime: '08:00:00',
    endTime: '18:00:00',
    status: '1',
    position: '教学楼-1-203'
  },
  {
    id: 2,
    title: '迟到打卡',
    // describe: '10月考勤数据已生成，请在10÷月31日之前确认',
    // datetime: '2023-10-01 00:00:00',
    date: '2023-10-10',
    startTime: '09:23:09',
    endTime: '18:00:00',
    status: '2',
    position: '教学楼-1-203'
  }
])
const isPicker = ref(false)
const selectedDate = ref()
const dateValue = ref(dateUtil.formatDate(new Date(), 'YYYY-MM').split('-'))
const columnsType = ref(['year', 'month'])

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
.icon-white {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7472%) hue-rotate(265deg) brightness(105%) contrast(101%);
}
</style>