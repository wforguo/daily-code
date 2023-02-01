/**
 * @Author: forguo
 * @Date: 2023/1/16 14:45
 * @Description: 漫游
 */

import * as Cesium from 'cesium'
import * as turf from '@turf/turf'

let CesiumRoamUtil = function (options) {
    this.lineData = options.lineData
    this.speed = options.speed || 100 // 默认速度
    this.isLoop = options.loop || false // 默认循环漫游
    this.showLine = options.showLine || false //默认隐藏漫游线路
    this.lineColor = options.lineColor || '#FFFFCC'
    this.fx = options.fx || 90 //运动点后方距离
    this.fy = options.fy || 0 // 运动点侧方距离
    this.fz = options.fz || 55 //运动点上方距离
    //是否开启
    this.isActive = false

    this.scratch = new Cesium.Matrix4()

    // 飞行物体
    this.flyEntity = null

    // 锁定视角
    this.matrix3Scratch = new Cesium.Matrix3()
    this.positionScratch = new Cesium.Cartesian3()
    this.orientationScratch = new Cesium.Quaternion()
}

CesiumRoamUtil.prototype.play = function (viewer) {
    this.viewer = viewer

    if (!this.isActive) {
        this.start()
    } else {
        this.remove()
    }
}

CesiumRoamUtil.prototype.start = function () {
    //=====================计算飞行时间及坐标====================
    let property = new Cesium.SampledPositionProperty()
    let startTime = Cesium.JulianDate.fromDate(new Date()) //飞行开始时间
    let stopTime //飞行结束时间

    let lonlats = this.lineData
    if (lonlats.length < 2) {
        console.error('路线无坐标数据，无法漫游！')
        return
    }
    let speeds = this.speed
    if (lonlats.length == 2) {
        //需要插值，否则穿地
        let centerPt = getPointForLineAlong(lonlats[0], lonlats[1], 0, 0.5)
        lonlats.splice(1, 0, centerPt)
        if (speeds) speeds.splice(1, 0, speeds[0])
    }

    let alltimes = 0 //总时长,秒
    let alllen = 0 //总长度,千米

    let lastPoint
    let arrLinePoint = []
    for (let i = 0, length = lonlats.length; i < length; i++) {
        let lonlat = lonlats[i]
        let item = Cesium.Cartesian3.fromDegrees(lonlat[0], lonlat[1], lonlat[2] || 0)
        item.lonlat = lonlat

        if (i == 0) {
            //起点
            let sTime = Cesium.JulianDate.addSeconds(startTime, alltimes, new Cesium.JulianDate())
            item.time = sTime
            property.addSample(sTime, item)
            lastPoint = item
        } else if (i == lonlats.length - 1) {
            let speed = this.speed //1千米/时
            let len = Cesium.Cartesian3.distance(item, lastPoint) / 1000
            let stepTime = (len / speed) * 3600
            alltimes += stepTime
            alllen += len

            let sTime = Cesium.JulianDate.addSeconds(startTime, alltimes, new Cesium.JulianDate())
            item.time = sTime
            property.addSample(sTime, item)
        } else {
            //中间点，计算转弯处弧线
            let speed = this.speed //1千米/时 =  1/3.6 米/秒
            speed = speed * 0.5 //转弯处降速

            let arrBezier = getBezierSpline(lonlats[i - 1], lonlat, lonlats[i + 1])
            for (let j = 0; j < arrBezier.length; j++) {
                let itemBezier = arrBezier[j]
                let len = Cesium.Cartesian3.distance(itemBezier, lastPoint) / 1000
                let stepTime = (len / speed) * 3600
                alltimes += stepTime
                // eslint-disable-next-line no-unused-vars
                alllen += len

                let sTime = Cesium.JulianDate.addSeconds(startTime, alltimes, new Cesium.JulianDate())
                item.time = sTime
                property.addSample(sTime, itemBezier)
                lastPoint = itemBezier
            }
        }
        arrLinePoint.push(item)
    }

    this.arrLinePoint = arrLinePoint
    stopTime = Cesium.JulianDate.addSeconds(startTime, alltimes, new Cesium.JulianDate())

    //=====================绑定clock timeline====================
    this.viewer.clock.startTime = startTime.clone()
    this.viewer.clock.stopTime = stopTime.clone()
    this.viewer.clock.currentTime = startTime.clone()
    this.viewer.clock.multiplier = this.speed //飞行速度
    this.viewer.clock.shouldAnimate = true

    if (this.isLoop) {
        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP
    } else {
        //到达终止时间后循环
        this.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED //到达终止时间后停止
    }

    if (this.viewer.timeline) this.viewer.timeline.zoomTo(startTime, stopTime)
    else if (this.timeline) this.timeline.zoomTo(startTime, stopTime)

    //=====================构造飞行对象====================
    let entityAttr = {
        availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
                start: startTime,
                stop: stopTime
            })
        ]),
        position: property,
        orientation: new Cesium.VelocityOrientationProperty(property), //基于移动位置自动计算方位
        point: {
            color: new Cesium.Color.fromCssColorString('#ffffff').withAlpha(0.01),
            pixelSize: 1
        }
    }

    if (this.showLine) {
        // 是否显示路线
        entityAttr.path = {
            resolution: 1,
            material: new Cesium.Color.fromCssColorString(this.lineColor).withAlpha(0.4),
            width: 1.5
        }
    }

    this.flyEntity = this.viewer.entities.add(entityAttr)

    // 插值，使折线边平滑 ,并且长距离下不穿地
    this.flyEntity.position.setInterpolationOptions({
        interpolationDegree: 2,
        interpolationAlgorithm: Cesium.HermitePolynomialApproximation
    })

    this.viewer.trackedEntity = this.flyEntity

    this.isActive = true

    this.viewer.scene.preRender.addEventListener(this.roamEventListener, this)
}

