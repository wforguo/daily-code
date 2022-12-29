<template>
    <el-container style="height: 100vh; overflow: hidden">
        <el-aside style="height: 100vh" width="200px">
            <el-menu :default-active="$route?.path || '/'" router style="height: 100%">
                <el-menu-item :index="path" v-for="{ path, title, name } in list" :key="path" @select="handleNav(name)">
                    <span>{{ title }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="background-color: #f6f9fe; display: flex; align-items: center">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>daily-code</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main style="background: #f2f3f5">
                <el-card
                    style="width: 100%; height: 100%; box-sizing: border-box;display: flex; flex-direction: column;}"
                    shadow="never"
                    body-style="flex: 1; width: 100%; height: 100%;"
                >
                    <template #header>
                        <div class="card-header">
                            <span>{{ $route?.meta?.title }}</span>
                        </div>
                    </template>
                    <router-view />
                </el-card>
            </el-main>
            <el-footer style="background-color: #f6f9fe; display: flex; align-items: center; justify-content: center">
                <a href="https://github.com/wforguo" target="_blank">forguo &copy; {{ new Date().getFullYear() }}</a>
            </el-footer>
        </el-container>
    </el-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'vueApp',
    computed: {
        ...mapState('menu', ['list'])
    },
    methods: {
        handleNav(name) {
            console.log(name)
            this.$router.push({
                name
            })
        }
    }
}
</script>

<style lang="scss">
html {
    height: 100%;
    background: #f7f8fa;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
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
</style>
