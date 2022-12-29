<template>
    <div class="home">
        <db-click-input v-model="name" />
        <div style="white-space: pre-line; word-break: break-word">
            {{ name }}
        </div>
    </div>
</template>

<script>
import DbClickInput from '@/components/DbClickInput'

export default {
    title: '首页',
    name: 'Home',
    computed: {},
    data() {
        return {
            name: 'www'
        }
    },
    components: {
        DbClickInput
    }
}
</script>
<style scoped lang="scss">
.home {
}
</style>
