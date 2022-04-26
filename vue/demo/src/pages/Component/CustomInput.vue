<!--
 * @Name: LazyLoad.vue
 * @Author: forguo
 * @Date: 2022/4/13 12:12
 * @Description: LazyLoad
-->
<template>
    <div class="custom-input">
        <button @click="$emit('update:value', value + 1)">{{value}}</button>
        <input
            :value="value"
            @input="$emit('change', $event.target.value)"
        >
    </div>
</template>

<script>

export default {
    model: {
        event: 'change',
        prop: 'value',
    },
    props: {
        value: {
            type: String,
            default: '',
        }
    },
}
</script>

<style scoped>

</style>
