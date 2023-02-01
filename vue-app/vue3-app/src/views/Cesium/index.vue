<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/1/11 17:05
 * @Description: index
-->
<template>
    <div class="page cesium">
        <div id="cesiumContainer"></div>
        <cesium-roam />
        <tool-bar @onClick="handleClick" />
    </div>
</template>

<script lang="ts" setup>
import * as Cesium from 'cesium'
import 'cesium/Source/Widgets/widgets.css'
import { onMounted, reactive } from 'vue'
import { log } from '@/utils'
import CesiumRoam from './components/CesiumRoam.vue'
import ToolBar from './components/ToolBar.vue'
import GlobeView from '@/views/Cesium/util/GlobeView'

let mapViewer: any = null

// 内置素材位置
window.CESIUM_BASE_URL = import.meta.env.BASE_URL

const realPosition: any[] = reactive([
    [118.19440855, 36.78027499, 100],
    [118.1959458, 36.77988333, 100],
    [118.19524581, 36.77988334, 100],
    [118.19594582, 36.77988335, 100],
    [118.19654583, 36.77988336, 100],
    [118.19654584, 36.78988337, 100]
])

// 地图默认参数
const mapOptions = reactive({
    homeButton: false, // 是否显示主页按钮
    sceneModePicker: false, // 是否显示场景按钮
    baseLayerPicker: false, // 是否显示图层选择控件
    navigationHelpButton: false, // 导航帮助按钮
    selectionIndicator: false, // 鼠标选择指示器
    infoBox: false, // 信息提示框
    animation: false, // 是否创建动画小器件，左下角仪表
    timeline: false, // 是否显示时间线控件
    geocoder: false, // 是否显示地名查找控件
    fullscreenButton: true, // 是否全屏按钮
    shouldAnimate: true,
    polygonIds: [], // 风险面的Id
    contextOptions: {
        webgl: {
            alpha: true,
            depth: true,
            stencil: true,
            antialias: true,
            premultipliedAlpha: true,
            // 通过canvas.toDataURL()实现截图需要将该项设置为true
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: true
        }
    },
    scene3DOnly: true, // 设置为true, 则所有几何图形以3D模式绘制以节约GPU资源
    // showRenderLoopErrors: false, // 如果为true, 则在发送渲染循环错误时，此小部件将自动向包含错误的用户显示HTML面板
    sceneMode: Cesium.SceneMode.SCENE3D // 初始场景模式
    // terrainShadows: Cesium.createWorldTerrain() // 确定地形是投射还是接收来自光源的阴影
})

// 图层初始化
const loadBaseLayer = (mapViewer: any) => {
    // 设置太阳光
    mapViewer.scene.globe.enableLighting = true

    const billboardCollection = mapViewer.scene.primitives.add(new Cesium.BillboardCollection())
    const labelCollection = mapViewer.scene.primitives.add(new Cesium.LabelCollection())
    // 定位至中国范围
    mapViewer.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(97.867, 32.643, 359),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0.0
        }
    })
}

// 移动至配置经纬度
const initConfig = (mapViewer: any) => {
    /**
     * 初始位置配置
     */
    const mapConfig: any = {
        menuCode: 'oneMapSystem',
        mapService:
            '{\r\n"bmap":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYzEyM2VkYi0zMTIwLTQ5NmYtYmE5Yi03YjE0MjFjNDhmYjkiLCJpZCI6NDA1NTEsImlhdCI6MTYwODg2MDU1MX0.86tbbaTBcG_6LCq8AGN73r0mzBzJna75nbH_rlfXrk",\r\n  "tiles":[\r\n          {\r\n            "name": "倾斜摄影",\r\n            "type": "OsgbModelLayer",\r\n            "url": "http://60.12.8.237:10082/shx3dtile/tileset.json",\r\n            "terrain":{\r\n"url":"http://60.12.8.237:10082/sd/"\r\n},\r\n            "height": -15     \r\n           }\r\n    ]\r\n}',
        initLongitude: realPosition[0][0],
        initLatitude: realPosition[0][1],
        initCameraHeight: 2690,
        yawAngle: 10,
        pitchingAngle: -28,
        rollingAngle: 0,
        maxCameraHeight: 500000,
        minCameraHeight: 100,
        id: 4
    }

    // 移动至配置经纬度
    mapViewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            mapConfig.initLongitude,
            mapConfig.initLatitude,
            mapConfig.initCameraHeight
        ),
        orientation: {
            heading: Cesium.Math.toRadians(mapConfig.yawAngle),
            pitch: Cesium.Math.toRadians(mapConfig.pitchingAngle),
            roll: Cesium.Math.toRadians(mapConfig.rollingAngle)
        },
        duration: 2,
        complete: () => {
            mapViewer.scene.screenSpaceCameraController.minimumZoomDistance = mapConfig.minCameraHeight || 50 // 限制相机高度
            mapViewer.scene.screenSpaceCameraController.maximumZoomDistance = mapConfig.maxCameraHeight || 500000 // 限制相机高度
        }
    })
    log.success(`地图初始化成功，当前经纬度：${mapConfig.initLongitude},${mapConfig.initLatitude}`)
}

