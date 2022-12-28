<template>
    <el-container style="height: 100vh; overflow: hidden">
        <el-aside style="height: 100vh" width="200px">
            <el-menu default-active="/" router style="height: 100%">
                <el-menu-item :to="{ path }" :index="path" v-for="{ path, title } in menu.list" :key="path">
                    <span>{{ title }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="background-color: #f6f9fe; display: flex; align-items: center">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>Vue3</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main style="background: #f2f3f5">
                <el-card style="width: 100%; height: 100%; box-sizing: border-box" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span>{{ $route?.meta?.title }}</span>
                        </div>
                    </template>
                    <router-view />
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
        return {
            menu
        }
    }
})
</script>
