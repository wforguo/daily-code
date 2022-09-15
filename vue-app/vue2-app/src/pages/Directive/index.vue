<template>

    <div v-if="value !== 'fuck'">
        <input v-model="value" type="text" v-focus.lefr.top="value" />
    </div>

</template>

<script>
export default {
    name: "directive",
    title: '指令',
    data () {
        return {
            value: ''
        }
    }
}
</script>

<style scoped>

</style>