/**
 * 创建模型/添加实体方式添加模型
 * @param viewer
 * @param url
 * @param myPositions
 * @param orientation
 * @param modelName
 */
const createModel = (viewer: any, url: string, myPositions: any, orientation: any, modelName: string) => {
    // 移除所有图形
    // mapViewer.entities.removeAll()
    // mapViewer.dataSources.removeAll()

    function trackView() {
        // 开始时间
        const start = Cesium.JulianDate.fromDate(new Date())
        // 结束时间
        const stop = Cesium.JulianDate.addSeconds(start, myPositions.length - 1, new Cesium.JulianDate())

        //Make sure viewer is at the desired time.
        viewer.clock.startTime = start.clone()
        viewer.clock.stopTime = stop.clone()
        viewer.clock.currentTime = start.clone()
        // 动画模式【LOOP_STOP:自动循环播放|CLAMPED:到达终止时间后停止】
        viewer.clock.clockRange = Cesium.ClockRange.CLAMPED
        // 模仿速度
        viewer.clock.multiplier = 0.3

        // 根据坐标数组，计算插值点数据
        function computeCirclularFlight() {
            const property = new Cesium.SampledPositionProperty()
            // 设置插入选项
            property.setInterpolationOptions({
                interpolationDegree: 2,
                interpolationAlgorithm: Cesium.HermitePolynomialApproximation
            })
            for (let i = 0; i < myPositions.length; i++) {
                const time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate())
                const position = Cesium.Cartesian3.fromDegrees(myPositions[i][0], myPositions[i][1], myPositions[i][2])
                property.addSample(time, position)
            }
            return property
        }

        const position = computeCirclularFlight()

        // 创建运动的物体，并将物体设置为镜头追踪的对象
        const vehicleEntity = viewer.entities.add({
            //Set the entity availability to the same interval as the simulation time.
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start: start,
                    stop: stop
                })
            ]),
            // Use our computed positions
            position: position,
            //Automatically compute orientation based on position movement.
            orientation: new Cesium.VelocityOrientationProperty(position),
            model: {
                uri: url,
                minimumPixelSize: 64
            },
            // Show the path as a pink line sampled in 1 second increments.
            path: {
                resolution: 1,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.GREEN
                }),
                width: 16
            }
        })
        // 追踪物体
        // Follow the vehicle with the camera.
        viewer.trackedEntity = vehicleEntity

        // 视角变换
        const matrix3Scratch = new Cesium.Matrix3()

        // 每一帧根据物体的坐标和走向，设置相机的角度
        function getModelMatrix(
            entity: { position: any; orientation: any },
            time: any,
            result: Cesium.Matrix4 | undefined
        ) {
            const position = Cesium.Property.getValueOrUndefined(entity.position, time, new Cesium.Cartesian3())
            if (!Cesium.defined(position)) {
                return undefined
            }
            const orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, new Cesium.Quaternion())
            if (!Cesium.defined(orientation)) {
                result = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, result)
            } else {
                result = Cesium.Matrix4.fromRotationTranslation(
                    Cesium.Matrix3.fromQuaternion(orientation, matrix3Scratch),
                    position,
                    result
                )
            }
            return result
        }
        const scratch = new Cesium.Matrix4()
        const renderListener = function () {
            if (viewer.trackedEntity) {
                getModelMatrix(viewer.trackedEntity, viewer.clock.currentTime, scratch)
                const transformX = 90 // 距离运动点的距离（后方）
                const transformZ = 55 // 距离运动点的高度（上方）
                const transformY = 0 // 距离运动点的高度（侧方）
                viewer.scene.camera.lookAtTransform(scratch, new Cesium.Cartesian3(-transformX, transformY, transformZ))
            }
        }
        // viewer.scene.preRender.addEventListener(renderListener)

        viewer.clock.onTick.addEventListener(function (clock) {
            // This example uses time offsets from the start to identify which parts need loading.
            Cesium.JulianDate.secondsDifference(clock.currentTime, clock.startTime)
        })
    }

    viewer.clock.shouldAnimate = true
    trackView()
}

