import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import 'normalize.css';
import '@/assets/css/variable.scss';
import '@/directives';

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
