<!--
 * @Name: ResImg.vue
 * @Author: forguo
 * @Date: 2022/9/12 21:22
 * @Description: ResImg
-->
<template>
    <div ref="resImg" style="background: rgba(255,255,255,1); border-radius: 16px;" />
</template>

<script>
export default {
    name: "ResImg",
    props: {
        res: {
        },
    },
    watch: {
        res: {
            handler(val) {
                if (val) {
                    console.log(this.$refs['resImg'].firstElementChild)
                    this.$refs['resImg'].firstElementChild && this.$refs['resImg'].removeChild(this.$refs['resImg'].firstElementChild)
                    this.$refs['resImg'].appendChild(val)
                }
            },
            deep: true,
            immediate: true,
        }
    }
}
</script>

<style scoped>

</style>
