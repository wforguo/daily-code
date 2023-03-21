<template>
    <el-card>
        <el-alert class="we-timer">现在是：{{ nowTime }}</el-alert>
    </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

defineProps<{
    msg?: string
}>()
defineEmits(['count-down'])
const radio = ref(3)

const nowTime = ref<string>('00:00:00')
const getNowTime = () => {
    const now = new Date()
    const h = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()
    const m = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
    const s = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()
    nowTime.value = `${h}:${m}:${s}`
    window.requestAnimationFrame(getNowTime)
}

onMounted(() => {
    getNowTime()
})
</script>

<style lang="scss" scoped>
.we-timer {
    font-size: 13px;
    color: #000;
}
</style>
