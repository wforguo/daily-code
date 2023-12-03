<!--
 * @Name: Pinia.vue
 * @Author: forguo
 * @Date: 2022/7/14 13:50
 * @Description: Pinia
-->
<template>
    <div class="page pinia">
        <p>name: {{ user.name }}</p>
        <p>signature: {{ user.signature || '' }}</p>
        <p>
            {{ JSON.stringify(user) }}
        </p>
        <el-button @click="handleAddCart">登录</el-button>

        <hr />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'

export default defineComponent({
    components: {},
    title: '状态',
    hidden: true,
    setup() {
        const user = useUserStore()
        const handleAddCart = async () => {
            console.log(user)
            await user.login('admin', 'root')
            console.log('handleAddCart --->')
            ElMessage.success('Login Success~')
        }
        return {
            user,
            handleAddCart
        }
    }
})
</script>
