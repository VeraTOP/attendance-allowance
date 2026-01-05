<template lang="pug">
  div
    van-row(:gutter="16")
      van-col(span="12")
        div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
            span(class="text-xs font-bold text-slate-400") 本月预计补助
          div
            span(class="text-3xl font-bold text-slate-800 tracking-tight") 888
            span(class="text-xs font-medium text-slate-400 ml-1.5") 元
      van-col(span="12")
        div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            van-icon(name="notes-o" color="#0d9488" size="18")
            span(class="text-xs font-bold text-slate-400") 发放天数
          div
            span(class="text-3xl font-bold text-slate-800 tracking-tight") 20
            span(class="text-xs font-medium text-slate-400 ml-1.5") 天
    div(class="mt-6")
      div(class="flex items-center justify-between mb-5")
        h3(class="text-lg font-bold text-slate-800 flex items-center gap-3") {{currentDay}}
          span(class="text-[10px] font-bold px-2.5 rounded-full bg-[--van-blue-lightest] text-[--van-blue] border border-[--van-blue-lighter] shadow-sm") 今日
        //- p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") 查看全部
          //- van-icon(name="arrow" class="ml-1")
      div(class="space-y-4")
        div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
          div(class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary")
          div(class="p-5 pl-7 w-[100%]")
            div(class="flex gap-5")
              div(class="flex flex-col items-center")
                div(class="size-12 rounded-2xl bg-[var(--van-blue-lightest)] flex items-center justify-center")
                  van-image(:src="dning" width="24" height="24")
              div
                div(class="flex items-baseline gap-2.5")
                  span(class="text-sm font-semibold text-slate-900") 餐饮补助
                div(class="mt-2 text-slate-400 text-xs")
                  span(class="text-xs font-medium text-slate-400") 每日固定餐补
              div(class="flex-1 text-xl font-bold text-slate-800 text-right") 30.00
        div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
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
import traffic from '@/assets/images/icon/traffic.svg'
import dning from '@/assets/images/icon/dning.svg'
const currentDay = computed(() => {
  return dateUtil.formatDate(new Date(), 'MM月DD日');
});

</script>