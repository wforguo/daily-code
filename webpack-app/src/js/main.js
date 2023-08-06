/**
 * @Author: forguo
 * @Date: 2022/3/25 14:32
 * @Description: main.js
 */
import _ from 'lodash'
import axios from 'axios'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import '../css/index.css';
import '../css/app.less';
let App = function () {
    this.data = [];
    this.init();
}

let unused = 'unused';

// 异步加载
require.ensure(['./async1'], () => {
}, 'async1');

App.prototype = {
    init: function () {
        document.getElementById('app').innerHTML = 'Webpack App';
        console.log('app created');
        console.log(_.isArray(this.data));

        axios({
            url: 'https://forguo.cn/api/common/wechat/sdk'
        }).then(res => {

        });
    }
}

Cookies.set('name', 'value', { expires: 7, path: '' })
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

export {
    App,
    unused,
};
