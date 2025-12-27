<template lang="pug">
#Home(class="relative")
  div(class="absolute top-0 w-full h-[36vh] bg-primary-gradient rounded-b-[2.5rem] z-[-1]")
  UserInfo
  TotalData
  ToBeDone
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/i18n'
import UserInfo from '@/components/UserInfo.vue'
import TotalData from '@/components/TotalData.vue'
import ToBeDone from '@/components/ToBeDone.vue'

const { t, locale, changeLocale } = useI18n()



</script>

<style lang="scss" scoped>


</style>