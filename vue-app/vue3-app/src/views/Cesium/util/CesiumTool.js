/**
 * @Author: forguo
 * @Date: 2023/1/16 14:57
 * @Description: 封装常用方法
 */

import * as Cesium from 'cesium'
import CesiumPopupUtil from './CesiumPopup'

const CesiumToolUtil = {
    maskPanel: null,
    /**
     * 获取当前三维范围
     * extent,返回当前模式下地图范围[xmin,ymin,xmax,ymax]
     * @param {Cesium.viewer}viewer
     * @return {number[]}
     */
    getExtent(viewer) {
        const Rectangle = viewer.camera.computeViewRectangle()
        //地理坐标（弧度）转经纬度坐标
        const extent = [
            (Rectangle.west / Math.PI) * 180,
            (Rectangle.south / Math.PI) * 180,
            (Rectangle.east / Math.PI) * 180,
            (Rectangle.north / Math.PI) * 180
        ]
        return extent
    },
    /**
     * 根据相机高度获取近似层级
     * @param {Cesium.viewer}viewer
     * @return {number}
     */
    getZoomByHeight(viewer) {
        const height = Math.ceil(viewer.camera.positionCartographic.height)
        const A = 40487.57
        const B = 0.00007096758
        const C = 91610.74
        const D = -40467.74
        return Math.round(D + (A - D) / (1 + Math.pow(height / C, B)))
    },
    /**
     * 获取相机信息
     * @param viewer {Cesium.viewer}
     * @return {{orientation: {heading: number, roll: number, pitch: number}, position: {lng: *, lat: *, height}}}
     */
    getCameraInfo(viewer) {
        const sss = viewer.camera.position
        const car = Cesium.Cartographic.fromCartesian(sss)
        const lon = Cesium.Math.toDegrees(car.longitude)
        const lat = Cesium.Math.toDegrees(car.latitude)
        var result = {
            orientation: {
                heading: viewer.camera.heading,
                pitch: viewer.camera.pitch,
                roll: viewer.camera.roll
            },
            position: {
                lng: lon,
                lat: lat,
                height: car.height
            }
        }
        return result
    },
    /**
     * 显属性信息
     * @param viewer {Cesium.viewer}
     */
    showInfoWind(viewer) {
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        handler.setInputAction(movement => {
            // 场景坐标
            const position = viewer.scene.pickPosition(movement.position)
            let pickobject = viewer.scene.pick(movement.position) //取模型

            console.log(pickobject)
            if (pickobject instanceof Cesium.Cesium3DTileFeature) {
                var html = ''
                for (let item of pickobject.getPropertyNames()) {
                    html += '<div>' + item + ': ' + pickobject.getProperty(item) + '</div>' + '<br>'
                }
                new CesiumPopupUtil({
                    title: '信息'
                })
                    .setPosition(position)
                    .setHTML(html)
                    .addTo(viewer)
                    .setTitle('属性信息框')
            }

            if (pickobject && Cesium.defined(pickobject.id)) {
                const entity = pickobject.id
                console.log(entity)
                if (entity.layerId) {
                    const layer = viewer.getLayer(entity.layerId)
                    if (entity.overlayId) {
                        const overlay = layer.getOverlayById(entity.overlayId)
                        let html = ''
                        const attr = overlay.attr
                        Object.keys(attr).forEach(key => {
                            html += '<div>' + key + ': ' + attr[key] + '</div>' + '<br>'
                        })
                        new CesiumPopupUtil({
                            title: '信息'
                        })
                            .setPosition(position)
                            .setHTML(html)
                            .addTo(viewer)
                            .setTitle('属性信息框')
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    /**
     * 显示点击坐标信息
     * @param viewer {Cesium.viewer}
     */
    showPickPositionWind(viewer) {
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        handler.setInputAction(evt => {
            //单机开始绘制
            var cartesian
            cartesian = CesiumToolUtil.getCatesian3FromPX(evt.position, viewer)
            if (!cartesian) return
            // console.log('--- cartesian3 ---');
            // console.log(cartesian);
            const lngLatHeight = CesiumToolUtil.cartesianToLngLatHeight(viewer, cartesian)
            // console.log('lng -- lat -- height');
            // console.log(lngLatHeight);
            let html = ''
            html += '<div>世界坐标 x：' + cartesian.x + '</div>'
            html += '<div>世界坐标 y：' + cartesian.y + '</div>'
            html += '<div>世界坐标 z：' + cartesian.z + '</div>'
            html += '<div>经度：' + lngLatHeight[0] + '</div>'
            html += '<div>纬度：' + lngLatHeight[1] + '</div>'
            html += '<div>高程：' + lngLatHeight[2] + '</div>'

            new CesiumPopupUtil().setTitle('拾取点信息').setHTML(html).setPosition(cartesian).addTo(viewer)
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    /**
     * 激活单击事件 获取点击信息
     * @param viewer {Cesium.viewer}
     */
    getPickPosition(viewer) {
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        handler.setInputAction(evt => {
            //单机开始绘制
            var cartesian
            cartesian = CesiumToolUtil.getCatesian3FromPX(evt.position, viewer)
            if (!cartesian) return
            console.log('--- cartesian3 ---')
            console.log(cartesian)
            const lngLatHeight = CesiumToolUtil.cartesianToLngLatHeight(viewer, cartesian)
            console.log('lng -- lat -- height')
            console.log(lngLatHeight)
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    /**
     * 根据屏幕坐标 获取世界坐标
     * @param px  屏幕坐标
     * @param viewer {Cesium.viewer}
     * @return {Cesium.Cartesian3}
     */
    getCatesian3FromPX(px, viewer) {
        let cartesian
        //在模型上提取坐标
        var pickobject = viewer.scene.pick(px) //取模型
        if (viewer.scene.pickPositionSupported && Cesium.defined(pickobject)) {
            //!scene.pickPositionSupported : 不支持深度拾取,无法进行鼠标交互绘制
            cartesian = viewer.scene.pickPosition(px)
            if (cartesian) {
                const pgeo = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian)
                if (pgeo.height > 0) return cartesian
            }
        }

        //提取鼠标点的地理坐标
        const pickRay = viewer.scene.camera.getPickRay(px)
        cartesian = viewer.scene.globe.pick(pickRay, viewer.scene)
        return cartesian
    },
    /**
     * 转换为经纬度
     * @param viewer {Cesium.viewer}
     * @param cartesian {Cesium.Cartesian3}
     * @return [lng,lat]
     */
    cartesianToLngLat(viewer, cartesian) {
        // const latlng = Cesium.Cartographic.fromCartesian(cartesian)
        const latlng = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian)
        const lat = Cesium.Math.toDegrees(latlng.latitude)
        const lng = Cesium.Math.toDegrees(latlng.longitude)
        return [lng, lat]
    },
    /**
     * 转换为经度和和高度
     * @param viewer {Cesium.viewer}
     * @param cartesian {Cesium.Cartesian3}
     * @return [lng,lat,height]
     */
    cartesianToLngLatHeight(viewer, cartesian) {
        // const latlng = Cesium.Cartographic.fromCartesian(cartesian)
        const latlng = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian)
        const lat = Cesium.Math.toDegrees(latlng.latitude)
        const lng = Cesium.Math.toDegrees(latlng.longitude)
        return [lng, lat, latlng.height]
    },

    /**
     *
     * @param viewer {Cesium.viewer}
     * @param cartesian {Cesium.Cartesian3}
     * @return [lng,lat,height]
     */
    cartesianToLngLatClampHeight(viewer, cartesian) {
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        if (viewer.scene.clampToHeightSupported) {
            const heightCartesian = viewer.scene.clampToHeight(cartesian)
            if (heightCartesian) {
                cartographic = Cesium.Cartographic.fromCartesian(heightCartesian)
            }
            const lat = Cesium.Math.toDegrees(cartographic.latitude)
            const lng = Cesium.Math.toDegrees(cartographic.longitude)
            return [lng, lat, cartographic.height]
        }
        const height = viewer.scene.globe.getHeight(cartographic)
        const lat = Cesium.Math.toDegrees(cartographic.latitude)
        const lng = Cesium.Math.toDegrees(cartographic.longitude)
        return [lng, lat, height]
    },

    /**
     *  世界坐标数组转二维坐标数组
     * @param viewer {Cesium.viewer}
     * @param cartesians {Array<Cesium.Cartesian3>}
     * @return {[]}
     */
    getLngLats(viewer, cartesians) {
        let arr = []
        for (let i = 0; i < cartesians.length; i++) {
            const item = CesiumToolUtil.cartesianToLngLat(viewer, cartesians[i])
            arr.push(item)
        }
        return arr
    },
    /**
     *  世界坐标数组转三维经纬度坐标数组
     * @param viewer {Cesium.viewer}
     * @param cartesians {Array<Cesium.Cartesian3>}
     * @return {[]}
     */
    getLngLatHeights(viewer, cartesians) {
        let arr = []
        for (let i = 0; i < cartesians.length; i++) {
            const item = CesiumToolUtil.cartesianToLngLatHeight(viewer, cartesians[i])
            arr.push(item)
        }
        return arr
    },
    /**
     * 二维转一维数组
     * @param points {Array}
     * @return {[]}
     */
    pointsToDegreesArray(points) {
        let degreesArray = []
        points.map(item => {
            degreesArray.push(item[0])
            degreesArray.push(item[1])
        })
        return degreesArray
    },
    /**
     * 从世界坐标中获取最高点的高程
     * @param viewer {Cesium.viewer}
     * @param cartesians {Array<Cesium.Cartesian3>}
     * @return {number}
     */
    getMaxHeight(viewer, cartesians) {
        let height = CesiumToolUtil.cartesianToLngLatHeight(viewer, cartesians[0])[2]
        for (let i = 0; i < cartesians.length; i++) {
            const item = CesiumToolUtil.cartesianToLngLatHeight(viewer, cartesians[i])
            if (height < item[2]) {
                height = item[2]
            }
        }
        return height
    },
    /**
     * 从世界坐标中获取贴物体最高点的高程
     * @param viewer {Cesium.viewer}
     * @param cartesians {Array<Cesium.Cartesian3>}
     * @return {number}
     */
    getMaxClampHeight(viewer, cartesians) {
        let height = CesiumToolUtil.cartesianToLngLatClampHeight(viewer, cartesians[0])[2]
        for (let i = 0; i < cartesians.length; i++) {
            const item = CesiumToolUtil.cartesianToLngLatClampHeight(viewer, cartesians[i])
            if (height < item[2]) {
                height = item[2]
            }
        }
        return height
    },
    /**
     * 从世界坐标中获取最低点的高程
     * @param viewer {Cesium.viewer}
     * @param cartesians {Array<Cesium.Cartesian3>}
     * @return {number}
     */
    getMinHeight(viewer, cartesians) {
        let height = CesiumToolUtil.cartesianToLngLatHeight(viewer, cartesians[0])[2]
        for (let i = 0; i < cartesians.length; i++) {
            const item = CesiumToolUtil.cartesianToLngLatHeight(viewer, cartesians[i])
            if (height > item[2]) {
                height = item[2]
            }
        }
        return height
    },
    /**
     * 从世界坐标中获取贴物体最低点的高程
     * @param viewer {Cesium.viewer}
     * @param cartesians {Array<Cesium.Cartesian3>}
     * @return {number}
     */
    getMinClampHeight(viewer, cartesians) {
        let height = CesiumToolUtil.cartesianToLngLatClampHeight(viewer, cartesians[0])[2]
        for (let i = 0; i < cartesians.length; i++) {
            const item = CesiumToolUtil.cartesianToLngLatClampHeight(viewer, cartesians[i])
            if (height > item[2]) {
                height = item[2]
            }
        }
        return height
    },
    /**
     * 打印 坐标 经纬度信息
     * @param viewer {Cesium.viewer}
     * @param position
     */
    logLngLat(viewer, position) {
        console.log('--position--')
        console.log(position)
        var sss = viewer.scene.pickPosition(position) //单击位置
        console.log('--sss---')
        console.log(sss)
        //将笛卡尔坐标转化为经纬度坐标
        var car = Cesium.Cartographic.fromCartesian(sss)
        var lon = Cesium.Math.toDegrees(car.longitude)
        var lat = Cesium.Math.toDegrees(car.latitude)
        console.log('------lng------lat-------height')
        console.log(lon)
        console.log(lat)
        console.log(car.height)
        console.log(lon + ',' + lat + ',' + car.height)
    },
    /**
     * 放大
     * @param viewer {Cesium.viewer}
     */
    zoomIn(viewer) {
        // 获取当前镜头位置的笛卡尔坐标
        var cameraPos = viewer.camera.positionCartographic
        // 获取当前坐标系标准
        // var ellipsoid = viewer.scene.globe.ellipsoid;

        // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
        // var cartographic = ellipsoid.cartesianToCartographic(cameraPos);
        // 获取镜头的高度
        var height = cameraPos.height
        // if (height < 40) {
        //   return;
        // }
        // 镜头拉近
        viewer.camera.zoomIn(height / 3)
    },
    /**
     * 缩小
     * @param viewer {Cesium.viewer}
     */
    zoomOut(viewer) {
        // 获取当前镜头位置的笛卡尔坐标
        var cameraPos = viewer.camera.positionCartographic

        // 获取当前坐标系标准
        // var ellipsoid = viewer.scene.globe.ellipsoid;

        // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
        // var cartographic = ellipsoid.cartesianToCartographic(cameraPos);
        // 获取镜头的高度
        var height = cameraPos.height
        // if (height > 400) {
        //   return;
        // }
        // 镜头拉近
        viewer.camera.zoomOut(height * 1.2)
    },
    /**
     * 显示加载遮罩面板
     */
    showLoading() {
        // var loadingDiv = document.getElementById('cesium-mask-panel')
        // loadingDiv.style.display = 'block'
        if (this.maskPanel) {
            this.maskPanel.style.display = 'block'
        }
    },
    /**
     * 隐藏加载遮罩面板
     */
    hideLoading() {
        // var loadingDiv = document.getElementById('cesium-mask-panel')
        // loadingDiv.style.display = 'none'
        if (this.maskPanel) {
            this.maskPanel.style.display = 'none'
        }
    }
}

export default CesiumToolUtil
