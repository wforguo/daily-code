import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Vant from 'vant';

import 'normalize.css';
import '@/directives';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store,
    customOptions: {
        sex: true
    },
    created() {
        // console.log(this.$options) // => 'foo'
    },
}).$mount('#app');
