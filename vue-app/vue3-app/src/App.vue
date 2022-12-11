<template>
    <el-container style="height: 100vh; overflow: hidden">
        <el-aside style="height: 100vh" width="200px">
            <el-menu :default-active="$route?.path || '/'" router style="height: 100%">
                <el-menu-item
                    :index="path"
                    v-for="{ path, title, name } in menu.list"
                    :key="path"
                    @select="handleNav(name)"
                >
                    <span>{{ title }}</span>
                </el-menu-item>
                <el-menu-item :to="{ path: '/vue2-app' }" index="/vue2-app">
                    <span>vue2微应用</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="background-color: #f6f9fe; display: flex; align-items: center">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>{{ $route?.meta?.title }}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main style="background: #f2f3f5">
                <el-card
                    style="width: 100%; height: 100%; box-sizing: border-box"
                    shadow="never"
                    body-style="width: 100%; height: 100%;"
                >
                    <template #header>
                        <div class="card-header">
                            <span>Card name</span>
                        </div>
                    </template>
                    <router-view />
                    <div id="vue2App"></div>
                </el-card>
            </el-main>
            <el-footer style="background-color: #f6f9fe; display: flex; align-items: center; justify-content: center">
                &copy; 2022
            </el-footer>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { onBeforeRouteUpdate, useRouter, onBeforeRouteLeave } from 'vue-router'
import { defineComponent } from 'vue'
import { useMenuStore } from '@/store'
export default defineComponent({
    components: {},
    setup() {
        const menu = useMenuStore()
        const router = useRouter()
        onBeforeRouteUpdate(to => {
            console.log({ ...router }, to)
        })
        onBeforeRouteLeave(to => {
            console.log({ ...router }, to)
        })
        const handleNav = (name: string) => {
            console.log(name)
            router.push({
                name
            })
        }
        return {
            menu,
            handleNav,
            router
        }
    }
})
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
