<template>
    <el-container style="height: 100vh">
        <el-aside style="height: 100vh" width="200px">
            <el-menu default-active="2" router style="height: 100%">
                <el-menu-item :to="{ path }" :index="path" v-for="{ path, title } in menu.list" :key="path">
                    <span>{{ title }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="background-color: #f6f9fe; display: flex; align-items: center">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main>
                <router-view />
                <div id="vueApp"></div>
            </el-main>
            <el-footer style="background-color: #f6f9fe; display: flex; align-items: center; justify-content: center">
                &copy; 2022
            </el-footer>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMenuStore } from '@/store'
export default defineComponent({
    components: {},
    setup() {
        const menu = useMenuStore()
        return {
            menu
        }
    }
})
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
