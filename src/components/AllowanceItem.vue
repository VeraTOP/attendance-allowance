<template lang="pug">
#AttendanceItem(class="mb-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-card active:scale-[0.99] active:shadow-sm transition-all cursor-pointer group relative overflow-hidden")
  van-row(:gutter="0")
    van-col(:span="5")
      //- p {{item.type}}
      template(v-if="item.type === 1")
        div(class="w-12 h-12 p-2 bg-[var(--van-blue-lightest)] rounded-2xl flex items-center justify-center")
          img(:src="dning" width="24" height="24" )
      template(v-if="item.type === 2")
        div(class="w-12 h-12 p-2 bg-teal-400/10 rounded-2xl flex items-center justify-center")
          img(:src="traffic" width="24" height="24" )
    van-col(:span="10")
      div(class="font-bold text-slate-800 text-[15px]") {{item.name}}
      div(class="font-medium text-slate-400 mt-2 text-xs") {{dateUtil.format(item.date, 'MM-DD hh:mm')}}
    van-col(:span="9")
      div(class="font-bold text-slate-800 text-[17px] text-right") {{utils.formatCurrency(item.allowance)}}
      div(class="mt-1 float-right")
        span(v-if="item.status === 1" class="rounded-md bg-emerald-50 px-2 py-1 text-emerald-600 text-xs") 已发放
        span(v-else-if="item.status === 2" class="rounded-md bg-amber-50 px-2 py-1 text-amber-600 text-xs") 待审核
        //- div() {{item.status === 1 ? '已发放' : item.status === 2 ? '待审核' : ''}}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import { utils } from '@/assets/scripts/utils'
import traffic from '@/assets/images/icon/traffic.svg'
import dning from '@/assets/images/icon/dning.svg'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const item = computed(() => props.data)
// 考勤明细项组件逻辑
</script>

<style scoped lang="scss">
// 考勤明细项组件样式
</style>