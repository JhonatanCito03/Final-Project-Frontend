import { createApp } from 'vue'
import LenisVue from 'lenis/vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from '../App.vue'
import router from './router'
import axios from 'axios'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(LenisVue)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.mount('#app')