/**
 * 加载模型数据
 */
const loadModelData = () => {
    const longitude = realPosition[0][0]
    const latitude = realPosition[0][1]
    // 小车模型
    const modelCarUrl = `${import.meta.env.BASE_URL}model/car.gltf`
    const position = Cesium.Cartesian3.fromDegrees(longitude, latitude)
    const heading = Cesium.Math.toRadians(10)
    const pitch = 0
    const roll = 0
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

    createModel(mapViewer, modelCarUrl, realPosition, orientation, 'car')
    log.success('模型加载成功')
}

/**
 * 绘制图形
 */
const drawShape = () => {
    // 移除所有图形
    mapViewer.entities.removeAll()
    mapViewer.dataSources.removeAll()

    // entities加载
    mapViewer.entities.add({
        name: 'Red box with black outline',
        position: Cesium.Cartesian3.fromDegrees(119.030216, 33.59167, 50.9),
        box: {
            // 一个 Cartesian3 属性，用于指定框的长度，宽度和高度。
            dimensions: new Cesium.Cartesian3(4000.0, 3000.0, 5000.0),
            // 一个属性，指定用于填充框的材料。
            material: Cesium.Color.RED.withAlpha(0.5),
            // 一个布尔型属性，指定是否对框进行概述。
            outline: true,
            // 一个属性，指定轮廓的 颜色。
            outlineColor: Cesium.Color.BLACK
        }
    })

    // czml加载/JSON字符串
    const czml = [
        {
            id: 'document',
            name: 'box',
            version: '1.0'
        },
        {
            id: 'shape2',
            name: 'Red box with black outline',
            position: {
                cartographicDegrees: [119.040216, 33.58167, 50.9]
            },
            box: {
                dimensions: {
                    cartesian: [4000.0, 3000.0, 5000.0]
                },
                material: {
                    solidColor: {
                        color: {
                            rgba: [255, 0, 0, 128]
                        }
                    }
                },
                outline: true,
                outlineColor: {
                    rgba: [0, 0, 0, 255]
                }
            }
        }
    ]
    const dataSourcePromise = Cesium.CzmlDataSource.load(czml)
    mapViewer.dataSources.add(dataSourcePromise)
    // mapViewer.zoomTo(dataSourcePromise)

    const greenWall = mapViewer.entities.add({
        name: 'Green wall from surface with outline',
        wall: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -107.0, 43.0, 100000.0, -97.0, 43.0, 100000.0, -97.0, 40.0, 100000.0, -107.0, 40.0, 100000.0, -107.0,
                43.0, 100000.0
            ]),
            material: Cesium.Color.GREEN,
            outline: true
        }
    })

    // 适配居中
    mapViewer.zoomTo(greenWall)
}

// drawTileset
const drawTileset = () => {
    const tileset = new Cesium.Cesium3DTileset({
        url: 'http://60.12.8.237:10082/shx3dtile/tileset.json',
        maximumScreenSpaceError: 16,
        skipLevelOfDetail: false,
        preferLeaves: false,
        dynamicScreenSpaceError: true,
        dynamicScreenSpaceErrorDensity: 0.00278,
        dynamicScreenSpaceErrorFactor: 4.0,
        dynamicScreenSpaceErrorHeightFalloff: 0.25
        // specularEnvironmentMaps: undefined,
        // sphericalHarmonicCoefficients: undefined,
        // lightColor: null, //着色模型时的浅色。当undefined现场的灯光颜色来代替。
    })

    tileset.readyPromise
        .then(function (res) {
            console.log(res)
            mapViewer.scene.primitives.add(res)
            mapViewer.zoomTo(res)
        })
        .catch(function (error) {
            console.log(error)
        })
}

