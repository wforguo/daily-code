import { createApp, onMounted } from 'vue'
import { registerMicroApps, start } from 'qiankun'
import { createPinia } from 'pinia' // 状态管理
import { useMenuStore } from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './assets/main.scss'
import router, { menus } from './router'
// @ts-ignore
import WeDesign from '@wei_design/web-vue'
import '@wei_design/web-vue/lib/style.css'
console.log(import.meta.env)
console.log(process.env)

console.log(
    `%c Environment %c ${import.meta.env.MODE}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e'
)
console.log(
    `%c Version %c ${process.env.APP_VERSION}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #1475b2'
)
console.log(
    `%c BuildTime %c ${process.env.APP_BUILD_TIME}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #1475b2'
)

const app = createApp(App)

app.use(createPinia()).use(router).use(ElementPlus).use(WeDesign).mount('#app')
const menu = useMenuStore()
menu.updateMenu(menus)

// 1、主应用中注册微应用
registerMicroApps([
    {
        name: 'vue2-app',
        entry:
            import.meta.env.MODE === 'development' ? '//localhost:10087' : '//wforguo.github.io/daily-code/vue2-app/',
        container: '#vue2App',
        activeRule: '/vue2-app',
        props: { menus }
    }
])
start()
