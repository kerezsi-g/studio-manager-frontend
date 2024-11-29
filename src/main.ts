import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'
import router from './router'

import VueFeather from 'vue-feather'

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)

app.component('VueFeather', VueFeather)

app.mount('#app')
