<!--
 * @Name: RoamPanel.vue
 * @Author: forguo
 * @Date: 2023/1/16 14:51
 * @Description: RoamPanel
-->
<template>
    <div class="base-cesium-tool-panel cesium-roam-view-container">
        <div class="top-header">
            <span class="title-text">路径漫游</span>
            <span class="title-close" @click="close">❌</span>
        </div>
        <div class="body-content">
            <el-tabs type="card" @change="onchange">
                <el-tab-pane name="1" label="新增">
                    <el-row>
                        <el-col :span="8">
                            <span style="color: white; font-size: 14px">路线名称</span>
                        </el-col>
                        <el-col :span="4">
                            <el-input placeholder="输入名称" v-model="name" style="width: 160px" />
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 15px">
                        <el-col :span="8">
                            <span style="color: white; font-size: 14px">漫游速度</span>
                        </el-col>
                        <el-col :span="4">
                            <el-input-number v-model="speed" :min="10" :max="5000" style="width: 160px" />
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 15px">
                        <el-col :span="8">
                            <span style="color: white; font-size: 14px">视角高度</span>
                        </el-col>
                        <el-col :span="4">
                            <el-input-number v-model="fz" :min="10" :max="5000" style="width: 160px" />
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 15px">
                        <el-col :span="8">
                            <span style="color: white; font-size: 14px">视角距离</span>
                        </el-col>
                        <el-col :span="4">
                            <el-input-number v-model="fx" :min="10" :max="5000" style="width: 160px" />
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 15px; height: 25px">
                        <el-col :span="8">
                            <span style="color: white; font-size: 14px">显示轨迹</span>
                        </el-col>
                        <el-col :span="12">
                            <el-radio-group v-model="showLine">
                                <el-radio :value="true">是</el-radio>
                                <el-radio :value="false">否</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 15px">
                        <el-col :span="8">
                            <span style="color: white; font-size: 14px">循环漫游</span>
                        </el-col>
                        <el-col :span="12">
                            <el-radio-group v-model="loopRoam">
                                <el-radio :value="true">是</el-radio>
                                <el-radio :value="false">否</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 20px">
                        <el-col :span="8">
                            <el-button :ghost="true" @click="drawLine"><span>画线</span></el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button :ghost="true" @click="saveData"><span>保存</span></el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button :ghost="true" @click="cancel"><span>取消</span></el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane name="2" label="列表">
                    <div v-if="listData.length == 0" style="text-align: center">暂无数据</div>
                    <div v-else class="list-container" style="">
                        <div class="list-item" style="" v-for="(item, index) in listData" :key="index">
                            <div class="item-info">
                                {{ item.name }}
                            </div>
                            <div class="item-operate">
                                <el-icon
                                    v-if="!item.isPlay"
                                    type="play-circle"
                                    title="开始漫游"
                                    theme="twoTone"
                                    @click="startPlay(item)"
                                />
                                <el-icon
                                    v-if="item.isPlay"
                                    type="pause-circle"
                                    title="停止漫游"
                                    theme="twoTone"
                                    @click="stopPlay(item)"
                                />
                                <el-icon type="delete" theme="twoTone" title="删除" @click="delItem(index)" />
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import GlobeView from '../util/GlobeView'
import CesiumRoamUtil from '../util/CesiumRoam'
import CesiumDrawUtil from '../util/CesiumDraw'
import CesiumToolUtil from '../util/CesiumTool'
import { ElMessage as message } from 'element-plus'

