<!--
 * @Name: FlowLibrary.vue
 * @Author: forguo
 * @Date: 2022/12/17 16:08
 * @Description: FlowLibrary
-->
<template>
    <div class="flow-library">
        <div class="flow-library-title">组件库</div>
        <div class="flow-library-list" v-loading="loading">
            <el-collapse v-model="activeNames">
                <el-collapse-item
                    v-for="item in list"
                    :name="item.code"
                    :key="item.code"
                >
                    <template slot="title">{{ item.title }}</template>
                    <div class="flow-library-group">
                        <div
                            class="flow-library-item"
                            v-for="group in item.groups"
                            :key="group.id"
                        >
                            <div
                                class="flow-library-item__img"
                                :class="'flow-library-item__img--' + group.shape"
                                :data-name="group.name"
                                :data-id="group.id"
                                :data-image="group.image"
                                :data-shape="group.shape"
                                :style="{
                                    backgroundImage: `url(${group.image})`,
                                }"
                                @mousedown.stop="handleonAddNode"
                            >
                                <div class="flow-library-item__name">{{ group.name }}</div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="功能点" name="intro">
                    <ul>
                        <el-tag style="margin: 6px">自定义节点</el-tag>
                        <el-tag style="margin: 6px">节点缩放</el-tag>
                        <el-tag style="margin: 6px">动态链接桩</el-tag>
                        <el-tag style="margin: 6px">右键菜单</el-tag>
                        ...
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>

import {SETTING_SHAPE_NAME} from "@/views/X6/config";

export default {
    name: 'FlowLibrary',
    data() {
        return {
            activeNames: [],
            // 过滤数据
            list: [],
            loading: true,
        }
    },
    created() {
        const list = [
            {
                title: '内置组件',
                code: 'base',
                groups: [
                    {
                        name: '矩形',
                        image: require('../assets/icon-flow-rect.svg'),
                        shape: 'rect',
                    },
                    {
                        name: '圆',
                        image: require('../assets/icon-flow-circle.svg'),
                        shape: 'circle',
                    },
                ],
            },
            {
                title: '自定义组件',
                code: 'custom',
                groups: [
                    {
                        id: 'Client',
                        name: 'Client',
                        image: require('../assets/icon-flow-client.svg'),
                        shape: SETTING_SHAPE_NAME,
                    },
                    {
                        id: 'Http',
                        name: 'Http',
                        image: require('../assets/icon-flow-http.svg'),
                        shape: SETTING_SHAPE_NAME,
                    },
                    {
                        id: 'Cloud',
                        name: 'Cloud',
                        image: require('../assets/icon-flow-cloud.svg'),
                        shape: SETTING_SHAPE_NAME,
                    },
                    {
                        id: 'Sql',
                        name: 'Sql',
                        image: require('../assets/icon-flow-sql.svg'),
                        shape: SETTING_SHAPE_NAME,
                    },
                ],
            }
        ]
        this.list = list
        this.activeNames = [
            ...list.map(item => item.code),
            ...['intro']
        ]
        setTimeout(() => {
            this.loading = false
        }, 1000)
        // 获取数据源...
    },
    methods: {
        handleonAddNode(e) {
            this.$emit('onAddNode', e)
        },
    },
}
</script>

<style scoped lang="scss">
.flow-library {
    user-select: none;
    width: 272px;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    border-right: 1px solid #dcdfe6;
    display: flex;
    flex-direction: column;
    &-title {
        line-height: 48px;
        font-weight: bold;
    }
    &-group {
        display: flex;
        flex-wrap: wrap;
        padding: 8px 0 8px 16px;
    }
    &-item {
        width: 72px;
        float: left;
        text-align: center;
        margin-right: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 8px;
        &__img {
            width: 64px;
            height: 64px;
            margin-top: 8px;
            background-repeat: no-repeat;
            background-size: contain;
            cursor: pointer;
            position: relative;
            &--setting-shape {
                background-size: 32px;
                background-color: #5F95FF;
                background-position: 50% 15%;
                .flow-library-item__name {
                    position: absolute;
                    height: auto;
                    width: 100%;
                    font-size: 12px;
                    cursor: pointer;
                    text-align: center;
                    bottom: 4px;
                    opacity: 1;
                }
            }
        }
        &__name {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            opacity: 0;
        }
    }
}
</style>
