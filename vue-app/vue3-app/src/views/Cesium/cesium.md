## 简介
-  Cesium 是一个跨平台、跨浏览器的展示三维地球和地图的 javascript 库。
-  Cesium 使用WebGL 来进行硬件加速图形，使用时不需要任何插件支持，但是浏览器必须支持WebGL。
-  Cesium是基于Apache2.0 许可的开源程序。它可以免费的用于商业和非商业用途。

## 目录结构
-  Source/: Cesium应用程序代码及数据
-  ThirdParty/：外部依赖库，不同于Cesium的第三方库
-  LICENSE.md：Cesium 的 License 介绍
-  index.html：Web首页，需要按照Cesium要求定义页面，同时添加Cesium依赖库
-  server.js：基于node.js的web服务应用

## 界面介绍
### 界面控件
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1088766/1675233602410-fb5c7f79-df9b-42f3-b6ff-1360dd48dec6.png?x-oss-process=image/format,png#averageHue=%23f0f0f0&clientId=u133b5a00-e773-4&from=paste&height=218&id=ufa855bb7&name=image.png&originHeight=218&originWidth=642&originalType=binary&ratio=1&rotation=0&showTitle=false&size=560074&status=done&style=none&taskId=ud287985f-d00a-4556-b70d-6ae7d536266&title=&width=642)

### 隐藏控件
#### js代码控制
```javascript
var viewer = new Cesium.Viewer('cesiumContainer',{
    geocoder: false,  // 是否显示地名查找控件
    homeButton: false, // 是否显示主页按钮
    sceneModePicker: false, // 是否显示场景按钮
    baseLayerPicker: false,// 是否显示图层选择控件
    navigationHelpButton: false, // 导航帮助按钮
    animation: false, // 是否创建动画小器件，左下角仪表
    timeline: false, // 是否显示时间线控件
    creditContainer: "credit",
    fullscreenButton: false, // 是否全屏按钮
    vrButton: false,
    // skyBox : new Cesium.SkyBox({
    //     sources : {
    //     positiveX : 'stars/TychoSkymapII.t3_08192x04096_80_px.jpg',
    //     negativeX : 'stars/TychoSkymapII.t3_08192x04096_80_mx.jpg',
    //     positiveY : 'stars/TychoSkymapII.t3_08192x04096_80_py.jpg',
    //     negativeY : 'stars/TychoSkymapII.t3_08192x04096_80_my.jpg',
    //     positiveZ : 'stars/TychoSkymapII.t3_08192x04096_80_pz.jpg',
    //     negativeZ : 'stars/TychoSkymapII.t3_08192x04096_80_mz.jpg'
        //     }
        // })
    });
```

关闭版权信息
```javascript
    // 去除cesium标识
    mapViewer._cesiumWidget._creditContainer.style.display = 'none'
```

显示帧速（FPS）
```javascript
viewer.scene.debugShowFramesPerSecond = true;
```

#### css控制
```css
      /* 不占据空间，无法点击 */
      .cesium-viewer-toolbar,             /* 右上角按钮组 */
      .cesium-viewer-animationContainer,  /* 左下角动画控件 */
      .cesium-viewer-timelineContainer,   /* 时间线 */
      .cesium-viewer-bottom               /* logo信息 */
      {
        display: none;
      }
      .cesium-viewer-fullscreenContainer  /* 全屏按钮 */
      { position: absolute; top: -999em;  }
```

## 绘制形状
### 通过Entity添加形状
添加立方体
```javascript
var viewer = new Cesium.Viewer('cesiumContainer');
var redBox = viewer.entities.add({
  name : 'Red box with black outline',
  position: Cesium.Cartesian3.fromDegrees(119.040216, 33.58167, 50.9),
  box : {
    dimensions : new Cesium.Cartesian3(4000.0, 3000.0, 5000.0),
    material : Cesium.Color.RED.withAlpha(0.5),
    outline : true,
    outlineColor : Cesium.Color.BLACK
  }
});

viewer.zoomTo(viewer.entities);
```

