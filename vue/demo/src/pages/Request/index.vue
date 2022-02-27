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
    mounted () {
        this.jsonpRequest();
    },
    methods: {
        /**
         * @desc js原生实现jsonp
         */
        jsonpRequest () {
            // 创建一个script标签，并插入页面
            let script = document.createElement('script');

            // 获取到跨域资源后的回调
            window.handleFn = function (res) {
                // JSONP跨域成功返回的资源
                console.log(res);
                //代码执行后，删除插入的script标签
                document.getElementsByTagName('head')[0].removeChild(script);
            }
            let url = `http://127.0.0.1:3003/common/wechat/sdk?callback=handleFn`;
            script.setAttribute('src', url);
            // 将script标签插入到网页中
            document.getElementsByTagName('head')[0].appendChild(script);
        },
        request () {
            request.request({
                method: 'get',
                url: 'http://127.0.0.1:3003/common/wechat/sdk',
                data: qs.stringify({
                    url: window.location.href
                })
            }).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
        },
    }
}
</script>

<style scoped>

</style>
