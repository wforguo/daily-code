import {createApp} from 'vue'
import {registerMicroApps, start} from 'qiankun';
import {createPinia} from 'pinia' // 状态管理
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
// @ts-ignore
import WeDesign from '@wei_design/web-vue'
import '@wei_design/web-vue/lib/style.css'

const app = createApp(App)

// 注册微应用
registerMicroApps([
    {
        name: 'vueApp',
        entry: '//localhost:10087',
        container: '#vueApp',
        activeRule: '/vue-app',
    },
]);

start();

app
    .use(createPinia())
    .use(router)
    .use(ElementPlus)
    .use(WeDesign)
    .mount('#app')
