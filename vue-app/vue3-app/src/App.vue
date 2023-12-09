<template>
    <el-container style="height: 100vh; overflow: hidden">
        <el-aside style="max-width: 200px; height: 100vh">
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
                <div class="page-header__main">
                    <NoticeBar
                        class="page-notice"
                        :notices="[
                            '无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。',
                            '不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。'
                        ]"
                    />
                </div>
            </el-header>
            <el-main style="background: #f2f3f5">
                <el-card
                    style="width: 100%; height: 100%; box-sizing: border-box; display: flex; flex-direction: column"
                    shadow="never"
                    body-style="flex: 1;width: 100%; height: 100%;"
                >
                    <!--                    <template #header>-->
                    <!--                        <div class="card-header">-->
                    <!--                            <span>{{ $route?.meta?.title }}</span>-->
                    <!--                        </div>-->
                    <!--                    </template>-->
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

<script lang="ts" setup>
import { onBeforeRouteUpdate, useRouter, onBeforeRouteLeave } from 'vue-router'
import { ref } from 'vue'
import { useMenuStore } from '@/store'
import NoticeBar from '@/components/NoticeBar/index.vue'
const isDev = ref(import.meta.env.MODE === 'development')
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
</script>

<style lang="scss">
.page-header__main {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 100px;
    .page-notice {
        width: 100%;
    }
}
</style>
