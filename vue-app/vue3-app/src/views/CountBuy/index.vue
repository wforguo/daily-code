<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/8/11 15:34
 * @Description: index
-->
<template>
    <div class="page count-buy">
        <el-card>
            要求用 vue 或者 react 实现一个倒计时抢券组件，页面加载时从 10s
            开始倒计时，倒计时结束之后点击按钮请求接口进行抢券，同时更新文案等等功能。
        </el-card>
        <el-button :disabled="disabled" :loading="loading" @click="buy">{{ btnText }}</el-button>
    </div>
</template>

<script setup lang="ts">
import { useLoading, useState } from '@/hooks'

// emits
const emits = defineEmits(['buy'])

// state
// 默认10
const [count, setCount] = useState(10)
const { value: loading, showLoading, hideLoading } = useLoading()

// 按钮文案
const btnText = computed(() => {
    return count.value > 0 ? `${count.value}s` : `购买`
})

// 按钮是否可点击
const disabled = computed(() => {
    return count.value > 0
})

let requestRef: any = null
let prevTime: number | undefined
let timeDifferance = 0 // 每1s倒计时偏差值，单位ms

const animate = (timestamp: number) => {
    if (prevTime) {
        if (count.value <= 0) {
            cancelAnimationFrame(requestRef)
            return
        }
        if (parseInt(String(timeDifferance / 1000)) === 1) {
            timeDifferance = 0
            setCount(count.value - 1)
        }
        // 时间差
        timeDifferance = timestamp - prevTime + timeDifferance
        prevTime = timestamp
    } else {
        prevTime = timestamp
    }
    requestAnimationFrame(animate)
}

// lifecycle
onBeforeMount(() => {
    requestRef = requestAnimationFrame(animate)
})

onUnmounted(() => {
    // interval && clearInterval(interval)
})

// methods
const buy = () => {
    showLoading()
    setTimeout(() => {
        console.log('buy')
        alert('购买成功')
        hideLoading()
        emits('buy')
    }, 1000)
}
</script>
<script lang="ts">
export default {
    name: 'CountBuy',
    hidden: true
}
</script>
