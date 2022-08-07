<!--
 * @Name: MuButton.vue
 * @Author: forguo
 * @Date: 2021/9/23 20:46
 * @Description: MuButton
-->
<template>
    <div>
        <p>
            $attrs：{{$attrs}}
        </p>
        <p>
            $props：{{$props}}
        </p>
        <van-button v-bind="$attrs" :loading="loading" @click="handleClick"><slot /></van-button>
    </div>
</template>

<script>
export default {
    props: {
        autoLoading: {
            type: Boolean,
            default: false
        },
    },
    data () {
        return {
            loading: false,
        }
    },
    methods: {
        handleClick() {
            if (this.autoLoading) {
                // 判断是否开启自动loading
                this.loading = true;
            }
            // 点击的回调
            this.$emit('click', () => {
                // 在异步完成之后，去除loading
                this.loading = false;
            })
        }
    }
}
</script>

<style scoped>

</style>
