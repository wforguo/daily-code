<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px" style="height: 100vh;">
            <el-menu
                style="height: 100%"
                default-active="2"
                router
            >
                <el-menu-item index="/" :to="{ path: '/' }">
                    <i class="el-icon-menu"></i>
                    <span slot="title">home</span>
                </el-menu-item>
                <el-menu-item index="/wei_design" :to="{ path: '/wei_design' }">
                    <i class="el-icon-document"></i>
                    <span slot="title">wei_design</span>
                </el-menu-item>
                <el-menu-item index="/pinia" :to="{ path: '/pinia' }">
                    <i class="el-icon-setting"></i>
                    <span slot="title">pinia</span>
                </el-menu-item>
                <el-menu-item index="/vue-app" :to="{ path: '/vue-app' }">
                    <i class="el-icon-setting"></i>
                    <span slot="title">vue-app</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="background-color: #f6f9fe; display: flex;align-items: center;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main>
                <router-view />
                <div id="vueApp">
                </div>
            </el-main>
            <el-footer style="background-color: #f6f9fe; display: flex;align-items: center; justify-content: center;">&copy; 2022</el-footer>
        </el-container>
    </el-container>

</template>

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
