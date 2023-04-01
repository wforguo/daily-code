import { createApp } from 'vue'
import { registerMicroApps, start } from 'qiankun'
import { createPinia } from 'pinia' // 状态管理
import { useMenuStore } from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// highlight 的样式，依赖包，组件
import 'highlight.js/styles/github-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

// @ts-ignore
import WeDesign from '@wei_design/web-vue'
import '@wei_design/web-vue/lib/style.css'

import plugin, { log } from '@/plugin'
import App from './App.vue'
import './assets/main.scss'
import router, { menus } from './router'

console.log(import.meta.env)
// @ts-ignore
console.log(process.env)
log.capsule('Environment', `${import.meta.env.MODE}`, 'primary')
// @ts-ignore
log.capsule('Version', `${process.env.APP_VERSION}`, 'primary')
// @ts-ignore
log.capsule('BuildTime', `${process.env.APP_BUILD_TIME}`, 'primary')

const app = createApp(App)

app.use(plugin).use(createPinia()).use(router).use(ElementPlus).use(WeDesign).use(hljsVuePlugin).mount('#app')

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
