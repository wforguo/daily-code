<!--
 * @Name: TemplatePatterns.vue
 * @Author: forguo
 * @Date: 2023/4/1 11:09
 * @Description: 设计模式
-->
<template>
    <el-card>
        <template #header>设计模式</template>
        <highlightjs language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </el-card>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
console.log('设计模式')
const code = `
    `
nextTick(() => {
    eval(code)
})
</script>
<style scoped lang="scss"></style>
