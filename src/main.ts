import { createApp } from 'vue'
import { components, plugins } from './components'
import App from './App.vue'
import store from '@/stores'
import router from '@/router'
import '@/router/permission'
import { initializeApp } from "firebase/app"
import { FIREBASE_CONFIG } from '@/commons'
const { MODE } = import.meta.env;

// css
import '@/styles/tailwind.css'
import '@/styles/index.css'


// Initialize Firebase
initializeApp(FIREBASE_CONFIG[MODE])


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')


// 加载全局组件
components.forEach((component) => {
  app.component(component.name, component)
})

// 加载全局插件
plugins.forEach((plugin) => {
  app.use(plugin)
})
