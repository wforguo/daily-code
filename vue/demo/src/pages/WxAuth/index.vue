<template>
    <div class="request">
        <h3><code>微信公众号授权</code></h3>

        <Button type="primary" @click="vote">点赞</Button>
    </div>
</template>

<script>

import request from '../../libs/request';
import { Button } from 'vant';
export default {
    name: "wxAuth",
    title: '微信公众号授权',
    components: {
        Button,
    },
    mounted() {
        let q = {};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;
        let code = q.code;
        let token = window.localStorage.getItem('token');
        if (!token && !code) {
            window.login();
        } else if (!token && code) {
            request.request({
                method: 'get',
                url: `http://127.0.0.1:3003/wechat/getUserInfo?code=${q.code}`,
            }).then((res) => {
                console.log(res);
                let data = res.data;
                let {
                    userInfo,
                    token,
                } = data;
                window.localStorage.setItem('token', token);
                window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
                var loc = location.protocol + '//' + location.host + location.pathname;
                window.history.replaceState({}, document.title, loc);
            });
        }
    },
    methods: {
        vote () {
            request.request({
                method: 'get',
                url: `http://127.0.0.1:3003/votes/list`,
            }).then((res) => {
                console.log(res);
            });
        }
    }

}
</script>

<style scoped>

</style>
