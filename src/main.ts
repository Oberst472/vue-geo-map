import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './index.css'
const pinia = createPinia()

import App from './App.vue'

createApp(App).use(pinia).mount('#app')
