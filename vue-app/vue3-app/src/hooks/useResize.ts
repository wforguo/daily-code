import { onMounted, onUnmounted, ref } from 'vue'

const useResize = function () {
    const width = ref<number>(0)
    const height = ref<number>(0)
    function update() {
        const clientRect = document.body.getBoundingClientRect()
        width.value = clientRect.width
        height.value = clientRect.height
    }
    onMounted(() => {
        update()
        window.addEventListener('resize', update)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', update)
    })
    return {
        width,
        height
    }
}

export default useResize
