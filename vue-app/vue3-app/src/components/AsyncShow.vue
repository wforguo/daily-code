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
            {{ res }}
        </div>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { request } from '@/libs'

export default defineComponent({
    name: 'AsyncShow',
    async setup() {
        const res = await request({
            url: 'https://api.fenghua.rainyman.cn/auth/login',
            params: {
                url: window.location.href
            }
        })
        console.log(res.data)
        return {
            res: res.data
        }
    }
})
</script>

<style scoped></style>
