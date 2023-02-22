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
        <!--热力图容器-->
        <div
            id="heatMap"
            style="width: 100%; height: 100%; opacity: 0; visibility: hidden; position: absolute; z-index: -1"
        ></div>
        <canvas
            id="canvas-a"
            class="canvas"
            width="700"
            height="100"
            style="position: absolute; left: 0; top: 0"
        ></canvas>
        <canvas
            id="canvas-b"
            class="canvas"
            width="700"
            height="100"
            style="position: absolute; left: 0; top: 0"
        ></canvas>
        <tool-bar @onClick="handleClick" />
    </div>
</template>

<script lang="ts" setup>
import * as Cesium from 'cesium'
import Heatmap from 'heatmap.js'
import 'cesium/Source/Widgets/widgets.css'
import { onMounted, reactive } from 'vue'
import { ElMessage as message } from 'element-plus'
import { log } from '@/libs/utils'
import CesiumRoam from './components/CesiumRoam.vue'
import ToolBar from './components/ToolBar.vue'
import GlobeView from '@/views/Cesium/util/GlobeView'
import { position } from '@/views/Cesium/data'

let mapViewer: any = null
let czmlInterval: any = null

// 内置素材位置
window.CESIUM_BASE_URL = import.meta.env.BASE_URL

const realPosition: any[] = reactive(position)

// 地图默认参数
const mapOptions = reactive({
    homeButton: false, // 是否显示主页按钮
    sceneModePicker: false, // 是否显示场景按钮
    baseLayerPicker: false, // 是否显示图层选择控件
    navigationHelpButton: false, // 导航帮助按钮
    selectionIndicator: false, // 鼠标选择指示器
    infoBox: true, // 信息提示框
    animation: true, // 是否创建动画小器件，左下角仪表
    timeline: true, // 是否显示时间线控件
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
    mapViewer.scene.fxaa = true // 开启抗锯齿-2
    mapViewer.scene.postProcessStages.fxaa.enabled = true // 开启抗锯齿-3

    // 实体集变化监听
    function onChanged(collection: any, added: string | any[], removed: any, changed: any) {
        let msg = 'Added ids'
        for (let i = 0; i < added.length; i++) {
            msg += '\n' + added[i].id
        }
        console.log(msg)
    }
    mapViewer.entities.collectionChanged.addEventListener(onChanged)
    loadBaseLayer(mapViewer)
    initConfig(mapViewer)
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
        yawAngle: 10, // Z轴
        pitchingAngle: -28, // Y轴
        rollingAngle: 0, // X轴
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
        duration: 2, // 设置飞行持续时间，默认会根据距离来计算
        complete: () => {
            // 到达位置后的回调
            mapViewer.scene.screenSpaceCameraController.minimumZoomDistance = mapConfig.minCameraHeight || 50 // 限制相机高度
            mapViewer.scene.screenSpaceCameraController.maximumZoomDistance = mapConfig.maxCameraHeight || 50000 // 限制相机高度

            drawTileset()
        }
    })
    log.success(`地图初始化成功，当前经纬度：${mapConfig.initLongitude},${mapConfig.initLatitude}`)
}

// 点击工具栏
const handleClick = (type: string | number) => {
    // 清空数据
    mapViewer.entities.removeAll()
    mapViewer.scene.primitives.removeAll()
    czmlInterval && clearInterval(czmlInterval)
    czmlInterval = null

    switch (type) {
        case 'roaming': {
            drawRoaming()
            break
        }
        case 'shape': {
            drawShape()
            break
        }
        case 'dynamicImage': {
            dynamicImage()
            break
        }
        case 'tileset': {
            drawTileset()
            break
        }
        case 'czml': {
            drawCzml()
            break
        }
        case 'heatmap': {
            drawHeatMap()
            break
        }
        case 'drawPrimitiveAndEntity': {
            drawPrimitiveAndEntity()
            break
        }
    }
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
        // 创建一个代表当前系统时间的新实例。这等效于调用 JulianDate.fromDate（new Date（））; 。
        const start = Cesium.JulianDate.now()
        // 结束时间
        const stop = Cesium.JulianDate.addSeconds(start, myPositions.length - 1, new Cesium.JulianDate())

        //Make sure viewer is at the desired time.
        viewer.clock.startTime = start.clone()
        viewer.clock.stopTime = stop.clone()
        viewer.clock.currentTime = start.clone()
        // 动画模式【LOOP_STOP:自动循环播放|CLAMPED:到达终止时间后停止】
        viewer.clock.clockRange = Cesium.ClockRange.CLAMPED
        // 模仿速度
        viewer.clock.multiplier = 0.85

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
        //
        // viewer.clock.onTick.addEventListener(function (clock) {
        //     // This example uses time offsets from the start to identify which parts need loading.
        //     Cesium.JulianDate.secondsDifference(clock.currentTime, clock.startTime)
        // })
    }

    viewer.clock.shouldAnimate = true
    trackView()
}

