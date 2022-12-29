<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2022/12/11 15:42
 * @Description: index
-->
<template>
    <div id="map">
        <div id="container"></div>
        <div id="loading">加载中...</div>
    </div>
</template>

<script>
let map = null
export default {
    name: 'AmapDrop',
    title: '高德地图下钻',
    data() {
        return {}
    },
    mounted() {
        this.$nextTick(() => {
            this.init()
        })
    },
    destroyed() {
        map = null
    },
    methods: {
        init() {
            /**
             * 地图初始化
             */
            // eslint-disable-next-line no-undef
            map = new AMap.Map('container', {
                // zoomEnable:false, // 禁止缩放
                // dragEnable: false, // 禁止拖拽
                resizeEnable: false,
                center: [106.889724, 35.086912], // 地图中心点
                zoom: 4 // 地图显示的缩放级别
            })
            let $loading = document.getElementById('loading')

            // 尺量图集合
            let polygons = []
            // marker集合
            let markers = []
            let mapColors = ['#f04864', '#facc14', '#2fc25b', '#1890ff', '#8543e0']

            // 情况地图marker及尺量图
            function clearMap() {
                if (markers.length > 0) {
                    map.remove(markers)
                }
                if (polygons.length > 0) {
                    map.remove(polygons)
                }
                polygons = []
                markers = []
            }

            /**
             * 获取随机数
             */
            function getRandomNum(min, max) {
                return Math.floor(Math.random() * (max - min)) + min
            }

            /**
             * @desc 返回中心点的[经度，纬度]
             * @param points  points = [[经度，纬度], [经度，纬度]]; 参数数组points的每一项为每一个点的：[经度,纬度]
             * @returns {number[]} 返回中心点的数组[经度，纬度]
             */
            function getPointsCenter(points) {
                try {
                    let point_num = points.length // 坐标点个数
                    let X = 0,
                        Y = 0,
                        Z = 0
                    for (let i = 0; i < points.length; i++) {
                        if (points[i] == '') {
                            continue
                        }
                        let point = points[i]
                        let lat, lng, x, y, z
                        lng = (parseFloat(point[0]) * Math.PI) / 180
                        lat = (parseFloat(point[1]) * Math.PI) / 180
                        x = Math.cos(lat) * Math.cos(lng)
                        y = Math.cos(lat) * Math.sin(lng)
                        z = Math.sin(lat)
                        X += x
                        Y += y
                        Z += z
                    }
                    X = X / point_num
                    Y = Y / point_num
                    Z = Z / point_num

                    let tmp_lng = Math.atan2(Y, X)
                    let tmp_lat = Math.atan2(Z, Math.sqrt(X * X + Y * Y))

                    // 经纬度分别小数点后2位加随机数，防止Marker完全重叠
                    let x = getRandomNum(2, 12) * 0.01
                    let y = getRandomNum(3, 12) * 0.01
                    return [(tmp_lng * 180) / Math.PI + x, (tmp_lat * 180) / Math.PI + y]
                } catch (e) {
                    console.warn('获取中心坐标失败')
                    console.log(e)
                }
            }

            /**
             * 需要绘制的经纬度数据源
             */
            let areaPaths = {}

            /**
             * 构造多边形对象
             * @param path 多边形轮廓线的节点坐标数组
             * @param color
             */
            let addPolygon = function (path, color) {
                // 用于在地图上绘制线、面等矢量地图要素的类型
                // eslint-disable-next-line no-undef
                let polygon = new AMap.Polygon({
                    strokeWeight: 2, // 线条宽度，默认为 1
                    path: path, // 多边形轮廓线的节点坐标数组
                    fillOpacity: 0.4,
                    clickable: false,
                    fillColor: color, // 多边形填充颜色
                    strokeColor: color, // 线条颜色
                    lineJoin: 'round' // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
                })
                polygons.push(polygon)
            }

            /**
             * 自定义marker内容
             * @param item { name: '', count: '', center: []}
             * @returns {string}
             */
            let renderMarker = function (item) {
                const { name = '', count = 0, center = [], color = '#111' } = item

                // 创建纯文本标记
                // eslint-disable-next-line no-undef
                let marker = new AMap.Marker({
                    content: `<div class='area-map-marker' style='color: ${color}'>
                      <div class='area-map-marker__title' style='font-weight: bold;'>${name}</div>
                      <div class='area-map-marker__count'>${count || getRandomNum(100, 10000)}</div>
                      <div class='area-map-marker__title'>${item.children ? '我可以下钻' : ''}</div>
                    </div>`,
                    anchor: 'center', // 设置文本标记锚点
                    draggable: false,
                    cursor: 'pointer',
                    position: center,
                    extData: item,
                    zIndex: 1000
                })
                markers.push(marker)
                if (item.children) {
                    // 通过点击实现地图下钻
                    marker.on('mousedown', e => {
                        handleAreaClick(e)
                    })
                }
                marker.setMap(map)
            }

            // 点击marker，实现下钻
            let handleAreaClick = function (e) {
                const data = e.target.De.extData
                const { level, id } = data
                getUnderMap(id, level + 1)
            }

            /**
             * 接口mock
             * @param id
             * @param level
             */
            let getAreaList = function ({ id, level }) {
                console.log(id, level)
                return new Promise((resolve, reject) => {
                    if (level > 4) {
                        $loading.style.visibility = 'hidden'
                        return
                    }
                    if (level === 3 && id != 2) {
                        // 只返回华东科数据
                        $loading.style.visibility = 'hidden'
                        return false
                    }
                    fetch(`data/areaList-${level}.json`)
                        .then(response => response.json())
                        .then(data => {
                            resolve(data)
                        })
                        .catch(err => {
                            reject(err)
                            $loading.style.visibility = 'hidden'
                        })
                })
            }

            // 默认从科室层级开始
            let getUnderMap = function (id, level = 2) {
                $loading.style.visibility = 'visible'
                // 接口获取
                getAreaList({
                    id,
                    level
                }).then(
                    res => {
                        clearMap()
                        res.map((item, index) => {
                            let position = []
                            item.areaIdList.map(areaId => {
                                if (areaPaths[areaId]) {
                                    let areaPath = JSON.parse(JSON.stringify(areaPaths[areaId]))
                                    areaPath.map(path => {
                                        position = [...position, ...path]
                                        /**
                                         * tips：小细节，
                                         * 每个小区域都需要用尺量图绘制，一起绘制是可以的，但是后面地图的自适应就不好使了
                                         * 遍历每个小区域并绘制
                                         * @param path 多边形轮廓线的节点坐标数组
                                         */
                                        // 颜色根据业务需要替换计算方法，这里为了简单使用了下标
                                        addPolygon(JSON.parse(JSON.stringify(path)), mapColors[index % 5])
                                    })
                                }
                            })
                            if (position.length > 0) {
                                // 获取中心点坐标，并渲染区域名称及数据marker
                                let center = getPointsCenter(position)
                                renderMarker({
                                    ...item,
                                    center,
                                    color: mapColors[index % 5]
                                })
                            }
                        })
                        $loading.style.visibility = 'hidden'

                        // 渲染尺量图到地图
                        map.add(polygons)

                        /**
                         * tips：小细节，
                         * 绘制完成之后，做个窗口自适应
                         */
                        map.setFitView(polygons)
                    },
                    () => {
                        $loading.style.visibility = 'hidden'
                    }
                )
            }

            // 获取所有的经纬度集合
            let getAreaPath = function () {
                $loading.style.visibility = 'visible'
                return new Promise((resolve, reject) => {
                    fetch('data/areaPath.json')
                        .then(response => response.json())
                        .then(data => {
                            areaPaths = data
                            // 获取第一级数据
                            getUnderMap()
                            resolve(data)
                        })
                        .catch(err => {
                            reject(err)
                            $loading.style.visibility = 'hidden'
                        })
                })
            }
            getAreaPath()
        }
    }
}
</script>

<style lang="scss">
#map {
    height: calc(100vh - 46px);
}
#container {
    width: 100%;
    height: 100%;
}
#loading {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #333;
    background: rgba(255, 255, 255, 0.8);
}
.area-map-marker {
    padding: 0.4rem 1rem;
    border-radius: 0.2rem;
    background-color: white;
    border-width: 0;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 14px;
    color: #111;
}
.area-map-marker__title,
.area-map-marker__count {
    white-space: nowrap;
}
</style>
