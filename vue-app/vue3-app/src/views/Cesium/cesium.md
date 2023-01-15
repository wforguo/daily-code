# cesium

## Intro

- Cesium 是一个跨平台、跨浏览器的展示三维地球和地图的 javascript 库。

- Cesium 使用WebGL 来进行硬件加速图形，使用时不需要任何插件支持，但是浏览器必须支持WebGL。

- Cesium是基于Apache2.0 许可的开源程序。它可以免费的用于商业和非商业用途。

## 目录结构

- Source/: Cesium应用程序代码及数据

- ThirdParty/：外部依赖库，不同于Cesium的第三方库

- LICENSE.md：Cesium的License介绍

- index.html：Web首页，需要按照Cesium要求定义页面，同时添加Cesium依赖库

- server.js：基于node.js的web服务应用


## Imagery

关键元素：图层（Imagery）

**支持的图层格式：**

- wms

- TMS

- WMTS (with time dynamic imagery)

- ArcGIS

- Bing Maps

- Google Earth

- Mapbox

- OpenStreetMap

## Terrain

地形（Terrain）

Cesium支持流式的、可视化的全球高程投影地形地势、水形数据，包括海洋、湖泊、河流、山峰、峡谷和其他能够被三维展示出来的且效果比二维好的地形数据。像图层数据一样，Cesium引擎会从一个服务器上请求流式地形数据，仅请求那些基于当前相机能看到的需要绘制的图层上的数据。

Cesium官方提供了一些地形数据集的例子，以及如何配置这些参数。

- ArcticDEM : 高投影的arctic terrain

- PAMAP Terrain : 高投影的Pennsylvania terrain

- Terrain display options : 一些地形数据配置和格式

- Terrain exaggeration : 是地形间的高度差异更加的优雅艺术

支持的地形数据格式

- Quantized-mesh, Cesium团队自己开源的一种格式

- Heightmap

- Google Earth Enterprise

## Scene

视窗（Scene）

### 基础的Cesium类型

- Cartesian3 : 一个三维笛卡尔坐标——当它被用作相对于地球中心的位置时，使用地球固定框架（ECEF）。

- Cartographic : 由经度、纬度（弧度）和WGS84椭球面高度确定的位置。

- HeadingPitchRoll : 在东北向上的框架中关于局部轴的旋转（弧度）。航向是围绕负Z轴的旋转。俯仰是围绕负Y轴的旋转。滚动是关于正X轴的旋转。

- Quaternion :以4D坐标表示的3D旋转。

