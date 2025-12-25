<template lang="pug">
//- van-config-provider(theme="light")
.home
  .page-header
    h1.page-title {{ t('home.title') }}

  .container.page-content
    .welcome-message
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
import 'vant/lib/index.css'

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
.home {
  min-height: 100vh;
  // background-color: #f5f7fa;
}

.welcome-message {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  // background-color: #fff;
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;

  p {
    font-size: 16px;
    color: $text-color-secondary;
    margin: 0;
  }
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}

.language-switcher {
  background-color: #fff;
  border-radius: $border-radius-md;
  overflow: hidden;
  box-shadow: $shadow-sm;
}

.current-language {
  font-size: 14px;
  color: $text-color-secondary;
}

.popup-content {
  padding: 20px;
  // background-color: #fff;
  border-radius: 16px 16px 0 0;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
}

.popup-body {
  margin-bottom: 30px;

  .van-radio-group {
    display: flex;
    justify-content: center;
    gap: 40px;
  }
}

.popup-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>