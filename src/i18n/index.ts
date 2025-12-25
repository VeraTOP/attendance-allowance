import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

const DEFAULT_LOCALE = 'zh-CN'
const locales = ['zh-CN', 'en-US']

// 初始空消息对象，将在initI18n中动态加载
const messages: Record<string, any> = {}

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages
})

export const setupI18n = (app: App) => {
  app.use(i18n)
}

// 初始化i18n，统一从public/locales加载语言文件
export const initI18n = async () => {
  // 从public/locales加载语言文件
  for (const locale of locales) {
    try {
      const response = await fetch(`/locales/${locale}.json`)
      const messages = await response.json()
      i18n.global.setLocaleMessage(locale, messages)
    } catch (error) {
      console.error(`Failed to load locale ${locale}:`, error)
    }
  }

  // 从localStorage读取保存的语言设置
  const savedLocale = localStorage.getItem('app-locale')
  if (savedLocale && locales.includes(savedLocale)) {
    i18n.global.locale.value = savedLocale as 'zh-CN' | 'en-US'
  }
}

export const useI18n = () => {
  const changeLocale = (locale: typeof locales[number]) => {
    i18n.global.locale.value = locale as any
    localStorage.setItem('app-locale', locale)
  }

  return {
    changeLocale,
    t: i18n.global.t,
    locale: i18n.global.locale,
    availableLocales: locales
  }
}