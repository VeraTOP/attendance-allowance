<template lang="pug">
.about
  .page-header
    h1.page-title
      | {{ t('about.title') }}

  .container.page-content
    van-cell-group
      van-cell(:title="t('common.company')", :value="t('about.company')")
      van-cell(title="Version", :value="t('about.version')")
      van-cell(title="Copyright", :value="t('about.copyright')")

    .back-home
      van-button(type="primary", block, @click="goHome")
        | {{ t('common.home') }}
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from '@/i18n'
import 'vant/lib/index.css'

const router = useRouter()
const { t } = useI18n()

const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.about {
  min-height: 100vh;
  // background-color: #f5f7fa;
}

.page-content {
  padding-top: 30px;
}

.van-cell-group {
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: $border-radius-md;
  overflow: hidden;
  box-shadow: $shadow-sm;
}

.back-home {
  margin-top: 40px;
}
</style>