/**
 * @author: forguo
 * @time: 2021/6/17 09:55
 * @description: index
 */

import Vuex from 'vuex';
import Vue from 'vue';
import menu from './menu';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        menu,
    }
})
