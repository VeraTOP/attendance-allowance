<template lang="pug">
#AttendanceList(class="px-5 mt-6")
  div(class="flex items-center justify-between mb-5 px-1")
    p(class="text-[17px] font-bold text-slate-800 tracking-tight") 考勤明细
    p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") 查看全部
      van-icon(name="arrow" class="ml-1")
  div(v-for="item in list" :key="item.id" class="mb-3 group relative flex items-center gap-4 py-4 rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-slate-100")
    div(class="")
    van-row(class="" :gutter="24")
      van-col(:span="6")
        div(v-if="item.status == '1'" class="flex items-center justify-center rounded-2xl bg-green-50 text-green-600 w-12 h-12 shadow-sm border border-green-100/50")
          van-icon( name="passed" size="24")
        div(v-else-if="item.status == '2'" class="flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600 w-12 h-12 shadow-sm border border-amber-100/50")
          van-icon(name="underway-o" size="24")
      van-col(:span="18")
        p {{item.title}}
        p(class="text-[13px] text-slate-500 leading-relaxed mt-1")
          van-icon(name="clock-o" size="12" class="mr-1")
          span {{item.datetime}}
        p(class="text-[13px] text-slate-500 leading-relaxed mt-1")
          van-icon(name="location-o" size="12" class="mr-1")
          span {{item.position}}
        //- p(class="text-[15px] text-slate-500 tracking-tight") {{item.status}}

</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
import { isEmpty } from 'lodash'
// const data = ref()
const list = ref([
  {
    id: 1,
    title: '正常考勤',
    // describe: '10月考勤数据已生成，请在10月31日之前确认',
    datetime: '2023-10-01 00:00:00',
    status: '1',
    position: '教学楼-1-203'
  },
  {
    id: 2,
    title: '迟到打卡',
    // describe: '10月考勤数据已生成，请在10÷月31日之前确认',
    datetime: '2023-10-01 00:00:00',
    status: '2',
    position: '教学楼-1-203'
  }
])

const handleClick = () => {
  router.push({ name: 'attendance-details' })
}
</script>