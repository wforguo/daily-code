<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2022/9/17 22:14
 * @Description: index
-->
<template>
    <div class="page es6">es6</div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import rawCode from './index'

onBeforeMount(async () => {
    rawCode()
})
</script>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'ES6View',
    title: 'ES6',
    inheritAttrs: false,
    customOptions: {},
    hidden: true
}
</script>

<style scoped></style>
