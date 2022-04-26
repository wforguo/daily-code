import {createApp} from 'vue'
import axios from 'axios'
import qs from 'qs'
import App from './App.vue'
import './index.css'

axios({
    method: 'post',
    url: 'https://api.cloud-app.com.cn/wechat/jssdk/share',
    data: qs.stringify({
        url: window.location.href
    })
}).then(res => {
    console.log(res.data);
});

createApp(App).mount('#app')
