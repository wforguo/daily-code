<!--
 * @Name: TemplatePatterns.vue
 * @Author: forguo
 * @Date: 2023/4/1 11:09
 * @Description: 设计模式
-->
<template>
    <el-card>
        <template #header>{{ title }}</template>
        <highlightjs language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </el-card>
</template>

<script lang="ts" setup>
import { defineProps, nextTick } from 'vue'
console.log('设计模式')
defineProps({
    title: String
})
const code = `
    `
nextTick(() => {
    eval(code)
})
</script>
<style scoped lang="scss"></style>
