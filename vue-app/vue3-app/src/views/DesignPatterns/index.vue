<template>
    <div class="design-patterns">
        <el-tag>设计模式</el-tag>
    </div>
</template>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'DesignPatterns',
    title: '设计模式',
    inheritAttrs: false,
    customOptions: {}
}
</script>

<script lang="ts" setup></script>
