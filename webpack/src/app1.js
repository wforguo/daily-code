import './css/common.scss';
// import './js/common.ts';
import './css/app1.css';
import './css/app.less';

import Vue from 'vue'

new Vue({
    el: '#app1',
    created: () => {
        console.log('app1 created');
    }
});

const unUsedCode = '这是一段没有用的代码';
