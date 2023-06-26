<template>
    <div class="home">
        <timer :title="1" type="success" />

        <div>
            <p v-for="(item, index) in companies" :key="item.id">
                <el-tag>{{ item.name }}</el-tag>
                <el-button @click="send(index)">投递</el-button>
            </p>
        </div>

        <p>已经投递：{{ target?.name }}</p>

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
    reactive,
    onBeforeMount,
    onMounted,
    onErrorCaptured,
    watch,
    onBeforeUpdate,
    onUpdated,
    onRenderTracked,
    onRenderTriggered
} from 'vue'
import { Timer } from '@/components/index'
import AsyncShow from '@/components/AsyncShow.vue'
import { ElMessage } from 'element-plus'

console.log('1-开始创建组件-----setup()')
const companies: any[] = reactive([
    {
        id: '10001',
        name: '阿里'
    },
    {
        id: '10002',
        name: '腾讯'
    },
    {
        id: '10003',
        name: '字节'
    }
])

let target: any = reactive({})

const send = (index: number) => {
    // 不能够直接赋值
    const item: any = companies[index]
    target.name = item.name
}

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

// 监听多个使用数组
watch(
    target,
    (newValue: any, oldValue: object) => {
        console.log(`new--->${JSON.stringify(newValue)}`)
        console.log(`old--->${JSON.stringify(oldValue)}`)
        if (newValue && newValue.name) {
            document.title = `已投递：${newValue.name}`
        }
    },
    {
        deep: true
    }
)

// 异常捕获
onErrorCaptured(err => {
    console.log('/*******************/')
    console.log(err)
    console.log('/*******************/')
})
</script>
