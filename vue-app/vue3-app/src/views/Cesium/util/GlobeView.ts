//GlobeView 存储 Cesium Viewer， 不能放入 Vue组件中的 data 和 prop传入，会增加性能消耗
const GlobeView: any = {
    Map3DViewer: null
}

export default GlobeView
