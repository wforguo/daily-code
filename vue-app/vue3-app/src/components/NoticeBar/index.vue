<template>
    <div class="notice-bar" @mouseenter="handleStopPlay" @mouseleave="handleStartPlay">
        <slot name="icon">
            <IconNotice class="notice-bar__icon" />
        </slot>
        <div class="notice-bar__notices" ref="noticesRef">
            <div
                class="notice-bar__content"
                :class="animationPlayState"
                ref="noticesContentRef"
                :style="style"
                @animationend="handleTransitionEnd"
            >
                {{ noticesContent }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'NoticeBar'
})
import { useElementSize } from '@vueuse/core'
import IconNotice from './IconNotice.vue'
interface IProps {
    notices: string | string[]
    delay?: number
    speed?: number
}

const props = withDefaults(defineProps<IProps>(), {
    notices: '',
    delay: 0,
    speed: 60
})

// notice内容
const noticesContent = computed(() => {
    if (Array.isArray(props.notices)) {
        return props.notices.join(' ')
    }
    return props.notices
})

let noticesWidth = 0
let noticesContentWidth = 0
let startTimer: ReturnType<typeof setTimeout> | null

// 外容器
const noticesRef = ref<HTMLElement>()
// notice内容容器
const noticesContentRef = ref<HTMLElement>()

// 动画样式
const style = reactive({
    transform: `translateX(0px)`,
    animationName: 'none',
    // 动画播放状态
    animationDuration: `0s`
})
const animationPlayState = ref('running')

const play = () => {
    const { delay, speed } = props
    const ms = delay * 1000
    startTimer = setTimeout(() => {
        const noticesRefWidth = useElementSize(noticesRef).width
        const noticesContentRefWidth = useElementSize(noticesContentRef).width
        if (noticesContentRefWidth.value > noticesRefWidth.value) {
            noticesWidth = noticesRefWidth.value
            noticesContentWidth = noticesContentRefWidth.value
            // 动画时长
            const duration = noticesContentWidth / +speed
            style.animationName = `notice-bar-scroll`
            style.animationDuration = `${duration}s`
            animationPlayState.value = 'playing'
        } else {
            style.transform = `translateX(0)`
            style.animationName = `none`
            style.animationDuration = `0s`
            animationPlayState.value = 'paused'
        }
    }, ms)
}

// 动画结束
const handleTransitionEnd = () => {
    animationPlayState.value = 'paused'
    // 位置从末尾重新开始
    style.transform = `translateX(100%)`
    style.animationName = `none`
    nextTick(() => {
        // 下次播放
        play()
    })
}

const handleStopPlay = () => {
    if (animationPlayState.value === 'playing') {
        animationPlayState.value = 'paused'
    }
}

const handleStartPlay = () => {
    if (animationPlayState.value === 'paused') {
        animationPlayState.value = 'playing'
    }
}

nextTick(() => {
    play()
})

onBeforeMount(() => {
    startTimer && clearTimeout(startTimer)
    startTimer = null
})
</script>

<style lang="scss">
@use './style.scss';
</style>
