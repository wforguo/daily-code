<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2022/10/10 15:45
 * @Description: index
-->
<template>
    <div class="page js-base">JS基础</div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
onBeforeMount(() => {})
</script>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'JsBaseView',
    title: 'JS基础',
    inheritAttrs: false,
    customOptions: {},
    hidden: true
}
</script>
<style scoped></style>
