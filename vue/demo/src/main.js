import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import 'normalize.css';
import '@/assets/css/variable.scss';
import '@/directives';
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.config.productionTip = false;

import { Button, Card, Form } from 'vant';
import { Field } from 'vant';
Vue.use(Button);
Vue.use(Card);
Vue.use(Form);
Vue.use(Field);

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
