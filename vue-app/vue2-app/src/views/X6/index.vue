<!--
 * @Name: Flow.vue
 * @Author: forguo
 * @Date: 2022/12/17 16:08
 * @Description: 流程图
-->
<template>
    <div class="ant-flow">
        <flow-library @onAddNode="onAddNode" />
        <div id="container" style="flex: 1; width: 100%; height: 100%;"></div>
        <flow-content-menu :visible.sync="menuVisible" :position="menuPosition" @onMenuClick="onMenuClick" />
        <el-button @click="handleSave" type="primary" class="ant-flow-save">保存</el-button>
    </div>
</template>

<script>
import {
    Graph,
    Addon,
    DataUri,
} from "@antv/x6";

import FlowLibrary from "@/views/X6/components/FlowLibrary";
import FlowContentMenu from "@/views/X6/components/FlowContentMenu";
import rawSource from "@/views/X6/config/data";
import {graphOptions, ports, SETTING_SHAPE_NAME, SettingNodeOptions, colors} from "@/views/X6/config";
let graph = null
let dnd = null
let selector = null

export default {
    name: "X6",
    components: {FlowContentMenu, FlowLibrary},
    title: 'Antv/X6流程图',
    data() {
        return {
            rawSource: rawSource,
            menuVisible: false,
            menuPosition: {

            }
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        // 画布的销毁以及回收
        graph && graph.dispose()
        graph = null
        dnd = null
        selector = null
    },
    methods: {
        /**
         * 初始化画布
         */
        init() {
            graph = new Graph(graphOptions(false))

            // 注册自定义节点
            this.registerNode()

            // 读取配置
            graph.fromJSON(this.rawSource)

            // 居中展示
            graph.centerContent()

            // 快捷键
            this.initEvent()

            // 拖拽init
            const options = {
                target: graph,
                scaled: false,
                animation: true,
            }
            dnd = new Addon.Dnd(options)
        },
        /**
         * 注册自定义节点
         */
        registerNode() {
            Graph.registerNode(
                SETTING_SHAPE_NAME,
                {
                    ...SettingNodeOptions,
                },
                true
            )
        },
        /**
         * 快捷键与事件
         */
        initEvent(){
            // 点击...
            graph.on('cell:click', (e) => {
                this.menuVisible = false
                const { node } = e
                const data = node.getData()
                console.log(data)
            })

            // 双击动态添加链接桩
            graph.on('node:dblclick', e => {
                const { e: event, node } = e
                const shape = e.node.shape
                // 当前选中元素
                const $select = shape === SETTING_SHAPE_NAME ? document.querySelector('.x6-node-selected > rect') : document.querySelector(`.x6-node-selected > ${shape}`)
                if (!$select) {
                    return
                }
                const position = $select.getBoundingClientRect && $select.getBoundingClientRect()
                if (!position) {
                    return
                }
                // 鼠标位置
                const pageX = event.pageX
                const pageY = event.pageY
                const zoom = graph.zoom()
                // 相对节点左上角的位置
                const x = (pageX - position.x) / zoom
                const y = (pageY - position.y) / zoom
                node.addPort({
                    group: 'absolute',
                    args: {
                        // 计算链接桩位置
                        x: Math.round(x),
                        y: Math.round(y),
                    },
                    silent: false,
                })
            })

            // Edge工具
            graph.on('cell:mouseenter', ({ cell }) => {
                if (cell.isEdge()) {
                    //  https://x6.antv.vision/zh/docs/tutorial/intermediate/tools
                    // 1、vertices 路径点工具，在路径点位置渲染一个小圆点，
                    // 2、segments 线段工具。在边的每条线段的中心渲染一个工具条，可以拖动工具条调整线段两端的路径点的位置。
                    cell.addTools([
                        'vertices',
                        'segments',
                        {
                            name: 'button-remove',
                            args: {
                                x: '30%',
                                y: '50%',
                            },
                        },
                    ])
                }
            })
            graph.on('cell:mouseleave', ({ cell }) => {
                if (cell.isEdge()) {
                    cell.removeTool('vertices')
                    cell.removeTool('segments')
                    cell.removeTool('button-remove')
                }
            })

            // 链接桩控制
            graph.on('node:mouseenter', () => {
                this.showPorts(true)
            })
            graph.on('node:mouseleave', () => {
                this.showPorts(false)
            })

            // 右键菜单
            graph.on('cell:contextmenu', e => {
                const { e: event, cell } = e
                // 画布节点
                selector = cell
                this.menuVisible = false
                this.menuPosition = {
                    left: event.pageX + 'px',
                    top: event.pageY + 'px',
                }
                this.menuVisible = true
            })

            // 点击画布空白区域
            graph.on('blank:click', () => {
                graph.cleanSelection && graph.cleanSelection()
                // 关闭右键菜单
                this.menuVisible = false
            })

            /**
             * 基础操作S
             */
            // copy cut paste
            graph.bindKey(['meta+c', 'ctrl+c'], () => {
                const cells = graph.getSelectedCells()
                if (cells.length) {
                    graph.copy(cells)
                }
                return false
            })

            graph.bindKey(['meta+x', 'ctrl+x'], () => {
                const cells = graph.getSelectedCells()
                if (cells.length) {
                    graph.cut(cells)
                }
                return false
            })
            graph.bindKey(['meta+v', 'ctrl+v'], () => {
                if (!graph.isClipboardEmpty()) {
                    const cells = graph.paste({ offset: 32 })
                    graph.cleanSelection()
                    graph.select(cells)
                }
                return false
            })

            //undo redo
            graph.bindKey(['meta+z', 'ctrl+z'], () => {
                if (graph.history.canUndo()) {
                    graph.history.undo()
                }
                return false
            })
            graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
                if (graph.history.canRedo()) {
                    graph.history.redo()
                }
                return false
            })

            // select all
            graph.bindKey(['meta+shift+a', 'ctrl+shift+a'], () => {
                const nodes = graph.getNodes()
                if (nodes) {
                    graph.select(nodes)
                }
            })

            // delete
            graph.bindKey(['backspace', 'delete'], () => {
                // 删除选中的元素
                const cells = graph.getSelectedCells()
                // console.log(cells.isEdge())
                if (cells.length) {
                  graph.removeCells(cells)
                }
            })

            // zoom
            graph.bindKey(['ctrl+1', 'meta+1'], () => {
                const zoom = graph.zoom()
                if (zoom < 1.5) {
                    graph.zoom(0.1)
                }
            })
            graph.bindKey(['ctrl+2', 'meta+2'], () => {
                const zoom = graph.zoom()
                if (zoom > 0.5) {
                    graph.zoom(-0.1)
                }
            })
            /**
             * 基础操作E
             */
        },
        // 连接桩显示/隐藏
        showPorts(show) {
            const container = document.getElementById('container')
            const ports = container.querySelectorAll('.x6-port-body')
            for (let i = 0, len = ports.length; i < len; i = i + 1) {
                ports[i].style.visibility = show ? 'visible' : 'hidden'
            }
        },
        /**
         * 添加节点
         */
        onAddNode(e) {
            const target = e && e.target.closest('.flow-library-item__img')
            if (target) {
                const id = target.getAttribute('data-id')
                const image = target.getAttribute('data-image')
                const name = target.getAttribute('data-name')
                const shape = target.getAttribute('data-shape')
                console.log(shape)
                const nodeOptions = shape === SETTING_SHAPE_NAME ?{
                    shape,
                    label: name,
                    attrs: {
                        settingImage: {
                            'xlink:href': image,
                        },
                        settingName: {
                            'text': name,
                        },
                    },
                    // 业务数据
                    data: {
                        shape,
                        id
                    }
                } : {
                    shape,
                    width: 64,
                    height: 64,
                    label: name,
                    ports: { ...ports },
                    // 业务数据
                    data: {
                        shape,
                        id
                    }
                }
                const newNode = graph.createNode({
                    ...nodeOptions
                })
                dnd.start(newNode, e)
            }
        },
        // 右击
        onMenuClick(select) {
            const [option] = select
            switch (option) {
                case 'name': {
                    const color =  colors[Math.floor(Math.random() * 100 % 6)]
                    selector.attr('settingName/text', color)
                    selector.attr('settingName/fill', color)
                    selector.attr('text/text', color)
                    selector.attr('text/fill', color)
                    break
                }
                case 'color': {
                    selector.attr('body/fill', colors[Math.floor(Math.random() * 100 % 6)])
                    selector.attr('body/stroke', colors[Math.floor(Math.random() * 100 % 6)])
                    break
                }
                case 'remove': {
                    graph.removeNode(selector)
                    break
                }
            }
        },
        /**
         * 保存
         */
        handleSave() {
            const res = graph.toJSON()
            this.rawSource = res
            console.log(JSON.stringify(res))
            graph.toPNG((dataUri) => {
                // 下载
                DataUri.downloadDataUri(dataUri, `${new Date().toLocaleString()}.chart.png`)
            }, {
                // 导出的图片参数
                width: 1920,
                height: 1080,
                padding: {
                    top: 25,
                    right: 25,
                    bottom: 25,
                    left: 25,
                },
            })
            this.$message.success('保存成功')
        },
    },
}
</script>

<style scoped lang="scss">
.ant-flow {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
    .container {
        flex: 1;
        width: 100%;
        height: 100%;
    }
    .ant-flow-save {
        width: 252px;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>
