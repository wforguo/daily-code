<!--
 * @Name: MuButton.vue
 * @Author: forguo
 * @Date: 2021/9/23 20:46
 * @Description: MuButton
-->
<template>
    <Button v-bind="$attrs" :loading="loadingStatus" @click="handleClick"><slot /></Button>
</template>

<script>
import { Button } from 'vant';
export default {
    name: "MuButton",
    /**
     props: {
        ...Button.props,
        autoLoading: {
            type: Boolean,
            default: false
        }
    },
     */
    props: {
        autoLoading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            loadingStatus: false,
        }
    },
    components: {
        Button
    },
    methods: {
        handleClick() {
            if (this.autoLoading) {
                // 判断是否开启自动loading
                this.loadingStatus = true;
            }
            // 点击的回调
            this.$emit('click', () => {
                // 在异步完成之后，去除loading
                this.loadingStatus = false;
            })
        }
    }
}
</script>

<style scoped>

</style>
