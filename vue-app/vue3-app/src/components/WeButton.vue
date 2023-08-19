<!--
 * @Name: WeButton.vue
 * @Author: forguo
 * @Date: 2023/8/17 17:00
 * @Description: WeButton
-->
<template>
    <button @click="emits('click')" :disabled="loading || disabled" class="we-button" :class="[disabled, loading]">
        <slot />
    </button>
</template>
<script lang="ts" setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['click'])
</script>
<script lang="ts">
export default {
    name: 'WeButton'
}
</script>
<style lang="scss">
.we-button {
    &.loading {
        background: #eeeff3;
    }
}
</style>
