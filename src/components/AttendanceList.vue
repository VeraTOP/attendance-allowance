<template lang="pug">
#AttendanceList(class="px-5 mt-6")
  div(class="flex items-center justify-between mb-5 px-1")
    p(class="text-[17px] font-bold text-slate-800 tracking-tight") {{t('attendanceDetail')}}
    p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") {{t('viewAll')}}
      van-icon(name="arrow" class="ml-1")
  div(v-if="!isEmpty(list)" v-for="item in list" :key="item.id" class="mb-3 group relative flex items-center gap-4 py-4 rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-slate-100")
    div(class="")
    van-row(class="" :gutter="24")
      van-col(:span="6")
        div(v-if="item.status == '1'" class="flex items-center justify-center rounded-2xl bg-green-50 text-green-600 w-12 h-12 shadow-sm border border-green-100/50")
          van-icon( name="passed" size="24")
        div(v-else-if="item.status == '2'" class="flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600 w-12 h-12 shadow-sm border border-amber-100/50")
          van-icon(name="underway-o" size="24")
      van-col(:span="18")
        p(class="text-[17px] font-bold text-slate-800 tracking-tight") {{t('attendanceType.' + item.status)}}
        p(class="text-[13px] text-slate-500 leading-relaxed mt-1")
          van-icon(name="clock-o" size="12" class="mr-1")
          span(v-if="item.attendanceStartDatetime") {{dateUtil.format(item.attendanceStartDatetime, (locale === 'zh-CN' ? 'MM月DD日 HH:mm' : 'DD/MM HH:mm'))}}
          span(v-else) --:--
        //- p(class="text-[13px] text-slate-500 leading-relaxed mt-1")
          van-icon(name="location-o" size="12" class="mr-1")
          span {{item.position}}
        //- p(class="text-[15px] text-slate-500 tracking-tight") {{item.status}}
  div(v-else)
    van-empty(class="p-0 mb-6" :description="t('noAttendanceDetail')" image-size="8rem")

</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { isEmpty } from 'lodash'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from '@/i18n'
import { dateUtil } from '@/assets/scripts/date-util'
const { t, locale } = useI18n()
const router = useRouter()

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const list = computed(() => props.data?.slice(0, 5) )

const handleClick = () => {
  router.push({ name: 'attendance-details' })
}
</script>