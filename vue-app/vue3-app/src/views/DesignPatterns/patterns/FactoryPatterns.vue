<!--
 * @Name: FactoryPatterns.vue
 * @Author: forguo
 * @Date: 2023/4/1 11:09
 * @Description: 工厂模式
-->
<template>
    <el-card>
        <template #header>{{ title }}</template>
        <highlightjs language="JavaScript" lineNumbers :autodetect="false" :code="code"></highlightjs>
    </el-card>
</template>

<script lang="ts" setup>
defineProps({
    title: String
})
console.log('工厂模式')
const code = `
// 构造函数和创建者分离
function Jquery (selector) {
  this.selector = document.querySelectorAll(selector)
}
// new操作单独封装
window.$ = function (selector) {
  return new Jquery(selector)
}
var p = $('div')
console.log(p)
    `
nextTick(() => {
    eval(code)
})
</script>
<style scoped lang="scss"></style>
