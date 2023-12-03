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
import rawCode from './index'

onBeforeMount(() => {
    rawCode()
})

defineOptions({
    name: 'TsView',
    title: 'Ts',
    inheritAttrs: false,
    customOptions: {},
    hidden: true
})
</script>
