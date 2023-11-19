<template>
    <div class="page race" v-spin="true">
        <el-card>
            <i class="el-icon-loading"></i>
            <i class="el-icon-edit"></i>

            <el-link target="_blank" href="https://mp.weixin.qq.com/s/smOJHGkPegvs5ENv7PTbmw">竞态问题</el-link>
            <el-link target="_blank" href="https://juejin.cn/post/7071518211392405541#heading-13">axios封装</el-link>
            <el-divider />
            <el-input v-model="keyword" @input="handleSearch" clearable placeholder="请输入搜索内容" />
            <el-divider />
            <el-table :data="res.data" empty-text="暂无数据">
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="age" label="年龄" />
                <el-table-column prop="city" label="城市" />
            </el-table>
            <el-button @click="cancelApi">取消请求</el-button>
        </el-card>
        <el-alert>width is {{ width }}, height is {{ height }}</el-alert>
    </div>
</template>

<script lang="ts">
export default {
    name: 'HomeView',
    title: '竞态问题'
}
</script>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import { request, cancelRequest } from '@/libs'
import axios from 'axios'

import useResize from '@/hooks/useResize'

const { width, height } = useResize()

const keyword: Ref<string> = ref('')
let res = reactive({
    data: []
})

const handleSearch = async (keyword?: string) => {
    try {
        cancelRequest('/api/search')
        const data = await request({
            method: 'post',
            url: '/api/search',
            data: {
                keyword
            }
        })
        res.data = data.data
    } catch (e: any) {
        if (axios.isCancel(e)) {
            console.log('Request canceled', e)
        } else {
            // 处理错误
            console.log('request', e)
        }
    }
}

const cancelApi = () => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    axios
        .get('/search', {
            cancelToken: source.token
        })
        .catch(function (e) {
            if (axios.isCancel(e)) {
                console.log('Request canceled', e.message)
            } else {
                // 处理错误
                console.log('request', e)
            }
        })

    axios.post(
        '/search',
        {
            name: 'new name'
        },
        {
            cancelToken: source.token
        }
    )

    // 取消请求（message 参数是可选的）
    source.cancel('Operation canceled by the user.')
}
onBeforeMount(() => {
    handleSearch()
})
</script>
