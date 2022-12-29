<!--
 * @Name: FlowContentMenu.vue
 * @Author: forguo
 * @Date: 2022/12/17 16:08
 * @Description: 右键菜单
-->
<template>
    <el-card
        class="flow-contextmenu"
        ref="flowMenu"
        v-show="visible"
        :style="menuStyle"
        body-style="padding: 12px 0 12px 12px"
    >
        <el-cascader-panel
            :props="{ expandTrigger: 'hover' }"
            :options="options"
            :border="false"
            v-model="select"
            @change="handleMenuClick"
        >
            <template v-slot="{ node, data }">
                <span class="flow-contextmenu__node">{{ data.label }}</span>
            </template>
        </el-cascader-panel>
    </el-card>
</template>

<script>
export default {
    props: {
        // 隐藏/显示
        visible: {
            type: Boolean,
            default: false
        },
        // 位置
        position: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        menuStyle() {
            return {
                ...this.position
            }
        }
    },
    watch: {
        visible: {
            handler() {
                this.select = []
            }
        }
    },
    data() {
        return {
            select: [],
            options: [
                {
                    value: 'name',
                    label: '随机name'
                },
                {
                    value: 'color',
                    label: '随机color'
                },
                {
                    value: 'remove',
                    label: '删除'
                }
            ]
        }
    },
    methods: {
        handleMenuClick(action) {
            this.$emit('onMenuClick', action)
            this.$emit('update:visible', false)
        }
    }
}
</script>

<style lang="scss" scoped>
.flow-contextmenu {
    min-width: 150px;
    position: fixed;
    user-select: none;
    z-index: 99;
    ::v-deep .el-cascader-menu {
        min-width: auto;
        .el-cascader-node {
            z-index: 10;
            margin-right: 10px;
            padding-right: 12px;
            padding-left: 14px;
        }
    }
    .flow-contextmenu__node {
        display: inline-block;
        min-width: 60px;
    }
}
</style>
