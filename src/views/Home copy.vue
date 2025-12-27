<template lang="pug">
#Home(class="relative")
  div(class="absolute top-0 w-full h-[36vh] bg-primary-gradient rounded-b-[2.5rem] z-[-1]")
  UserInfo
//- .van-doc-demo-block__card(style="margin: 16px;")
  .page-header
    h1.page-title {{ t('home.title') }}
  .page-content
    .container
      TailwindTest
      .welcome-message.bg-blue-50.p-6
        p {{ t('home.description') }}

      .action-buttons
        van-button(type="primary", block, large, @click="checkAttendance")
          | {{ t('home.checkAttendance') }}
        van-button(type="default", block, large, @click="viewRecords")
          | {{ t('home.viewRecords') }}
        van-button(type="default", block, large, @click="applyAllowance")
          | {{ t('home.applyAllowance') }}

      .language-switcher
        van-cell(:title="t('common.language')", is-link, @click="showLanguagePicker")
          template(#right-icon)
            span.current-language
              | {{ currentLanguageText }}

  //- 语言选择弹窗
  van-popup(v-model:show="showLanguagePopup", position="bottom")
    .popup-content
      .popup-header
        h3
          | {{ t('common.language') }}
        van-icon(name="cross", size="24", @click="showLanguagePopup = false")

      .popup-body
        van-radio-group(v-model="selectedLanguage", direction="horizontal")
          van-radio(name="zh-CN")
            | {{ t('common.chinese') }}
          van-radio(name="en-US")
            | {{ t('common.english') }}

      .popup-footer
        van-button(type="default", block, @click="showLanguagePopup = false")
          | {{ t('common.cancel') }}
        van-button(type="primary", block, @click="confirmLanguageChange")
          | {{ t('common.confirm') }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/i18n'
import UserInfo from '@/components/UserInfo.vue'
// import TailwindTest from '@/components/TailwindTest.vue'
const { t, locale, changeLocale } = useI18n()

const showLanguagePopup = ref(false)
const selectedLanguage = ref(locale.value)

const currentLanguageText = computed(() => {
  return locale.value === 'zh-CN' ? t('common.chinese') : t('common.english')
})

const checkAttendance = () => {
  // 打卡考勤逻辑
  console.log('Check attendance')
}

const viewRecords = () => {
  // 查看记录逻辑
  console.log('View records')
}

const applyAllowance = () => {
  // 申请补贴逻辑
  console.log('Apply allowance')
}

const showLanguagePicker = () => {
  selectedLanguage.value = locale.value
  showLanguagePopup.value = true
}

const confirmLanguageChange = () => {
  changeLocale(selectedLanguage.value)
  showLanguagePopup.value = false
}
</script>

<style lang="scss" scoped>


</style>