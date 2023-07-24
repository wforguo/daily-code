<template>
    <div class="home">
        <timer :title="1" type="success" />

        <el-divider />

        <suspense>
            <template #default>
                <async-show />
            </template>
            <template #fallback>加载中...</template>
        </suspense>
    </div>
</template>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'HomeView',
    title: '首页'
}
</script>

<script lang="ts" setup>
import {
    onBeforeMount,
    onMounted,
    onErrorCaptured,
    onBeforeUpdate,
    onUpdated,
    onRenderTracked,
    onRenderTriggered
} from 'vue'
import { Timer } from '@/components/index'
import AsyncShow from '@/components/AsyncShow.vue'

console.log('1-开始创建组件-----setup()')

/**
 * 生命周期
 */
onBeforeMount(() => {
    console.log('2-组件挂载到页面之前执行-----onBeforeMount()')
})

onMounted(() => {
    console.log('3-组件挂载到页面之后执行-----onMounted()')
})
onBeforeUpdate(() => {
    console.log('4-组件更新之前-----onBeforeUpdate()')
})

onUpdated(() => {
    console.log('5-组件更新之后-----onUpdated()')
})

onRenderTracked(event => {
    console.log('状态跟踪组件----------->')
    console.log(event)
})

onRenderTriggered(event => {
    console.log('状态触发组件--------------->')
    console.log(event)
})

// 异常捕获
onErrorCaptured(err => {
    console.log('/*******************/')
    console.log(err)
    console.log('/*******************/')
})
</script>
