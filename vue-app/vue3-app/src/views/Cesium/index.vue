<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/1/11 17:05
 * @Description: index
-->
<template>
    <div class="page cesium">
        <div id="cesiumContainer"></div>
    </div>
</template>

<script lang="ts" setup>
import * as Cesium from 'cesium'
import 'cesium/Source/Widgets/widgets.css'
import { onMounted, reactive } from 'vue'
import { log } from '@/utils'
import Roaming from './Roaming'

// 内置素材位置
window.CESIUM_BASE_URL = import.meta.env.BASE_URL

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
        destination: Cesium.Cartesian3.fromDegrees(97.867, 32.643, 16302888.003),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0.0
        }
    })
}

const initConfig = (mapViewer: any) => {
    /**
     * 初始位置配置
     */
    const mapConfig: any = {
        menuCode: 'oneMapSystem',
        mapService:
            '{\r\n"bmap":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYzEyM2VkYi0zMTIwLTQ5NmYtYmE5Yi03YjE0MjFjNDhmYjkiLCJpZCI6NDA1NTEsImlhdCI6MTYwODg2MDU1MX0.86tbbaTBcG_6LCq8AGN73r0mzBzJna75nbH_rlfXrk",\r\n  "tiles":[\r\n          {\r\n            "name": "倾斜摄影",\r\n            "type": "OsgbModelLayer",\r\n            "url": "http://60.12.8.237:10082/shx3dtile/tileset.json",\r\n            "terrain":{\r\n"url":"http://60.12.8.237:10082/sd/"\r\n},\r\n            "height": -15     \r\n           }\r\n    ]\r\n}',
        initLongitude: 120.20426405625159,
        initLatitude: 30.207311914242,
        initCameraHeight: 2690,
        yawAngle: 0,
        pitchingAngle: -28,
        rollingAngle: 0,
        maxCameraHeight: 500000,
        minCameraHeight: 100,
        twoInitLongitude: 120.20426405625159,
        twoInitLatitude: 30.207311914242,
        twoInitCameraHeight: 8000,
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
    viewer.entities.removeAll()

    function trackView() {
        //Set bounds of our simulation time
        var start = Cesium.JulianDate.fromDate(new Date())
        var stop = Cesium.JulianDate.addSeconds(start, myPositions.length - 1, new Cesium.JulianDate())

        //Make sure viewer is at the desired time.
        viewer.clock.startTime = start.clone()
        viewer.clock.stopTime = stop.clone()
        viewer.clock.currentTime = start.clone()
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP //Loop at the end
        viewer.clock.multiplier = 0.3

        // Set timeline to simulation bounds
        // viewer.timeline.zoomTo(start, stop)

        //Generate a random circular pattern with varying heights.
        function computeCirclularFlight() {
            var property = new Cesium.SampledPositionProperty()
            //设置插入选项
            property.setInterpolationOptions({
                // interpolationDegree: 1,
                // interpolationAlgorithm: Cesium.LinearApproximation,

                // interpolationDegree: 5,
                // interpolationAlgorithm:
                //   Cesium.LagrangePolynomialApproximation,

                interpolationDegree: 2,
                interpolationAlgorithm: Cesium.HermitePolynomialApproximation
            })
            for (var i = 0; i < myPositions.length; i++) {
                var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate())
                var position = Cesium.Cartesian3.fromDegrees(myPositions[i][0], myPositions[i][1], 5)
                property.addSample(time, position)
            }
            return property
        }

        var position = computeCirclularFlight()

        //Actually create the entity
        var entity = viewer.entities.add({
            //Set the entity availability to the same interval as the simulation time.
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start: start,
                    stop: stop
                })
            ]),
            //Use our computed positions
            position: position,
            //Automatically compute orientation based on position movement.
            orientation: new Cesium.VelocityOrientationProperty(position),
            model: {
                uri: url,
                minimumPixelSize: 64
            },
            //Show the path as a pink line sampled in 1 second increments.
            path: {
                resolution: 1,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.GREEN
                }),
                width: 16
            }
        })
        viewer.trackedEntity = entity

        //视角变换
        var matrix3Scratch = new Cesium.Matrix3()
        function getModelMatrix(entity, time, result) {
            var position = Cesium.Property.getValueOrUndefined(entity.position, time, new Cesium.Cartesian3())
            if (!Cesium.defined(position)) {
                return undefined
            }
            var orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, new Cesium.Quaternion())
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
        var scratch = new Cesium.Matrix4()
        var renderListener = function () {
            //viewer.camera.positionCartographic.height = 2000 + $this.limitCamera(f_property);
            if (viewer.trackedEntity) {
                getModelMatrix(viewer.trackedEntity, viewer.clock.currentTime, scratch)

                var transformX = 90 //距离运动点的距离（后方）
                var transformZ = 55 //距离运动点的高度（上方）
                var transformY = 0 //距离运动点的高度（侧方）
                viewer.scene.camera.lookAtTransform(scratch, new Cesium.Cartesian3(-transformX, transformY, transformZ))
            }
        }
        viewer.scene.preRender.addEventListener(renderListener)
    }

    viewer.clock.shouldAnimate = true
    trackView()
}