export default {
    name: 'CesiumRoam',
    data() {
        return {
            currentPlayItem: null,
            name: '',
            speed: 20,
            fx: 120,
            fz: 80,
            showLine: false,
            loopRoam: true,
            lineData: [],
            listData: [] //轨迹数据列表
        }
    },
    components: {},

    computed: {},

    activated() {
        //组件显示执行操作
        console.log('actived')
        //获取 viewer对象
        // console.log(GlobeView.Map3DViewer)
        this.draw = new CesiumDrawUtil()
    },
    deactivated() {
        //组件隐藏执行操作
        console.log('deactived')
        this.draw.deactive()
        this.draw = null
        if (this.currentRoamUtil) {
            this.currentRoamUtil.remove()
            this.currentPlayItem.isPlay = false
            this.currentRoamUtil = null
        }
    },

    mounted() {
        //获取地图对象
    },

    methods: {
        close() {
            this.$emit('close')
        },
        drawLine() {
            this.draw.active(GlobeView.Map3DViewer, 'Line')
        },
        saveData() {
            if (this.name == '') {
                message.warn('请输入路线名称')
                return
            }
            const positions = this.draw.getPositions()
            if (positions && positions.length == 0) {
                message.warn('请先绘制漫游路线')
                return
            }
            const lineData = CesiumToolUtil.getLngLatHeights(GlobeView.Map3DViewer, positions)
            this.lineData = lineData
            const item = {
                lineData: this.lineData,
                fx: this.fx,
                fz: this.fz,
                name: this.name,
                loopRoam: this.loopRoam,
                showLine: this.showLine,
                speed: this.speed,
                isPlay: false
            }
            this.listData.push(item)
            this.initPanelData()
        },
        //重置面板
        initPanelData() {
            this.name = ''
            this.fx = 120
            this.fz = 80
            this.loopRoam = true
            this.showLine = false
            this.lineData = []
            this.speed = 20
        },
        cancel() {
            this.initPanelData()
            this.draw.deactive()
        },
        startPlay(item) {
            if (this.currentRoamUtil) {
                this.currentRoamUtil.remove()
                this.currentPlayItem.isPlay = false
            }
            const { lineData, fx, fz, loopRoam, showLine, speed } = item
            const roamUtil = new CesiumRoamUtil({
                lineData,
                speed,
                fx,
                fz,
                showLine,
                loop: loopRoam
            })
            roamUtil.play(GlobeView.Map3DViewer)
            item.isPlay = true

            this.currentRoamUtil = roamUtil
            this.currentPlayItem = item
        },
        stopPlay(item) {
            if (this.currentRoamUtil) {
                this.currentRoamUtil.remove()
                item.isPlay = false
            }
        },
        delItem(index) {
            if (this.currentRoamUtil) {
                this.currentRoamUtil.remove()
            }
            this.listData.splice(index, 1)
            this.isPlay = false
        },
        onchange(key) {
            if (key == 1) {
                //新增
                if (this.currentRoamUtil) {
                    this.currentRoamUtil.remove()
                    this.currentPlayItem.isPlay = false
                }
            } else {
                this.draw.clearAll()
                this.initPanelData()
            }
        }
    }
}
</script>

<style scoped lang="scss">
.cesium-roam-view-container {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    height: 450px !important;
    width: 350px;
    background: rgba(0, 0, 0, 0.575);
    border-radius: 16px;
    box-shadow: 0 4px 1px rgba(0, 0, 0, 0.5);
    .top-header {
        width: 100%;
        height: 46px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 15px;
        color: #fff;
        border-bottom: 1px #fff solid;
        .title-text {
            font-size: 16px;
            font-weight: 400;
            color: #fff;
        }
        .title-close {
            cursor: pointer;
            .icon {
                fill: #fff !important;
                width: 20px;
                height: 20px;
            }
        }
        .title-close:hover {
            .icon {
                fill: #00fcf9 !important;
                width: 20px;
                height: 20px;
            }
        }
    }
    .body-content {
        margin-top: 10px;
        padding: 3px 15px;

        .list-container {
            overflow: auto;
            border: 1px solid #4674d6;
            padding-bottom: 2px;
            max-height: 300px;
            .list-item {
                border-bottom: 1px solid #4674d6;
                margin-top: 2px;
                min-height: 30px;
                display: flex;
                justify-content: space-between;
                .item-info {
                    color: #ffffff;
                    min-width: 244px;
                    padding: 5px;
                    border-right: 1px solid #4674d6;
                }
            }
            .list-item:last-child {
                border-bottom: unset;
            }
            .item-operate {
                display: flex;
                justify-content: space-around;
                align-items: center;
                text-align: center;
                font-size: 18px;
                width: 100%;
                cursor: pointer;
            }
        }

        ::v-deep .el-tabs__item {
            color: #fff !important;
        }
    }
}
</style>
