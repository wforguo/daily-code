<template>
    <div class="home">
        <h2>组件库</h2>

        <el-divider />

        <we-button>Default</we-button>
    </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'WeiDesignView',
    title: '组件库',
    inheritAttrs: false,
    customOptions: {}
}
</script>
