import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import { setupI18n, initI18n } from './i18n'
// 导入Vant组件
import { ConfigProvider,Button, Cell, CellGroup, Popup, Radio, RadioGroup, Icon, Tabbar,TabbarItem, NavBar, Image as VanImage } from 'vant'

const app = createApp(App)
const pinia = createPinia()
setupI18n(app)

// 注册Vant组件
app.use(ConfigProvider)
   .use(Button)
   .use(Cell)
   .use(CellGroup)
   .use(Popup)
   .use(Radio)
   .use(RadioGroup)
   .use(Icon)
   .use(Tabbar)
   .use(TabbarItem)
   .use(NavBar)
   .use(VanImage)

// 初始化i18n，生产环境从public/locales加载语言文件
initI18n().then(() => {
  app.use(pinia).use(router).mount('#app')
})