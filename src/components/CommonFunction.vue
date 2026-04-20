<template lang="pug">
  div#CommonFunction(class="mb-4")
    van-cell-group(title="常用功能" inset )
      template(#title)
        .text-primary {{ t('commonFunctions') }}
      van-cell(:title="t('myAttendanceConfirmation')" is-link size="large" center @click="handleClick('attendance-confirmation')")
        template(#icon)
          span(class="inline-block w-11 h-11 flex items-center justify-center bg-[var(--van-blue-lightest)] rounded-xl mr-3")
            van-icon(name="passed" size="22" color="var(--van-blue)")
      van-cell(:title="t('attendanceDetails')" is-link size="large" center @click="handleClick('attendance-details')")
        template(#icon)
          span(class="inline-block w-11 h-11 flex items-center justify-center bg-[var(--van-blue-lightest)] rounded-xl mr-3")
            van-icon(name="notes-o" size="22" color="var(--van-blue)")
      van-cell(:title="t('allowanceDetails')" is-link size="large" center @click="handleClick('allowance-details')")
        template(#icon)
          span(class="inline-block w-11 h-11 flex items-center justify-center bg-[var(--van-blue-lightest)] rounded-xl mr-3")
            van-icon(name="gold-coin-o" size="22" color="var(--van-blue)")
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { showToast } from 'vant'
import { useI18n } from '@/i18n'
const { t } = useI18n()
  const router = useRouter()
  const route = useRoute()
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })
  const handleClick = (name: string) => {
    console.log('props.data', props.data)
    if (name === 'attendance-confirmation') {
      // router.push({ name })
      if (props.data.confirmData.length > 0) {
        router.push({ name })
      } else {
        showToast({
          message: t('noConfirmData'),
        })
      }
    } else {
      router.push({ name })
    }
  }
</script>
<style lang="scss">
#CommonFunction {
  .van-cell__right-icon {
    color: var(--van-blue-light);
  }
}
</style>
