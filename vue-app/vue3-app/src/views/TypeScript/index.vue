<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2022/9/17 22:14
 * @Description: index
-->
<template>
    <div class="page">typescript</div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import rawCode from './index'

onBeforeMount(() => {
    rawCode()
})
</script>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'TsView',
    title: 'Ts',
    inheritAttrs: false,
    customOptions: {}
}
</script>
<style scoped></style>