CesiumRoamUtil.prototype.remove = function () {
    if (this.viewer) {
        this.viewer.trackedEntity = undefined
        this.viewer.scene.preRender.removeEventListener(this.roamEventListener, this)
        if (this.flyEntity) {
            this.viewer.entities.remove(this.flyEntity)
            this.flyEntity = null
        }
        this.viewer = null
    }
    this.isActive = false
}

CesiumRoamUtil.prototype.roamEventListener = function () {
    if (!this.isActive || this.flyEntity == null) return
    if (this.viewer.trackedEntity != this.flyEntity) this.viewer.trackedEntity = this.flyEntity

    this.getModelMatrix(this.viewer.trackedEntity, this.viewer.clock.currentTime, this.scratch)

    let transformX = this.fx // 距离运动点的距离（后方）
    let transformZ = this.fz // 距离运动点的高度（上方）
    let transformY = this.fy // 距离运动点的高度（侧方）
    this.viewer.scene.camera.lookAtTransform(this.scratch, new Cesium.Cartesian3(-transformX, transformY, transformZ))

    if (this.flyEntity.model) this.flyEntity.model.show = transformZ != 0
}

CesiumRoamUtil.prototype.getModelMatrix = function (entity, time, result) {
    if (entity == null) return result

    let position = Cesium.Property.getValueOrUndefined(entity.position, time, this.positionScratch)
    if (!Cesium.defined(position)) {
        return undefined
    }

    let orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, this.orientationScratch)
    if (!Cesium.defined(orientation)) {
        result = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, result)
    } else {
        result = Cesium.Matrix4.fromRotationTranslation(
            Cesium.Matrix3.fromQuaternion(orientation, this.matrix3Scratch),
            position,
            result
        )
    }
    return result
}

// 计算转弯
function getBezierSpline(pt1, pt2, pt3) {
    let npt1 = getPointForLineAlong(pt2, pt1, 300, 0.2)
    let npt2 = getPointForLineAlong(pt2, pt1, 200, 0.1)

    let npt3 = getPointForLineAlong(pt2, pt3, 200, 0.1)
    let npt4 = getPointForLineAlong(pt2, pt3, 300, 0.2)

    let line = turf.lineString([npt1, npt2, pt2, npt3, npt4])
    let feature = turf.bezier(line, 10000, 0.5)

    let lonlats = []
    let h2 = pt2[2]
    for (let i = 0; i < feature.geometry.coordinates.length; i++) {
        let item = feature.geometry.coordinates[i]
        lonlats.push(Number(item[0]))
        lonlats.push(Number(item[1]))
        lonlats.push(h2)
    }
    let positions = Cesium.Cartesian3.fromDegreesArrayHeights(lonlats)

    //this.viewer.entities.add({ polyline: { positions: positions,  width: 5,   } }); //test

    return positions
}
//求在P1点到P2点的线上，距离P1点len米长度的点

function getPointForLineAlong(p1, p2, len, bl) {
    let point1 = Cesium.Cartesian3.fromDegrees(p1[0], p1[1], p1[2] || 0)
    let point2 = Cesium.Cartesian3.fromDegrees(p2[0], p2[1], p2[2] || 0)

    let alllen = Cesium.Cartesian3.distance(point1, point2) //米
    if (len == 0 || len >= alllen * bl) len = alllen * bl

    let line = turf.lineString([p1, p2])
    let along1 = turf.along(line, len / 1000, 'kilometers')
    let jd = along1.geometry.coordinates[0]
    let wd = along1.geometry.coordinates[1]

    let h1 = p1[2]
    let h2 = p2[2]
    let height = h1 + ((h2 - h1) * len) / alllen

    return [jd, wd, height]
}

export default CesiumRoamUtil
