<template lang="pug">

  div
    //- div data {{data.roundTrip}} isRoundTrip{{isRoundTrip}}
    van-row(:gutter="16")
      van-col(span="24")
        div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            //- van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
            span(class="flex h-2.5 w-2.5 rounded-full bg-primary shadow-glow")
            span(class="text-xs font-bold text-slate-400") {{t('monthlyAttendance', {month: dateUtil.formatDate(data.selectedDate, locale === 'zh-CN' ? 'YYYY年MM月' : 'MM/YYYY')})}}
          div
            span(class="text-3xl font-bold text-slate-800 tracking-tight") {{data.singinNum || 0}}
            span(class="text-xs font-medium text-slate-400 ml-1.5") {{t('attendanceDaysUnit')}}
      van-col(span="12")
        //- div(class="p-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-card flex flex-col gap-3 group")
          div(class="flex items-center gap-2")
            //- van-icon(name="gold-coin-o" class="text-[--van-blue]" size="18")
            span(class="flex h-2.5 w-2.5 rounded-full bg-orange-500 shadow-glow-orange animate-pulse")
            span(class="text-xs font-bold text-slate-400") {{t('monthlyAllowance', {month: dateUtil.formatDate(data.selectedDate, locale === 'zh-CN' ? 'YYYY年MM月' : 'MM/YYYY')})}}
          div
            span(class="text-3xl font-bold text-slate-800 tracking-tight") {{data.unSigninNum || 0}}
            span(class="text-xs font-medium text-slate-400 ml-1.5") {{t('allowanceTimesUnit')}}
    div(class="mt-6")
      //- p  {{currentDay}} -- {{data.selectedDate}}
      div(class="flex items-center justify-between mb-5")
        h3(class="text-lg font-bold text-slate-800 flex items-center gap-3") {{dateUtil.formatDate(data.selectedDate, locale === 'zh-CN' ? 'MM月DD日' : 'DD/MM')}}
          span(v-if="currentDay === data.selectedDate" class="text-[10px] font-bold px-2.5 rounded-full bg-[--van-blue-lightest] text-[--van-blue] border border-[--van-blue-lighter] shadow-sm") {{t('today')}}
        //- p(class="text-[13px] text-[--van-blue] tracking-tight" @click="handleClick") 查看全部
          //- van-icon(name="arrow" class="ml-1")
      //- 是否往返及事由
      div(class="mb-4" v-if="!isEmpty(data?.slectSinginData)")
        div(class="flex items-center justify-between mb-3")
          span(class="text-sm font-semibold text-slate-900") {{t('whetherRoundTrip')}}
          van-switch(v-if="data.confirmStatus !== 1" v-model="isRoundTrip" @change="handleRoundTripChange" size="24" :active-value="1" :inactive-value="0")
          p(v-else="isRoundTrip" class="text-slate-900") {{isRoundTrip ? '是' : '否'}}
        div(class="flex items-center justify-between mb-3" v-if="isRoundTrip")
          span(class="text-sm font-semibold text-slate-900") {{t('reason')}}
          p( class="text-slate-900")
            | {{reason}}
            van-icon(v-if="data.confirmStatus !== 1" name="edit" class="ml-2" size="16" @click="showReasonPopup = true")
      div(class="space-y-4")
        div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
          div(:class="['absolute','left-0','top-0','bottom-0','w-1.5', data.slectSinginData?.attendanceStartDatetime ? 'bg-primary' : 'bg-slate-200']")
          div(class="p-5 pl-7 flex justify-between items-center")
            div(class="flex gap-5")
              div(class="flex flex-col items-center pt-2")
                div(:class="['size-3.5','rounded-full','border-[3px]', data.slectSinginData?.attendanceStartDatetime ? 'border-primary' : 'border-slate-200','bg-white','relative','z-10','shadow-sm','ring-2','ring-blue-50']")
                div(class="w-0.5 h-10 bg-slate-100 -mt-1 rounded-b-full group-hover:bg-blue-100 transition-colors duration-500")
              div
                div(class="flex items-baseline gap-2.5")
                  span(class="text-sm font-semibold text-slate-900") {{t('attendanceSignInTime')}}
                  span(v-if="data.slectSinginData?.attendanceStartDatetime" class="text-xl font-bold text-slate-800 font-mono tracking-tight") {{ dateUtil.formatDate(data.slectSinginData?.attendanceStartDatetime, 'HH:mm')}}
                  span(v-else class="text-xl font-bold text-slate-400") --:--

                div(class="mt-3")
                  span(v-if="data.slectSinginData?.attendanceStartDatetime" class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-600 border border-green-200/50") {{t('attendanceType.' + data.slectSinginData?.status)}}
                  span(v-else class="text-slate-400 italic text-xs") {{t('noAttendanceRecord')}}
        div(class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft")
          //- div(class="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200")
          div(:class="['absolute','left-0','top-0','bottom-0','w-1.5', data.slectSinginData?.attendanceEndDatetime ? 'bg-primary' : 'bg-slate-200']")
          div(class="p-5 pl-7 flex justify-between items-center")
            div(class="flex gap-5")
              div(class="flex flex-col items-center pt-2")
                div(class="w-0.5 h-10 bg-slate-100 -mt-1 rounded-b-full group-hover:bg-blue-100 transition-colors duration-500")
                //- div(class="size-3.5 rounded-full border-[3px] border-slate-200 bg-white relative z-10 shadow-sm ring-2 ring-blue-50")
                div(:class="['size-3.5','rounded-full','border-[3px]', data.slectSinginData?.attendanceEndDatetime ? 'border-primary' : 'border-slate-200','bg-white','relative','z-10','shadow-sm','ring-2','ring-blue-50']")
              div
                div(class="flex items-baseline gap-2.5")
                  span(class="text-sm font-semibold text-slate-900") {{t('attendanceSignOutTime')}}
                  span(v-if="data.slectSinginData?.attendanceEndDatetime" class="text-xl font-bold text-slate-800 font-mono tracking-tight") {{ dateUtil.formatDate(data.slectSinginData?.attendanceEndDatetime, 'HH:mm')}}
                  span(v-else class="text-xl font-bold text-slate-400") --:--

                div(class="mt-3")
                  span(v-if="data.slectSinginData?.attendanceEndDatetime"  class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-600 border border-green-200/50") 正常
                  span(v-else class="text-slate-400 italic text-xs") {{t('noAttendanceRecord')}}

  //- 事由弹窗
  van-popup(v-model:show="showReasonPopup" position="bottom" round)
    van-nav-bar(:title="t('roundTripReason')"  @click="showReasonPopup = false; isRoundTrip = data?.roundTrip?.back || 0")
      template(#right)
        van-icon(name="cross" size="18" color="#999")
    van-cell-group
      //- div(class="text-lg font-bold text-slate-800 mb-4") {{t('reason')}}
      //- van-cell-group
      van-field(
        v-model="reason"
        type="textarea"
        :rows="4"
        :placeholder="t('pleaseEnterReason')"
        maxlength="200"
        show-word-limit
        required
      )
    div(class="p-5 w-full")
      //- van-button(:text="t('cancel')" @click="showReasonPopup = false" class="flex-1" color="#999")
      van-button(:text="t('confirm')" @click="saveReason" class="" type="primary" :loading="isSaving" block round :disabled="isEmpty(reason)")

</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { isEmpty } from 'lodash'
import { dateUtil } from '@/assets/scripts/date-util'
import { useStatisticsStore } from '@/stores/statistics'
import { useI18n } from '@/i18n'
import { Allowance } from '@/api/index'
const { t, locale } = useI18n()
const statisticsStore: any = useStatisticsStore()

const currentDay = computed(() => {
  return dateUtil.formatDate(new Date(), 'YYYY-MM-DD')
});
const data = computed(() => {
  return statisticsStore.attendanceForDay || {}
})
watch(() => data.value.roundTrip, (newVal) => {
  if (newVal) {
    isRoundTrip.value = newVal.back
    reason.value = newVal.reason || ''
  }
})
// 是否往返开关状态 0-无，1-返回
const isRoundTrip = ref(0)
// 事由弹窗显示状态
const showReasonPopup = ref(false)
// 事由内容
const reason = ref('')
// 保存加载状态
const isSaving = ref(false)

// 处理开关变化
const handleRoundTripChange = (value: boolean) => {
  if (value) {
    // 打开开关，显示弹窗
    showReasonPopup.value = true
  } else {
    // 关闭开关，清空事由并保存
    reason.value = ''
    saveReason()
  }
}

// 保存事由
const saveReason = async () => {
  const attendanceId = data.value.slectSinginData?.id
  if (!attendanceId) return
  // if (!reason.value) return
  isSaving.value = true
  try {
    const params = {
      attendanceId: attendanceId,
      back: isRoundTrip.value,
      reason: reason.value
    }

    const res = await Allowance.confirmAttendanceItem(params)
    console.log('保存往返信息成功:', res)

    // 关闭弹窗
    showReasonPopup.value = false
  } catch (error) {
    console.error('保存往返信息失败:', error)
  } finally {
    isSaving.value = false
  }
}

</script>