/**
 * 加载模型数据
 */
const drawRoaming = () => {
    const longitude = realPosition[0][0]
    const latitude = realPosition[0][1]
    // 小车模型
    const modelCarUrl = `${import.meta.env.BASE_URL}model/fpiCar.gltf`
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

    // 1、entities加载
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

    // 2、czml加载/JSON字符串
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

    // 3、修改颜色材质
    greenWall.wall.material = Cesium.Color.BLUE.withAlpha(0.5)
    greenWall.wall.material = new Cesium.CheckerboardMaterialProperty({
        evenColor: Cesium.Color.WHITE,
        oddColor: Cesium.Color.BLACK,
        repeat: new Cesium.Cartesian2(4, 4)
    })

    // 适配居中
    mapViewer.zoomTo(greenWall)
}

// 绘制瓦片图
const drawTileset = () => {
    const tileset = new Cesium.Cesium3DTileset({
        url: 'http://60.12.8.237:10082/shx3dtile/tileset.json',
        maximumScreenSpaceError: 16, // 最大的屏幕空间误差
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
            mapViewer.scene.primitives.add(res)
            mapViewer.zoomTo(res)
        })
        .catch(function (error) {
            console.log(error)
        })
}

// CZML路径动态改变
const drawCzml = () => {
    // czml文件
    const czml: any = [
        {
            id: 'document',
            name: 'CZML Path',
            version: '1.0',
            clock: {
                interval: '2012-08-04T10:00:00Z/2012-08-04T15:00:00Z',
                currentTime: '2012-08-04T10:00:00Z',
                multiplier: 10
            }
        },
        {
            id: 'path',
            name: 'path with GPS flight data',
            description:
                '<p>Hang gliding flight log data from Daniel H. Friedman.<br>Icon created by Larisa Skosyrska from the Noun Project</p>',
            availability: '2012-08-04T10:00:00Z/2012-08-04T15:00:00Z',
            path: {
                material: {
                    polylineOutline: {
                        color: {
                            rgba: [255, 0, 255, 255]
                        },
                        outlineColor: {
                            rgba: [0, 255, 255, 255]
                        },
                        outlineWidth: 5
                    }
                },
                width: 8,
                leadTime: 10,
                trailTime: 1000,
                resolution: 5
            },
            billboard: {
                image: 'data:image/png;base64,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',
                scale: 1.5,
                eyeOffset: {
                    cartesian: [0.0, 0.0, -10.0]
                }
            },
            position: {
                epoch: '2012-08-04T10:00:00Z',
                cartographicDegrees: [
                    0.0, 118.87841653400005, 30.95679870500004, 0.0, 10.0, 118.87826541800007, 30.95680770900003, 0.0,
                    20.0, 118.8774481050001, 30.956860625000047, 0.0, 30.0, 118.87660414600009, 30.956910105000077, 0.0,
                    40.0, 118.8759846580001, 30.95694296000005, 0.0, 50.0, 118.87542502500003, 30.956978761000073, 0.0,
                    60.0, 118.87473380100005, 30.957024103000037, 0.0
                ]
            }
        }
    ]

    var dataSourcePromise
    var i = 30.957024
    var a = 410
    czmlInterval = setInterval(function () {
        i += Math.random() * 0.01 * 10
        a += 10
        console.log(i)
        // 路径最后添加节点
        czml[1].position.cartographicDegrees.push(a, 118.8747338, i, 0)
        // 修改当前时间
        czml[0].clock.currentTime = mapViewer.clock.currentTime.toString()
        // 清空数据
        mapViewer.entities.removeAll()
        // 重新加载CZML到地图
        mapViewer.dataSources.add(Cesium.CzmlDataSource.load(czml)).then((data: any) => {
            mapViewer.trackedEntity = data.entities.getById('path')
        })
    }, 2000)

    // 加载CZML
    dataSourcePromise = Cesium.CzmlDataSource.load(czml)
    // 添加CZML到地图
    mapViewer.dataSources.add(dataSourcePromise)
    mapViewer.zoomTo(dataSourcePromise)
}

