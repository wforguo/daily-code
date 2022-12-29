<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2022/4/13 11:17
 * @Description: index
-->
<template>
    <div class="page lazy--load">
        <van-cell-group inset style="overflow: hidden">
            <!-- 异步组件 -->
            <van-divider dashed content-position="left">异步组件</van-divider>
            <h5>componentName: () => import('componentName');</h5>
            <van-button round type="info" @click="loaded = !loaded">加载异步组件</van-button>
            <lazyLoad v-if="loaded"></lazyLoad>

            <!-- 动态组件 -->
            <van-divider dashed content-position="left">动态组件</van-divider>
            <h5>&lt;component :is="componentName" /&gt;</h5>
            <van-tabs v-model="componentName">
                <van-tab title="Icon" name="van-icon">Icon</van-tab>
                <van-tab title="switch" name="van-switch">Switch</van-tab>
                <van-tab title="Image" name="van-image">Image</van-tab>
            </van-tabs>
            <!-- 失活的组件将会被缓存！-->
            <keep-alive>
                <component
                    v-model="checked"
                    width="30"
                    height="30"
                    name="chat-o"
                    src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    round
                    type="primary"
                    loading-text="加载中..."
                    :is="componentName"
                ></component>
            </keep-alive>

            <!-- 自定义v-model-->
            <van-divider dashed content-position="left">自定义v-model</van-divider>
            {{ value }}
            <custom-input :value.sync="value" v-model="value"></custom-input>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    hidden: true,
    title: '组件',
    name: 'components',
    components: {
        lazyLoad: () => import('@/views/Component/LazyLoad'),
        CustomInput: () => import('./CustomInput')
    },
    data() {
        return {
            loaded: false,
            componentName: 'van-icon',
            checked: false,
            value: '10000'
        }
    },
    mounted() {},
    methods: {}
}
</script>

<style scoped></style>
