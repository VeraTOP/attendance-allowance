<template lang="pug">
#Statistics
  div(class="mx-10 py-3")
    //- p --{{active}}
    van-tabs(van-tabs v-model:active="active" type="card")
      van-tab(title="考勤日历" :name="1")
      van-tab(title="补助日历" :name="2")
  div(class="px-5")
    van-calendar(title="" :poppable="false" :show-confirm="false" switch-mode="month" :show-title="false" :formatter="formatter")
      //- template(#subtitle )
      template(#bottom-info="{ type, bottomInfo }")
        div(v-if="type !== 'selected'")
          div(v-if="bottomInfo === '1'" class="m-auto size-1.5 rounded-full bg-[--van-blue] shadow-glow group-hover:scale-125 transition-transform duration-300")
          div(v-else-if="bottomInfo === '2'" class="m-auto size-1.5 rounded-full bg-orange-400 shadow-glow-orange group-hover:scale-125 transition-transform duration-300")
  div(class="px-5 py-3 bg-white rounded-t-[2.25rem] mt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.03)] border-t border-slate-50/80")
    div(class="w-full flex justify-center pb-4 cursor-grab active:cursor-grabbing")
      div(class="w-12 h-1.5 bg-slate-200/80 rounded-full hover:bg-slate-300 transition-colors")
    AttendStatisticsDetail(v-if="active === 1")
    AllowanceStatisticsDetail(v-else-if="active === 2")
    //- van-row(:gutter="16")
    //-   van-col(span="12")
    //-     div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
    //-       template(v-if="active === 1")
    //-         div(class="flex items-center gap-2")
    //-           //- van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
    //-           span(class="flex h-2.5 w-2.5 rounded-full bg-primary shadow-glow")
    //-           span(class="text-xs font-bold text-slate-400") 本月出勤
    //-         div
    //-           span(class="text-3xl font-bold text-slate-800 tracking-tight") 22
    //-           span(class="text-xs font-medium text-slate-400 ml-1.5") 天
    //-       template(v-if="active === 2")
    //-         div(class="flex items-center gap-2")
    //-           van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
    //-           span(class="text-xs font-bold text-slate-400") 本月预计补助
    //-         div
    //-           span(class="text-3xl font-bold text-slate-800 tracking-tight") 888
    //-           span(class="text-xs font-medium text-slate-400 ml-1.5") 元
    //-   van-col(span="12")
    //-     div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
    //-       template(v-if="active === 1")
    //-         div(class="flex items-center gap-2")
    //-           //- van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
    //-           span(class="flex h-2.5 w-2.5 rounded-full bg-orange-500 shadow-glow-orange animate-pulse")
    //-           span(class="text-xs font-bold text-slate-400") 本月异常
    //-         div
    //-           span(class="text-3xl font-bold text-slate-800 tracking-tight") 1
    //-           span(class="text-xs font-medium text-slate-400 ml-1.5") 次
    //-       template(v-if="active === 2")
    //-         div(class="flex items-center gap-2")
    //-           van-icon(name="notes-o" color="#0d9488" size="18")
    //-           span(class="text-xs font-bold text-slate-400") 发放天数
    //-         div
    //-           span(class="text-3xl font-bold text-slate-800 tracking-tight") 20
    //-           span(class="text-xs font-medium text-slate-400 ml-1.5") 天
    //- div(class="mt-6")
    //-   div(class="flex items-center justify-between mb-5")
    //-     h3(class="text-lg font-bold text-slate-800 flex items-center gap-3") {{currentDay}}
    //-       span(class="text-[10px] font-bold px-2.5 rounded-full bg-[--van-blue-lightest] text-[--van-blue] border border-[--van-blue-lighter] shadow-sm") 今日
    //-     //- p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") 查看全部
    //-       //- van-icon(name="arrow" class="ml-1")
    //-   div(class="space-y-4" v-if="active === 1")
    //-     div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
    //-       div(class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary")
    //-       div(class="p-5 pl-7 flex justify-between items-center")
    //-         div(class="flex gap-5")
    //-           div(class="flex flex-col items-center pt-2")
    //-             div(class="size-3.5 rounded-full border-[3px] border-primary bg-white relative z-10 shadow-sm ring-2 ring-blue-50")
    //-             div(class="w-0.5 h-16 bg-slate-100 -mt-1 rounded-b-full group-hover:bg-blue-100 transition-colors duration-500")
    //-           div
    //-             div(class="flex items-baseline gap-2.5")
    //-               span(class="text-sm font-semibold text-slate-900") 上班打卡
    //-               span(class="text-xl font-bold text-slate-800 font-mono tracking-tight group-hover:text-primary transition-colors") 08:55
    //-             div(class="mt-2 text-slate-400 text-xs")
    //-               van-icon(name="location-o")
    //-               span(class="text-xs font-medium text-slate-400 ml-1.5") 打卡地址
    //-             div(class="mt-3")
    //-               span(class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-600 border border-green-200/50") 正常
    //-     div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
    //-       div(class="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200")
    //-       div(class="p-5 pl-7 flex justify-between items-center")
    //-         div(class="flex gap-5")
    //-           div(class="flex flex-col items-center pt-2")
    //-             div(class="w-0.5 h-10 bg-slate-100 -mt-1 rounded-b-full group-hover:bg-blue-100 transition-colors duration-500")
    //-             div(class="size-3.5 rounded-full border-[3px] border-slate-200 bg-white relative z-10 shadow-sm ring-2 ring-blue-50")
    //-           div
    //-             div(class="flex items-baseline gap-2.5")
    //-               span(class="text-sm font-semibold text-slate-900") 下班打卡
    //-               span(class="text-xl font-bold text-slate-800 font-mono tracking-tight group-hover:text-primary transition-colors") --:--
    //-             //- div(class="mt-2 text-slate-400 text-xs")
    //-               van-icon(name="location-o")
    //-               span(class="text-xs font-medium text-slate-400 ml-1.5") 打卡地址
    //-             div(class="mt-3")
    //-               span(class="text-slate-400 italic text-xs") 未打卡



</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { dateUtil } from '@/assets/scripts/date-util'
import { isEmpty } from 'lodash'
import AttendStatisticsDetail from '@/components/AttendStatisticsDetail.vue'
import AllowanceStatisticsDetail from '@/components/AllowanceStatisticsDetail.vue'
// 统计页面逻辑
const active = ref(1)
const singinData :any = ref([]);
const unSigninData :any = ref([]);
const formatter = computed(() => {
  // if (!singinData.value) {
  //   return (day: any) => day;
  // }
  if (isEmpty(singinData.value) || isEmpty(unSigninData.value)) {
    return (day: any) => day;
  }
  return (day: any) => {
    // day.bottomInfo = asyncData.value;
    if (singinData.value.includes(dateUtil.formatDate(day.date))) {
      // day.className = 'success-label'
      day.bottomInfo = '1'
    } else if (unSigninData.value.includes(dateUtil.formatDate(day.date))) {
      // day.className = 'danger-label'
      day.bottomInfo = '2'
    } else {
      day.bottomInfo = '0'
    }
    // console.log(day, dateUtil.formatDate(day.date))
    // day.bottomInfo = '0'
    // day.className = 'rt-1'
    return day;
  };
});
const currentDay = computed(() => {
  return dateUtil.formatDate(new Date(), 'MM月DD日');
});
setTimeout(() => {
  singinData.value = ['2025-12-01', '2025-12-03', '2025-12-05', '2025-12-06', '2025-12-07', '2025-12-08'];
  unSigninData.value = ['2025-12-02', '2025-12-04', '2025-12-09'];
}, 1000);

</script>

<style lang="scss">
  .van-tabs__nav--card {
    border: none;
    border-radius: 5rem;
    // overflow: hidden;
    padding: 0.5rem;

  }
  .van-tab--card.van-tab--active {
    border-radius: 5rem;
    // --tw-shadow-color: rgb(14, 165, 233, 0.3);
    // --tw-shadow: var(--tw-shadow-colored);
  }
  .van-tab--card {
    border-right: none;
  }
  .van-tabs__nav {
    --tw-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.2);
    --tw-shadow-colored: 0 10px 25px -5px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  .van-tabs__wrap {
    overflow: visible;
  }
// 统计页面样式
.van-calendar {
  background: none;
}
.van-calendar__header {
  box-shadow: none;
}
.van-calendar__selected-day {
  border-radius: var(--van-radius-max);
}
.shadow-glow {
  --tw-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
  --tw-shadow-colored: 0 0 10px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-glow-orange {
  --tw-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
  --tw-shadow-colored: 0 0 10px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>