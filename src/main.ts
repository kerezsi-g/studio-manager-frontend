import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { MotionPlugin } from '@vueuse/motion'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import { createI18n } from 'vue-i18n'

const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(MotionPlugin)

app.use(DataLoaderPlugin, { router })
app.use(router)

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {},
  },
})

app.use(i18n)

app.mount('#app')