// 绘制热力图
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const drawHeatMap = () => {
    let points = []
    let width = 600
    let height = 400
    let max = 100

    // 热力图经纬度范围
    let latMin = 28.364807
    let latMax = 40.251095
    let lonMin = 94.389228
    let lonMax = 108.666357
    // 根据热力图图片范围，生成随机热力点和强度值
    for (let i = 0; i < 300; i++) {
        let lon = lonMin + Math.random() * (lonMax - lonMin)
        let lat = latMin + Math.random() * (latMax - latMin)
        let value = Math.floor(Math.random() * max)
        let point = {
            x: Math.floor(((lat - latMin) / (latMax - latMin)) * width),
            y: Math.floor(((lon - lonMin) / (lonMax - lonMin)) * height),
            value: value
        }
        points.push(point)
    }
    // 创建热力图
    const heatmap = Heatmap.create({
        container: document.getElementById('heatMap'),
        // backgroundColor: 'red',
        radius: 20,
        maxOpacity: 0.9,
        minOpacity: 0.7
    })

    const data = {
        max: max,
        data: points
    }
    heatmap.setData(data)

    // 将热力图添加到球体上(生成的热力图canvas元素类名为heatmap-canvas)
    const canvas = document.getElementsByClassName('heatmap-canvas')

    console.log(canvas)

    mapViewer.entities.add({
        name: 'heatmap',
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(lonMin, latMin, lonMax, latMax),
            material: new Cesium.ImageMaterialProperty({
                image: canvas[0]
            })
        }
    })

    mapViewer.zoomTo(mapViewer.entities)
}

// Primitive和Entity
const drawPrimitiveAndEntity = () => {
    function computeCircle(radius: number) {
        var positions = []
        for (var i = 0; i < 360; i++) {
            var radians = Cesium.Math.toRadians(i)
            positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)))
        }
        return positions
    }
    //使用entity
    function createEntity(line: number[]) {
        console.log(line)
        mapViewer.entities.add({
            polylineVolume: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(line),
                shape: [
                    new Cesium.Cartesian2(-50000, -50000),
                    new Cesium.Cartesian2(50000, -50000),
                    new Cesium.Cartesian2(50000, 50000),
                    new Cesium.Cartesian2(-50000, 50000)
                ],
                cornerType: Cesium.CornerType.BEVELED,
                material: Cesium.Color.GREEN.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK
            }
        })
    }

    //使用Primitive
    function createGeometry(line: number[]) {
        return new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineVolumeGeometry({
                polylinePositions: Cesium.Cartesian3.fromDegreesArrayHeights(line),
                shapePositions: computeCircle(40000.0)
            }),
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED.withAlpha(0.5))
            }
        })
    }
    function createPrimitive(linesInstances: any) {
        var primitive = mapViewer.scene.primitives.add(
            new Cesium.Primitive({
                geometryInstances: linesInstances,
                appearance: new Cesium.PerInstanceColorAppearance({
                    // flat : true,
                    translucent: false,
                    closed: true
                })
            })
        )
    }
    const lines = [[-90.0, 32.0, 0.0, -90.0, 36.0, 100000.0, -94.0, 36.0, 0.0]]
    // 使用entity
    for (let i = 0; i < lines.length; i++) {
        createEntity(lines[i])
    }

    //使用Primitive,只需要构建一个 geometry的数组，再创建Primitive
    const linesInstances = []
    for (let i = 0; i < lines.length; i++) {
        linesInstances.push(createGeometry(lines[i]))
    }
    createPrimitive(linesInstances)
    mapViewer.zoomTo(mapViewer.entities)
}

let rotation = Cesium.Math.toRadians(30)

const getRotation = () => {
    return (rotation += 0.005)
}

let i = 0

function drawCanvasImage(time, result) {
    let canvas: any = document.getElementById('canvas-a')
    let cwidth = 700
    let cheight = 100
    let ctx: any = canvas.getContext('2d')
    let img = new Image()
    img.src = 'arrow.png'
    img.onload = function () {
        if (i <= cwidth) {
            ctx.clearRect(0, 0, cwidth, cheight)
            ctx.drawImage(img, i, 0)
        } else i = 0
        i += 3
    }
    return canvas?.toDataURL()
}

// 图片动态旋转
const dynamicImage = () => {
    mapViewer.entities.add({
        name: 'dynamicImage',
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(-90.0, 30.0, -70.0, 35.0),
            material: new Cesium.ImageMaterialProperty({
                image: new Cesium.CallbackProperty(drawCanvasImage, false),
                transparent: true
            })
        }
    })
    mapViewer.zoomTo(mapViewer.entities)
}
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
    height: 1041px;
    #cesiumContainer {
        width: 100%;
        height: 100%;
    }
    .canvas {
        position: absolute;
        display: none;
    }
}
</style>
