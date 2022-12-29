<!--
 * @Name: LazyLoad.vue
 * @Author: forguo
 * @Date: 2022/4/13 12:12
 * @Description: LazyLoad
-->
<template>
    <div>
        <van-divider>我是异步组件</van-divider>
        <van-cell title="按钮组件的二次封装" />
        <h5>$attrs属性的使用</h5>
        <MyButton round type="primary" autoLoading @click="initSdk">请求微信SDK</MyButton>
    </div>
</template>

<script>
import request from '@/libs/request'
import MyButton from '@/components/MyButton'
import * as qs from 'qs'

export default {
    name: 'LazyLoad',
    components: {
        MyButton
    },

    methods: {
        initSdk(done) {
            request
                .request({
                    method: 'post',
                    url: 'https://www.forguo.cn/api/common/wechat/sdk',
                    data: qs.stringify({
                        url: window.location.href
                    })
                })
                .then(
                    res => {
                        console.log(res)
                        this.$toast({
                            message: '成功',
                            type: 'success'
                        })
                        done()
                    },
                    err => {
                        console.log(err)
                        done()
                    }
                )
        }
    }
}
</script>

<style scoped></style>
