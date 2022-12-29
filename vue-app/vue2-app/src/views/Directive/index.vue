<template>
    <div v-if="value !== 'fuck'">
        <input v-model="value" type="text" v-focus.lefr.top="value" />
    </div>
</template>

<script>
export default {
    hidden: true,
    name: 'Directive',
    title: '指令',
    data() {
        return {
            value: ''
        }
    }
}
</script>

<style scoped></style>
