<template>
    <div className="request">
        <h3><code>axios应用</code></h3>
    </div>
</template>

<script>

import request from '../../libs/request';
import * as qs from "qs";

export default {
    name: "request",
    title: '接口请求',
    mounted() {
        console.log('request');
        request.request({
            method: 'post',
            url: 'https://cloud-app.com.cn/wechat/sdk',
            data: qs.stringify({
                url: window.location.href
            })
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }
}
</script>

<style scoped>

</style>
