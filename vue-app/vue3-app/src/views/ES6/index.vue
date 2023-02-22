<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2022/9/17 22:14
 * @Description: index
-->
<template>
    <div class="page">es6</div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
// import rawCode from './index'

// async本身就返回了一个promise，默认返回一个resolve(undefined)
const request = async () => {
    console.log('request')
    // await用于等待一个promise结束，只能在 async 块内使用
    await new Promise((resolve, reject) => {
        console.log('setTimeout')
        setTimeout(() => {
            console.log('resolve')
            resolve('async')
        }, 0)
    })
}

onBeforeMount(async () => {
    console.log('onBeforeMount')
    // rawCode()
    request().then(res => {
        console.log(res)
    })
})
</script>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'ES6View',
    title: 'ES6',
    inheritAttrs: false,
    customOptions: {}
}
</script>

<style scoped></style>
