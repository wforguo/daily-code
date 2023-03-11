<!--
 * @Name: AsyncShow.vue
 * @Author: forguo
 * @Date: 2022/5/17 16:03
 * @Description: AsyncShow
-->
<template>
    <el-card shadow="hover">
        <template #header>我是异步组件</template>
        <div>
            {{ res.data }}
        </div>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    name: 'AsyncShow',
    async setup() {
        const res = await axios({
            url: 'https://www.forguo.cn/api/common/wechat/sdk',
            params: {
                url: window.location.href
            }
        })
        return {
            res: res.data
        }
    }
})
</script>

<style scoped></style>
