<template lang="pug">
#AttendanceList()
  //- p {{confirmData}}
  //- p {{attendanceConfirmList}}
  div(class="flex items-center justify-between mb-3 px-1")
    p(class="text-[17px] font-bold text-slate-800 tracking-tight flex items-center")
      span(class="inline-block w-1 h-4 bg-primary rounded-full mr-2")
      span {{t('dailyDetails')}}
    //- p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") 查看全部
      van-icon(name="arrow" class="ml-1")
  div(v-if="list.length === 0")
    van-empty(class="p-0" image="search" :description="t('noAttendanceDetail')" image-size="8rem")
  div(v-else v-for="item in list" :key="item.id" class="mb-3 relative p-4 rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-slate-100")
    van-row(class="mb-4" :gutter="24")
      van-col(:span="18")
        span(v-if="item.attendanceDate" class="text-[17px] font-bold text-slate-800 dark:text-white tracking-tight mr-2") {{dateUtil.format(item.attendanceDate, locale === 'zh-CN' ? 'MM月DD日' : 'DD/MM')}}
        span(v-if="item.attendanceDate" class="text-xs font-medium text-slate-400 dark:text-slate-500") {{t('dayOfWeek['+ [dateUtil.getDayOfWeek(item.attendanceDate, {type: 'number'})] + ']')}}
      van-col(:span="6")
        div(class="flex justify-end")
          span(:class="['rounded-full', item.status === 1 ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20', 'px-2.5', 'py-0.5', 'text-[11px]', 'font-bold', 'border']")
            | {{t('attendanceType.' + item.status)}}
    van-row(class="" :gutter="24")
      van-col(:span="6")
        div(class="flex items-center justify-between ")
          div
            template(v-if="item.attendanceStartDatetime")
              p(class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold") {{t('attendanceSignIn')}}
              p( class="text-base font-bold font-mono text-slate-700 dark:text-slate-200") {{dateUtil.formatTime(item.attendanceStartDatetime, 'HH:mm')}}
            template(v-else)
              p(class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold") {{t('notSignedIn')}}
              p(class="text-base font-bold font-mono text-slate-400 dark:text-slate-200") --:--
          //- div
            template(v-if="item.attendanceEndDatetime")
              p(class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold") {{t('attendanceSignOut')}}
              p(class="text-base font-bold font-mono text-slate-700 dark:text-slate-200") {{dateUtil.formatTime(item.attendanceEndDatetime, 'HH:mm')}}
            template(v-else)
              p(class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold") {{t('notSignedOut')}}
              p(class="text-base font-bold font-mono text-slate-400 dark:text-slate-200") --:--
      van-col(:span="18")
        div(class="flex justify-end items-end" class="h-full" )
          p(v-if="isEmpty(item?.roundTrip) && confirmStatus === 0" class="text-xs text-slate-500 dark:text-slate-300" @click="handleMarkRoundTrip(item)")
            van-icon(name="edit" size="12" class="mr-1")
            span {{t('markRoundTrip')}}
          div(v-else class="")
            //- p {{item?.roundTrip?.back === 1 ? t('roundTrip') : ''}}
            span(v-if="item?.roundTrip?.reason") {{t('roundTrip') + t('reason')}}: {{item?.roundTrip?.reason}}
            van-icon(v-if="confirmStatus === 0" name="edit" size="12" class="ml-1" @click="handleMarkRoundTrip(item)")
          //- div(class="flex flex-col justify-end")
            //- span(class="text-sm text-slate-600 dark:text-slate-300") 22
            //- span(class="text-sm text-slate-600 dark:text-slate-300") 888
      //- van-col(:span="6")
      //-   div(v-if="item.status == '1'" class="flex items-center justify-center rounded-2xl bg-green-50 text-green-600 w-12 h-12 shadow-sm border border-green-100/50")
      //-     van-icon( name="passed" size="24")
      //-   div(v-else-if="item.status == '2'" class="flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600 w-12 h-12 shadow-sm border border-amber-100/50")
      //-     van-icon(name="underway-o" size="24")
      //- van-col(:span="18")
      //-   p(class="text-[17px] font-bold text-slate-800 tracking-tight") {{item.title}}
      //-   p(class="text-[13px] text-slate-500 leading-relaxed mt-1")
      //-     van-icon(name="clock-o" size="12" class="mr-1")
      //-     span {{item.datetime}}
      //-   p(class="text-[13px] text-slate-500 leading-relaxed mt-1")
      //-     van-icon(name="location-o" size="12" class="mr-1")
      //-     span {{item.position}}
        //- p(class="text-[15px] text-slate-500 tracking-tight") {{item.status}}
  //- 事由弹窗
  van-popup(v-model:show="showReasonPopup" position="bottom" round)
    van-nav-bar(:title="handleItem?.attendanceDate + t('markRoundTrip')"  @click="closePopup")
      template(#right)
        van-icon(name="cross" size="18" color="#999")
    van-cell-group
      //- div(class="text-lg font-bold text-slate-800 mb-4") {{t('reason')}}
      //- van-cell-group
      van-cell(:title="t('whetherRoundTrip')")
        van-switch(v-model="tripForm.back" class="mr-2" :active-value="1" :inactive-value="0")
      van-field(
        :label="t('reason')"
        v-model="tripForm.reason"
        type="textarea"
        :rows="4"
        :placeholder="t('pleaseEnterReason')"
        maxlength="200"
        show-word-limit
        required
      )
    div(class="p-5 w-full")
      //- van-button(:text="t('cancel')" @click="showReasonPopup = false" class="flex-1" color="#999")
      van-button(:text="t('confirm')" @click="saveReason" class="" type="primary" :loading="isSaving" block round :disabled="isEmpty(tripForm.reason)")

</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from '@/i18n'
const { t, locale } = useI18n()
import { dateUtil } from '@/assets/scripts/date-util'
import { isEmpty } from 'lodash'
import { Allowance } from '@/api/index'

const router = useRouter()
// const data = ref()
const props = defineProps({
  data: {
    type: Object,
    default: () => ([])
  },
  confirmData: {
    type: Object,
    default: () => ([])
  },
  confirmStatus: {
    type: Number,
    default: 0
  },
})

const showReasonPopup = ref(false)
const tripForm = ref({
  back: 0,
  reason: ''
})
const handleItem = ref()
// 保存加载状态
const isSaving = ref(false)
// const list = computed(() => props.data)

const list = computed(() => {
  const arr = props.data
  props.confirmData.forEach((item: any) => {
    arr.forEach((i: any) => {
      if (i.id === item.attendanceId) {
        i.roundTrip = {
          back: item.back,
          reason: item.reason
        }
      }
    })
  })
  return arr
})
// const list = ref([
//   {
//     id: 1,
//     title: '正常考勤',
//     // describe: '10月考勤数据已生成，请在10月31日之前确认',
//     // datetime: '2023-10-01 00:00:00',
//     date: '2023-10-9',
//     startTime: '08:00:00',
//     endTime: '18:00:00',
//     status: '1',
//     position: '教学楼-1-203'
//   },
//   {
//     id: 2,
//     title: '迟到打卡',
//     // describe: '10月考勤数据已生成，请在10÷月31日之前确认',
//     // datetime: '2023-10-01 00:00:00',
//     date: '2023-10-10',
//     startTime: '09:23:09',
//     endTime: '18:00:00',
//     status: '2',
//     position: '教学楼-1-203'
//   }
// ])

const handleClick = () => {
  router.push({ name: 'attendance-details' })
}
const handleMarkRoundTrip = (item: any) => {
  showReasonPopup.value = true
  console.log(item)
  handleItem.value = item
  if (item.roundTrip) {
    tripForm.value.back = item.roundTrip.back
    tripForm.value.reason = item.roundTrip.reason
  } else {
    tripForm.value.back = 0
    tripForm.value.reason = ''
  }
  // isRoundTrip = item.roundTrip?.back || 0
}
const closePopup = () => {
  showReasonPopup.value = false
}
const saveReason = async () => {
   isSaving.value = true
  try {
    const params = {
      attendanceId: handleItem.value.id,
      back: tripForm.value.back,
      reason: tripForm.value.reason
    }

    const res = await Allowance.confirmAttendanceItem(params)
    console.log('保存往返信息成功:', res)

    // 关闭弹窗
    showReasonPopup.value = false
    handleItem.value.roundTrip = {
      back: tripForm.value.back,
      reason: tripForm.value.reason
    }
    // Toast(t('saveSuccess'))
  } catch (error) {
    console.error('保存往返信息失败:', error)
  } finally {
    isSaving.value = false
  }
}
</script>