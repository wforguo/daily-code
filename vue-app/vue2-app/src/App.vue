<template>
    <div id="vue">
<!--        <div id="pageBg">-->
<!--        </div>-->
        <van-nav-bar
            :title="routeName"
            :left-text="showBack ? '返回' : ''"
            :left-arrow="showBack"
            @click-left="handleNavHome"
        />
        <router-view></router-view>
<!--        <keep-alive>-->
<!--        </keep-alive>-->
        <div class="fixed-button" v-show="showBack">
            <van-icon name="wap-home-o" size="32" @click="handleNavHome" />
        </div>
    </div>
</template>

<script>

import { mapActions } from "vuex";
// import CanvasNest from 'canvas-nest.js';

export default {
    name: 'vueApp',
    methods: {
        ...mapActions('router', [
            'setRouters'
        ]),
        handleNavHome () {
            this.$router.replace({
                path: '/',
            });
        }
    },
    computed: {
        routeName () {
            return this.$route.meta.title
        },
        showBack () {
            return this.$route.path !== '/'
        }
    },
    mounted() {
        // const config = {
        //     pointColor: '255,0,0',
        //     count: 188,
        //     pointR: 1,
        //     opacity: 0.75
        // };
        // const element = document.getElementById('pageBg');
        // new CanvasNest(element, config);
        this.setRouters({
            routers: this.$router.options.routes
        });
    }
}
</script>

<style lang="less">
html {
    height: 100%;
    background: #f7f8fa;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#vue {
    height: 100%;
    overflow-y: auto;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: #f7f8fa;
}

body {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: linear-gradient(to top right, #ffcc00 50%, #eee 50%) no-repeat;
    background-size: 100% calc(100% - 100vh + 5px);
    position: relative;

    &:after {
        left: 0;
        top: 5px;
        bottom: 0;
        right: 0;
        position: fixed;
        content: '';
        overflow: hidden;
        background: #fff;
        z-index: -1;
    }
}

.fixed-button {
    position: fixed;
    bottom: 50px;
    right: 50px;
}

#pageBg {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    pointer-events: none;
}

</style>
