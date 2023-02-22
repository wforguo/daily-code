<template>
    <el-container style="height: 100vh; overflow: hidden">
        <el-aside style="max-width: 200px; height: 100vh; width: 0">
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
                    style="width: 100%; height: 100%; box-sizing: border-box; display: flex; flex-direction: column"
                    shadow="never"
                    body-style="flex: 1;width: 100%; height: 100%;"
                >
                    <template #header>
                        <div class="card-header">
                            <span>{{ $route?.meta?.title }}</span>
                        </div>
                    </template>
                    <router-view />
                    <div id="vue2App"></div>
                </el-card>
            </el-main>
            <el-footer
                style="
                    display: none;
                    background-color: #f6f9fe;
                    /*display: flex;*/
                    align-items: center;
                    justify-content: center;
                "
            >
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