### 通过czml添加
czml是一种JSON格式的字符串，
用于描述与时间有关的动画场景，czml包含点、线、地标、模型和其他的一些元素，
并指明了这些元素如何随时间而变化
```javascript
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
mapViewer.zoomTo(dataSourcePromise)
```

效果
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1088766/1675233617665-7b34dfbc-91c3-4913-8236-242f7b2b4056.png?x-oss-process=image/format,png#averageHue=%23606544&clientId=u133b5a00-e773-4&from=paste&height=319&id=ub2a87e6b&name=image.png&originHeight=319&originWidth=352&originalType=binary&ratio=1&rotation=0&showTitle=false&size=449394&status=done&style=none&taskId=uc2ad8ca9-b9bf-4b0b-bdf1-392d288e2ea&title=&width=352)

## 形状类型
实体实例将多种形式的可视化聚集到单个高级对象中。可以手动创建它们并将其添加到 [Viewer＃entities](http://cesium.xin/cesium/cn/Documentation1.62/Viewer.html#entities)或由数据源，例如 [CzmlDataSource](http://cesium.xin/cesium/cn/Documentation1.62/CzmlDataSource.html)和 [GeoJsonDataSource](http://cesium.xin/cesium/cn/Documentation1.62/GeoJsonDataSource.html)。

| Name | Type | Description |
| --- | --- | --- |
| options | Object | optionalObject with the following properties: |
| Name | Type | Description |
| id | String | 可选此对象的唯一标识符。如果未提供，则将生成GUID。 |
| name | String | 可选显示给用户的可读名称。它不必是唯一的。 |
| availability | [TimeIntervalCollection](http://cesium.xin/cesium/cn/Documentation1.62/TimeIntervalCollection.html) | 可选与此对象相关联的可用性（如果有）。 |
| show | Boolean | 可选一个布尔值，指示是否显示实体及其子代。 |
| description | [Property](http://cesium.xin/cesium/cn/Documentation1.62/Property.html) | 可选一个字符串属性，用于为此实体指定HTML描述。 |
| position | [PositionProperty](http://cesium.xin/cesium/cn/Documentation1.62/PositionProperty.html) | 可选指定实体位置的属性。 |
| orientation | [Property](http://cesium.xin/cesium/cn/Documentation1.62/Property.html) | 可选指定实体方向的属性。 |
| viewFrom | [Property](http://cesium.xin/cesium/cn/Documentation1.62/Property.html) | 可选用于查看该对象的建议初始偏移量。 |
| parent | [Entity](http://cesium.xin/cesium/cn/Documentation1.62/Entity.html) | 可选与该实体关联的父实体。 |
| billboard | [BillboardGraphics](http://cesium.xin/cesium/cn/Documentation1.62/BillboardGraphics.html) | 可选与该实体相关联的广告牌。 |
| box | [BoxGraphics](http://cesium.xin/cesium/cn/Documentation1.62/BoxGraphics.html) | 可选与该实体关联的框。 |
| corridor | [CorridorGraphics](http://cesium.xin/cesium/cn/Documentation1.62/CorridorGraphics.html) | 可选与该实体关联的走廊。 |
| cylinder | [CylinderGraphics](http://cesium.xin/cesium/cn/Documentation1.62/CylinderGraphics.html) | 可选与该实体关联的圆柱体。 |
| ellipse | [EllipseGraphics](http://cesium.xin/cesium/cn/Documentation1.62/EllipseGraphics.html) | 可选与该实体关联的椭圆。 |
| ellipsoid | [EllipsoidGraphics](http://cesium.xin/cesium/cn/Documentation1.62/EllipsoidGraphics.html) | 可选与该实体关联的椭球。 |
| label | [LabelGraphics](http://cesium.xin/cesium/cn/Documentation1.62/LabelGraphics.html) | 可选与该实体关联的options.label。 |
| model | [ModelGraphics](http://cesium.xin/cesium/cn/Documentation1.62/ModelGraphics.html) | 可选与该实体关联的模型。 |
| path | [PathGraphics](http://cesium.xin/cesium/cn/Documentation1.62/PathGraphics.html) | 可选与该实体关联的路径。 |
| plane | [PlaneGraphics](http://cesium.xin/cesium/cn/Documentation1.62/PlaneGraphics.html) | 可选与该实体关联的平面。 |
| point | [PointGraphics](http://cesium.xin/cesium/cn/Documentation1.62/PointGraphics.html) | 可选与该实体关联的点。 |
| polygon | [PolygonGraphics](http://cesium.xin/cesium/cn/Documentation1.62/PolygonGraphics.html) | 可选与该实体关联的多边形。 |
| polyline | [PolylineGraphics](http://cesium.xin/cesium/cn/Documentation1.62/PolylineGraphics.html) | 可选与该实体关联的折线。 |
| properties | [PropertyBag](http://cesium.xin/cesium/cn/Documentation1.62/PropertyBag.html) | 可选与该实体关联的任意属性。 |
| polylineVolume | [PolylineVolumeGraphics](http://cesium.xin/cesium/cn/Documentation1.62/PolylineVolumeGraphics.html) | 可选与该实体相关联的polylineVolume。 |
| rectangle | [RectangleGraphics](http://cesium.xin/cesium/cn/Documentation1.62/RectangleGraphics.html) | 可选与该实体关联的矩形。 |
| wall | [WallGraphics](http://cesium.xin/cesium/cn/Documentation1.62/WallGraphics.html) | 可选与该实体关联的墙。 |

## 3D Tiles
### 什么是3D Tiles

`3DTiles`数据集是`cesium`小组`AnalyticlGraphics`于2016年3月定义的一种数据集，`3DTiles`数据集以分块、分级渲染，
将大数据量三维数据以分块，分层的形式组织起来，可以大量减轻浏览器和`GPU`的负担是一个优秀的，并且格式公开的数据格式。

3D Tiles将用于流式传输3D内容，包括建筑物，树木，点云和矢量数据。

```javascript
const tileset = new Cesium.Cesium3DTileset({
  url: Cesium.IonResource.fromAssetId(40866),
});

viewer.scene.primitives.add(tileset);
viewer.zoomTo(tileset);

```

## Imagery

关键元素：图层（Imagery）

**支持的图层格式：**

-  wms
-  TMS
-  WMTS (with time dynamic imagery)
-  ArcGIS
-  Bing Maps
-  Google Earth
-  Mapbox
-  OpenStreetMap

## Terrain

地形（Terrain）

Cesium支持流式的、可视化的全球高程投影地形地势、水形数据，包括海洋、湖泊、河流、山峰、峡谷和其他能够被三维展示出来的且效果比二维好的地形数据。像图层数据一样，Cesium引擎会从一个服务器上请求流式地形数据，仅请求那些基于当前相机能看到的需要绘制的图层上的数据。

Cesium官方提供了一些地形数据集的例子，以及如何配置这些参数。

-  ArcticDEM : 高投影的arctic terrain
-  PAMAP Terrain : 高投影的Pennsylvania terrain
-  Terrain display options : 一些地形数据配置和格式
-  Terrain exaggeration : 是地形间的高度差异更加的优雅艺术

支持的地形数据格式

-  Quantized-mesh, Cesium团队自己开源的一种格式
-  Heightmap
-  Google Earth Enterprise

## Scene

视窗（Scene）

### 基础的Cesium类型

-  Cartesian3 : 一个三维笛卡尔坐标——当它被用作相对于地球中心的位置时，使用地球固定框架（ECEF）。
-  Cartographic : 由经度、纬度（弧度）和WGS84椭球面高度确定的位置。
-  HeadingPitchRoll : 在东北向上的框架中关于局部轴的旋转（弧度）。航向是围绕负Z轴的旋转。俯仰是围绕负Y轴的旋转。滚动是关于正X轴的旋转。
-  Quaternion :以4D坐标表示的3D旋转。 
