<template lang="pug">
  div#CommonFunction(class="mb-4")
    van-cell-group(title="常用功能" inset )
      template(#title)
        .text-primary 常用功能
      van-cell(title="我的考勤确认" is-link size="large" center @click="handleClick('attendance-confirmation')")
        template(#icon)
          span(class="inline-block w-11 h-11 flex items-center justify-center bg-[var(--van-blue-lightest)] rounded-xl mr-3")
            van-icon(name="passed" size="22" color="var(--van-blue)")
      van-cell(title="考勤明细" is-link size="large" center @click="handleClick('attendance-details')")
        template(#icon)
          span(class="inline-block w-11 h-11 flex items-center justify-center bg-[var(--van-blue-lightest)] rounded-xl mr-3")
            van-icon(name="notes-o" size="22" color="var(--van-blue)")
      van-cell(title="补助明细" is-link size="large" center @click="handleClick('allowance-details')")
        template(#icon)
          span(class="inline-block w-11 h-11 flex items-center justify-center bg-[var(--van-blue-lightest)] rounded-xl mr-3")
            van-icon(name="gold-coin-o" size="22" color="var(--van-blue)")
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()

  const handleClick = (name: string) => {
    // console.log(path)
    router.push({ name })
  }
</script>
<style lang="scss">
#CommonFunction {
  .van-cell__right-icon {
    color: var(--van-blue-light);
  }
}
</style>
