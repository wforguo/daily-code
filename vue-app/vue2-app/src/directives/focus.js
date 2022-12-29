/**
 * @author: forguo
 * @time: 2021/7/25 18:54
 * @description: focus.js
 */

import Vue from 'vue'

export default Vue.directive('focus', {
    // 绑定完成
    bind: function (el, binding, vNode) {
        console.log(el, binding, vNode)
        console.log('-----------------')
        var s = JSON.stringify
        el.innerHTML =
            'name: ' +
            s(binding.name) +
            '<br>' +
            'value: ' +
            s(binding.value) +
            '<br>' +
            'expression: ' +
            s(binding.expression) +
            '<br>' +
            'argument: ' +
            s(binding.arg) +
            '<br>' +
            'modifiers: ' +
            s(binding.modifiers) +
            '<br>' +
            'vnode keys: ' +
            Object.keys(vNode).join(', ')
    },
    //
    update: function (el, binding) {
        console.log('update', el, binding)
    },
    // 解绑
    unbind: function () {
        console.log('unbind', ...arguments)
    },
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        console.log('-----------------')
        console.log('inserted')
        console.log('-----------------')
        // 聚焦元素
        el.focus()
    }
})
