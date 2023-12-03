<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2022/10/10 14:23
 * @Description: index
-->
<template>
    <div class="page algorithm">算法</div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'AlgorithmView',
    title: '算法',
    inheritAttrs: false,
    customOptions: {},
    hidden: true
})
import { onBeforeMount } from 'vue'
import rawCode from './index'
onBeforeMount(() => {
    rawCode()
})
</script>
