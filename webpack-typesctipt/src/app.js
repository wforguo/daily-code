import './css/common.scss';
import './js/common.ts';
import './js/app.ws';

import Vue from 'vue'

new Vue({
    el: '#app',
    created: () => {
        console.log('app created');
    }
});