// 点击工具栏
const handleClick = (type: string | number) => {
    switch (type) {
        case 'roaming': {
            loadModelData()
            break
        }
        case 'shape': {
            drawShape()
            break
        }
        case 'tileset': {
            drawTileset()
            break
        }
    }
}
// 页面加载
onMounted(() => {
    // cesium accessToken
    const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMTAyZTY1Ni01ZGY4LTRhOTQtYTNkMS1hMmU1NjBhOGExN2QiLCJpZCI6MTE0MzYxLCJpYXQiOjE2NzM0ODkyOTF9.2Bt_4sefdPqtuYMJTgx5HWlglWkDQXaoyKawX6rvYv8'
    // eslint-disable-next-line no-undef
    // Initialize the viewer with Cesium World Terrain.
    Cesium.Ion.defaultAccessToken = accessToken
    mapViewer = new Cesium.Viewer('cesiumContainer', {
        ...mapOptions
    })
    GlobeView.Map3DViewer = mapViewer
    mapViewer._cesiumWidget._creditContainer.style.display = 'none' // 去除cesium标识
    mapViewer.scene.globe.depthTestAgainstTerrain = true // 开启地形检测
    mapViewer.resolutionScale = window.devicePixelRatio // 开启抗锯齿-1
    mapViewer.scene.fxaa = true // 开启抗锯齿-2
    mapViewer.scene.postProcessStages.fxaa.enabled = true // 开启抗锯齿-3

    loadBaseLayer(mapViewer)
    initConfig(mapViewer)

    // /**
    //  * 图层 S
    //  */
    // // Remove default base layer
    // mapViewer.imageryLayers.remove(viewer.imageryLayers.get(0))
    //
    // // Add Sentinel-2 imagery
    // mapViewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3954 }))
    // /**
    //  * 图层 E
    //  */
    //
    // /**
    //  * 地形（Terrain）S
    //  */
    // // Load Cesium World Terrain
    // mapViewer.terrainProvider = Cesium.createWorldTerrain({
    //     requestWaterMask: true, // required for water effects/是否需要请求额外的水数据
    //     requestVertexNormals: true // required for terrain lighting/是否需要请求额外的光数据
    // })
    // // // Enable depth testing so things behind the terrain disappear.
    // mapViewer.scene.globe.depthTestAgainstTerrain = true
    // /**
    //  * 地形（Terrain）E
    //  */
    // const initialPosition: any = new Cesium.Cartesian3.fromDegrees(
    //     -73.998114468289017509,
    //     40.674512895646692812,
    //     2631.082799425431
    // )
    // const initialOrientation: any = new Cesium.HeadingPitchRoll.fromDegrees(
    //     7.1077496389876024807,
    //     -31.987223091598949054,
    //     0.025883251314954971306
    // )
    //
    // const homeCameraView: any = {
    //     destination: initialPosition,
    //     orientation: {
    //         heading: initialOrientation.heading,
    //         pitch: initialOrientation.pitch,
    //         roll: initialOrientation.roll
    //     }
    // }
    // // Set the initial view
    // mapViewer.scene.camera.setView(homeCameraView)
    // // Add some camera flight animation options
    // homeCameraView.duration = 2.0
    // homeCameraView.maximumHeight = 2000
    // homeCameraView.pitchAdjustHeight = 2000
    // homeCameraView.endTransform = Cesium.Matrix4.IDENTITY
    // // Override the default home button
    // mapViewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e: { cancel: boolean }) {
    //     e.cancel = true
    //     mapViewer.scene.camera.flyTo(homeCameraView)
    // })
})
</script>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'CesiumStart',
    title: '三维地图',
    inheritAttrs: false,
    customOptions: {}
}
</script>

<style scoped lang="scss">
.cesium {
    width: 100%;
    height: 100%;
    #cesiumContainer {
        width: 100%;
        height: 100%;
    }
}
</style>
