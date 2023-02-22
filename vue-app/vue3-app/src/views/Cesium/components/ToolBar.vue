<!--
 * @Name: ToolBar.vue
 * @Author: forguo
 * @Date: 2023/2/1 10:17
 * @Description: ToolBar
-->
<template>
    <div class="tool-bar">
        <el-button @click="handleClick('shape')">矩形</el-button>
        <el-button @click="handleClick('dynamicImage')">动态图片</el-button>
        <el-button @click="handleClick('roaming')">漫游</el-button>
        <el-button @click="handleClick('czml')">CZML动态路径</el-button>
        <el-button @click="handleClick('heatmap')">热力图</el-button>
        <el-button @click="handleClick('drawPrimitiveAndEntity')">Primitive和Entity</el-button>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
const $emit = defineEmits(['onClick'])

const handleClick = (type: string | number) => {
    $emit('onClick', type)
}
</script>

<style scoped lang="scss">
.tool-bar {
    position: absolute;
    top: 0;
    left: 0;
    padding: 12px;
}
</style>
