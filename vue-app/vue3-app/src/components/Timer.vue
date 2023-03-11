<template>
    <div class="we-timer">现在是：{{ nowTime }}</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

defineProps<{
    msg?: string
}>()
defineEmits(['count-down'])

const nowTime = ref<string>('00:00:00')
const getNowTime = () => {
    const now = new Date()
    const h = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()
    const m = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
    const s = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()
    nowTime.value = `${h}:${m}:${s}`
    setTimeout(getNowTime, 1000)
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
