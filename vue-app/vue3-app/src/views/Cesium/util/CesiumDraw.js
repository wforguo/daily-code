/**
 * @Author: forguo
 * @Date: 2023/1/16 14:58
 * @Description: 绘制点 线 面 工具
 */

import CesiumToolUtil from './CesiumTool'
import * as Cesium from 'cesium'

class CesiumDrawUtil {
    constructor() {
        this.isTerrain = true // 贴地
        this.viewEntities = []
        this.type = 'Point'
        this.isDrawing = false
        this.positions = []
    }

    /**
     * 互斥 清除最后一个
     */
    removeLastOperate() {
        if (this.isDrawing) {
            //如果是线或者面 则清除最后一个
            if (this.lastType === 'Line' || this.lastType === 'Polygon') {
                if (this.viewEntities.length > 0) {
                    const lastEntity = this.viewEntities.pop()
                    this.viewer.entities.remove(lastEntity)
                }
            }

            if (this.handler) {
                this.handler.destroy()
                this.handler = null
            }
        }
    }

    initPolygonHandler() {
        this.positions = []
        this.removeLastOperate()
        let polygonEntity = null
        this.isDrawing = true
        if (!this.handler) this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)

        this.handler.setInputAction(evt => {
            //单机开始绘制
            var cartesian
            cartesian = CesiumToolUtil.getCatesian3FromPX(evt.position, this.viewer)
            if (!cartesian) return

            this.positions.push(cartesian.clone())
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

        this.handler.setInputAction(evt => {
            //移动时绘制面
            if (this.positions.length < 2) return
            var cartesian
            cartesian = CesiumToolUtil.getCatesian3FromPX(evt.endPosition, this.viewer)
            if (!cartesian) return

            if (this.positions.length >= 2) {
                if (!Cesium.defined(polygonEntity)) {
                    this.positions.push(cartesian)
                    //
                    polygonEntity = this.showPolygonOnMap(this.positions)
                } else {
                    this.positions.pop()
                    this.positions.push(cartesian)
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

        this.handler.setInputAction(() => {
            // this.positions.push(cartesian.clone());
            if (this.positions.length < 4) return
            this.positions.pop() //最后一个点无效
            this.isDrawing = false
            this.handler.destroy()
            this.handler = null
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    }

    showPolygonOnMap(positions) {
        const update = function () {
            if (positions.length < 2) {
                return null
            }
            return new Cesium.PolygonHierarchy(positions)
        }
        const polygon = this.viewer.entities.add({
            polygon: {
                hierarchy: new Cesium.CallbackProperty(update, false),
                material: Cesium.Color.fromCssColorString('#1ed9ac').withAlpha(0.5),
                perPositionHeight: !this.isTerrain
                // classificationType: Cesium.ClassificationType.BOTH
            }
        })
        this.viewEntities.push(polygon)
        return polygon
    }

    initLineHandler() {
        this.positions = []
        this.removeLastOperate()
        var lineEntity = null
        this.isDrawing = true
        if (!this.handler) this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
        this.handler.setInputAction(evt => {
            //单机开始绘制
            var cartesian
            cartesian = CesiumToolUtil.getCatesian3FromPX(evt.position, this.viewer)
            if (!cartesian) return

            this.positions.push(cartesian.clone())
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

        //鼠标移动事件
        this.handler.setInputAction(evt => {
            //移动时绘制面
            if (this.positions.length < 1) return
            var cartesian
            cartesian = CesiumToolUtil.getCatesian3FromPX(evt.endPosition, this.viewer)
            if (!cartesian) return

            if (this.positions.length >= 1) {
                if (!Cesium.defined(lineEntity)) {
                    this.positions.push(cartesian)
                    lineEntity = this.showLineOnMap(this.positions)
                } else {
                    this.positions.pop()
                    this.positions.push(cartesian)
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

        this.handler.setInputAction(() => {
            this.isDrawing = false
            this.handler.destroy()
            this.handler = null
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    }

    showLineOnMap(positions) {
        const update = function () {
            if (positions.length < 2) {
                return null
            }

            return positions
        }
        const lineEntity = this.viewer.entities.add({
            polyline: new Cesium.PolylineGraphics({
                positions: new Cesium.CallbackProperty(update, false),
                show: true,
                clampToGround: this.isTerrain,
                material: Cesium.Color.AQUA,
                width: 2
            })
        })
        this.viewEntities.push(lineEntity)
        return lineEntity
    }

    initPointHandler() {
        this.positions = []
        this.removeLastOperate()
        this.isDrawing = true
        if (!this.handler) this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
        this.handler.setInputAction(evt => {
            //开始绘制
            var cartesian
            cartesian = CesiumToolUtil.getCatesian3FromPX(evt.position, this.viewer)
            if (!cartesian) return
            if (this.positions.length == 0) {
                this.positions.push(cartesian.clone())
                this.isDrawing = false
                this.showPointOnMap()
                this.handler.destroy()
                this.handler = null
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    showPointOnMap() {
        const point = this.viewer.entities.add({
            position: this.positions[0],
            point: {
                pixelSize: 5,
                color: Cesium.Color.BLUE,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2
            }
        })
        this.viewEntities.push(point)
    }

    clearAll() {
        if (this.viewEntities.length > 0) {
            this.viewEntities.forEach(fn => {
                this.viewer.entities.remove(fn)
            })
            this.viewEntities = []
        }

        this.positions = []
        this.isTerrain = true

        this.isDrawing = false
        if (this.handler) {
            this.handler.destroy()
            this.handler = null
        }
    }

    getPositions() {
        return this.positions
    }

    /**
     * 激活绘制
     * @param viewer {Cesium.Viewer}
     * @param type {String} [type = Line | Point | Polygon]
     * @param isTerrain {Boolean} [isTerrain = true]
     */
    active(viewer, type, isTerrain = true) {
        if (!this.viewer) {
            this.viewer = viewer
        }
        this.lastType = this.type //记录上次操作的类型 便于清除结果
        this.type = type || 'Point'
        this.isTerrain = isTerrain
        this.clearAll() //清除之前的
        if (this.type === 'Point') {
            this.initPointHandler()
        }

        if (this.type === 'Line') {
            this.initLineHandler()
        }

        if (this.type === 'Polygon') {
            this.initPolygonHandler()
        }
    }

    deactive() {
        this.clearAll()
        this.viewer = undefined
    }
}

export default CesiumDrawUtil
