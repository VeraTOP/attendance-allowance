<template lang="pug">
#ToBeDone(class="px-5 mt-6")
  p(class="px-1 text-[17px] font-bold text-slate-800 tracking-tight flex items-center gap-2") 待办
    span(v-if="!isEmpty(data)" class="flex h-2 w-2 relative")
      span(class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75")
      span(class="relative inline-flex rounded-full h-2 w-2 bg-red-500")
  div(v-if="!isEmpty(data)" class="mt-4 snap-center shrink-0 w-full sm:w-[340px] relative overflow-hidden rounded-3xl bg-white p-6 shadow-card hover:shadow-card-hover border border-slate-100 transition-all duration-300 active:scale-[0.99]")
    div(class="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none animate-pulse-slow")
    van-row(class="")
      van-col(:span="6")
        div(class="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm")
          van-icon(name="fail" size="24")
      van-col(:span="18")
        p(class="text-[17px] font-bold text-slate-800 leading-tight") {{data.title}}
        p(class="text-[13px] text-slate-500 leading-relaxed mt-1") {{data.describe}}
        //- p(class="text-[15px] text-slate-500 tracking-tight") {{data.status}}
    van-button(class="w-full mt-4" type="primary" class="rounded-xl" @click="handleClick") 立即查看
      van-icon(name="arrow" class="ml-1")
  div(v-else)
    van-empty(class="p-0" image="search" description="暂无待办任务" image-size="8rem")
    // p(class="text-[15px] text-slate-500 tracking-tight") 暂无待办任务
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
import { isEmpty } from 'lodash'
// const data = ref()
const data = ref({
  title: '考勤确认',
  describe: '10月考勤数据已生成，请在10月31日之前确认',
  status: '待确认'
})

const handleClick = () => {
  console.log('点击了立即查看')
  router.push({ name: 'attendance-confirmation' })
}
</script>
