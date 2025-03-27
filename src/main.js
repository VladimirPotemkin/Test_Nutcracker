import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/styles/main.scss'

const app = createApp(App)

axios.defaults.baseURL = 'https://mashroom-movies-api.netlify.app/api'

app.use(createPinia())
app.use(router)
app.mount('#app')