/**
 * 加载模型数据
 * @param mapViewer
 */
const loadModelData = (mapViewer: any) => {
    const realPosition: any[] = [
        [120.20426405625159, 30.207311914242],
        [120.21189283368301, 30.21141227255876],
        [120.22212655950352, 30.217080133595417],
        [120.224638474024, 30.218286019348653],
        [120.22654566838213, 30.218848760974993],
        [120.22719690547945, 30.21880856525125],
        [120.22752252402813, 30.21860758638624],
        [120.22784814257676, 30.218406607111163],
        [120.228452862739, 30.21788405907337],
        [120.22896454903014, 30.21736150825984],
        [120.22933668451509, 30.216678168392804],
        [120.22956926919244, 30.21619580798162],
        [120.22998792161235, 30.21531147441867],
        [120.23012747241859, 30.214467330420632],
        [120.23026702322608, 30.213944761458833],
        [120.23036005709724, 30.213301595849344],
        [120.23026702322608, 30.197341702946375],
        [120.22994140467739, 30.19718088481204],
        [120.22947623532127, 30.19718088481204],
        [120.228452862739, 30.19718088481204],
        [120.22738297322189, 30.197261293911765],
        [120.22598746515484, 30.197341702946375],
        [120.22515016031514, 30.197381907439052],
        [120.22454544015278, 30.197502520818574],
        [120.22389420305558, 30.197502520818574],
        [120.22347555063567, 30.197462316375194],
        [120.21514901917072, 30.197221089369805],
        [120.2140791296535, 30.197140680237226],
        [120.21338137562003, 30.19710047564608],
        [120.21277665545773, 30.196899452443887],
        [120.21184631674669, 30.196658224060016],
        [120.21119507964949, 30.196457199954878],
        [120.21040429174468, 30.196135560533435],
        [120.20919485142008, 30.195813920061298],
        [120.20826451270909, 30.195452073273657],
        [120.20761327561178, 30.195251046706446],
        [120.20677597077207, 30.19505001972827],
        [120.20635731835222, 30.194929403344915],
        [120.20603169980222, 30.194848992340198],
        [120.20607821673855, 30.195251046706446],
        [120.20556653044741, 30.204296835896486],
        [120.20538046270497, 30.20473905316716],
        [120.20463619173648, 30.206467701615765],
        [120.20421753931663, 30.207352114662683]
    ]

    const longitude = 120.20426405625159
    const latitude = 30.207311914242
    // 小车模型
    const modelCarUrl = `${import.meta.env.BASE_URL}model/car.gltf`
    const position = Cesium.Cartesian3.fromDegrees(longitude, latitude)
    const heading = Cesium.Math.toRadians(135)
    const pitch = 0
    const roll = 0
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

    createModel(mapViewer, modelCarUrl, realPosition, orientation, 'car')
    log.success('模型加载成功')
}

// 页面加载
onMounted(() => {
    // cesium accessToken
    const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMTAyZTY1Ni01ZGY4LTRhOTQtYTNkMS1hMmU1NjBhOGExN2QiLCJpZCI6MTE0MzYxLCJpYXQiOjE2NzM0ODkyOTF9.2Bt_4sefdPqtuYMJTgx5HWlglWkDQXaoyKawX6rvYv8'
    // eslint-disable-next-line no-undef
    // Initialize the viewer with Cesium World Terrain.
    Cesium.Ion.defaultAccessToken = accessToken
    const mapViewer = new Cesium.Viewer('cesiumContainer', {
        ...mapOptions
    })

    mapViewer._cesiumWidget._creditContainer.style.display = 'none' // 去除cesium标识
    mapViewer.scene.globe.depthTestAgainstTerrain = true // 开启地形检测
    mapViewer.resolutionScale = window.devicePixelRatio // 开启抗锯齿-1
    mapViewer.scene.fxaa = true // 开启抗锯齿-2
    mapViewer.scene.postProcessStages.fxaa.enabled = true // 开启抗锯齿-3

    loadBaseLayer(mapViewer)
    initConfig(mapViewer)
    loadModelData(mapViewer)
    //
    // const modelCarUrl = `${import.meta.env.BASE_URL}model/car.gltf`
    // const options = {
    //     data: [
    //         [119.030216, 33.59167, 50.9],
    //         [119.032637, 33.590768, 50.8],
    //         [119.033624, 33.592647, 53.4],
    //         [119.033814, 33.59293, 53.3],
    //         [119.033013, 33.593351, 53.1],
    //         [119.032066, 33.593706, 52.9],
    //         [119.031406, 33.593802, 53]
    //     ],
    //     view: { pitch: '', range: '' }, // 默认不传
    //     model: {
    //         url: modelCarUrl // 和cesium中model的配置一致
    //     },
    //     isPathShow: true, // 漫游路径是否显示
    //     speed: '', // 默认可不传
    //     time: 500 // 此次漫游所需要的总时间，单位：秒
    // }
    // new Roaming(mapViewer, {
    //     ...options
    // }).init({ ...options })
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
