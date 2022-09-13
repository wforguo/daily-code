<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2022/9/9 16:59
 * @Description: index
-->
<template>
    <div class="process">
        <div
            id="myPaletteDiv"
            style="height: 100px"
        ></div>
              <!-- The DIV for a Diagram needs an explicit size or else we will not see anything.
             In this case we also add a background color so we can see that area. -->
        <div
            id="myDiagramDiv"
            style="flex: 1;width:100%; height: 100%; background-color: #DAE4E4;"
        ></div>

        <div class="tool">
            <el-button type="primary"  @click="show = true;res = null">配置</el-button>
            <el-button type="success" @click="save">保存</el-button>
        </div>

        <van-overlay :show="show" z-index="999">
            <div @click.stop style="margin: 5% 50px;height: 85%;">
                <res-img :res="res" v-show="res" />
                <textarea id="mySavedModel" style="width: 100%; height: 95%;" v-show="!res">
                 { "class": "GraphLinksModel",
                  "nodeDataArray": [
                {"key":5,"pos":"160 15","icon":"pyrolysis","color":"orange","text":"Pyrolysis (Cracking)","description":"Liquefied petroleum gases (LPGs) are transformed into Ethylene, propylene, benzene, and other by-products.","caption":"Pyrolysis plant","imgsrc":"https://upload.wikimedia.org/wikipedia/commons/6/6c/Guelph.jpg"},
                {"key":6,"pos":"-220 21","icon":"polymerization","color":"red","text":"Basic Polymers","description":"Ethylene and propylene (monomers) are processed into end products using various methods (polymerization).","caption":"Plastics engineering-Polymer products","imgsrc":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Plastics_engineering-Polymer_products.jpg/256px-Plastics_engineering-Polymer_products.jpg"},
                {"key":7,"pos":"-220 -94","icon":"polymerization","color":"green","text":"Plastics","description":"Polymerization produces PET, glycols, alcohols, expandable polystyrene, acrylates, BOPP-films and geosynthetics.","caption":"Lego Color Bricks","imgsrc":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Lego_Color_Bricks.jpg/256px-Lego_Color_Bricks.jpg"},
                {"key":9,"pos":"-220 144","color":"orange","text":"Intermediates","description":"Produced Ethylene, Propylene, Butenes, Benzene, and other by-products.","caption":"Propylene Containers","imgsrc":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/XVJ-12_Propylene_%288662385917%29.jpg/256px-XVJ-12_Propylene_%288662385917%29.jpg","icon":"oil"},
                {"icon":"fractionation","text":"Gas Fractionation","key":-4,"pos":"310 21"},
                {"icon":"oil","text":"OilCompanies","key":-2,"pos":"490 21","caption":"","imgsrc":""}
                ],
                  "linkDataArray": [
                {"from":9,"to":5,"points":[-200,151,-190,151,-30,151,-30,34.5,130,34.5,140,34.5]},
                {"from":7,"to":5,"points":[-200,-87,-190,-87,-30,-87,-30,21.5,130,21.5,140,21.5]},
                {"from":6,"to":5,"points":[-200,28,-190,28,-30,28,-30,28,130,28,140,28]},
                {"from":5,"to":-4,"points":[180,28,190,28,235,28,235,28,280,28,290,28]},
                {"from":-4,"to":-2,"points":[330,28,340,28,400,28,400,28,460,28,470,28]}
                ]}
                </textarea>
                <el-button type="danger" @click="show = false" size="small" style="margin-top: 32px;">关闭</el-button>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import resImg from "./ResImg";
let myDiagram = null
export default {
    name: "gojs",
    components: {resImg},

    title: 'gojs',
    data(){
        return {
            show: false,
            res: null
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
    },
    methods: {
        save(){
            // 生成图片
            const res = myDiagram.makeImage({
                // background: "AntiqueWhite",
                // type: "image/jpeg",
                // details: 0.05
            });
            this.res = res
            console.log(this.res)
            this.show = true
            this.$toast.success({
                message: '保存成功'
            })
        },
        init (){
            // init start

            // Abstract colors
            let Colors = {
                "red": "#be4b15",
                "green": "#52ce60",
                "blue": "#6ea5f8",
                "lightred": "#fd8852",
                "lightblue": "#afd4fe",
                "lightgreen": "#b9e986",
                "pink": "#faadc1",
                "purple": "#d689ff",
                "orange": "#f08c00"
            }
            let ColorNames = [];
            for (let n in Colors) ColorNames.push(n);

            // a conversion function for translating general color names to specific colors
            function colorFunc(colorname) {
                let c = Colors[colorname]
                if (c) return c;
                return "gray";
            }

            // Icons derived from SVG paths designed by freepik: http://www.freepik.com/
            let Icons = {};
            Icons.natgas =
                "F M244.414,133.231 L180.857,133.231 178.509,156.191 250.527,192.94z\
                M179.027,276.244 262.328,308.179 253.451,221.477z\
                M267.717,360.866 264.845,332.807 220.179,360.866z\
                M167.184,266.775 247.705,207.524 176.95,171.421z\
                M157.551,360.866 192.975,360.866 256.447,320.996 165.218,286.021z\
                M141.262,374.366 141.262,397.935 161.396,397.935 161.396,425.268 179.197,425.268 179.197,397.935\
                246.07,397.935 246.07,425.268 263.872,425.268 263.872,397.935 284.006,397.935 284.006,374.366z";

            Icons.oil =
                "F M190.761,109.999c-3.576-9.132-8.076-22.535,7.609-37.755c0.646,13.375,14.067,13.99,11.351,36.794\
                c6.231-2.137,6.231-2.137,9.188-3.781c17.285-9.612,20.39-25.205,7.64-42.896c-7.316-10.153-11.945-20.58-10.927-33.23\
                c-4.207,4.269-5.394,9.444-6.744,17.129c-5.116-3.688,3.067-41.28-22.595-46.26c5.362,13.836,7.564,25.758-2.607,40.076\
                c-0.667-5.422-3.255-12.263-8.834-17.183c-0.945,16.386,0.97,23.368-9.507,44.682c-2.945,8.902-5.02,17.635,0.533,26.418\
                C171.354,102.673,180.555,108.205,190.761,109.999z\
                M330.738,371.614h-15.835v-61.829l-74.409-78.541v-21.516c0-6.073-4.477-11.087-10.309-11.957v-82.156h-63.632v82.156\
                c-5.831,0.869-10.308,5.883-10.308,11.957v21.516l-74.409,78.541v61.829H66l-25.124,25.123h314.984L330.738,371.614z\
                M166.554,371.614h-61.717v-29.782h61.717V371.614z M166.554,319.956h-61.717v-1.007l51.471-54.329\
                c0.555,5.513,4.813,9.919,10.246,10.729V319.956L166.554,319.956z M291.903,371.614h-61.718v-29.782h61.718V371.614z\
                M291.903,319.956h-61.718V275.35c5.435-0.811,9.691-5.217,10.246-10.729l51.472,54.329V319.956z"

            Icons.pyrolysis =
                "F M226.46,198.625v-75.5h-87.936v-19.391h-14.304V92.319h-5.079l-3.724-82.777H91.766l-3.724,82.777h-6.18v11.415H68.535\
                V92.319h-5.079L59.731,9.542H36.08l-3.724,82.777h-6.18v11.415H11.872v94.891H0v35.167h243.333v-35.167H226.46z M61.355,191.792h-28\
                v-69.333h28V191.792z M117.041,191.792h-28v-69.333h28V191.792z M168.46,198.625h-29.936v-17.5h29.936V198.625z M206.46,198.625h-18\
                v-37.5h-49.936v-18h67.936V198.625z";

            Icons.fractionation =
                "F M224.609,218.045l-5.24-173.376h9.172V18.297h-9.969L218.019,0h-32.956l-0.553,18.297h-9.969v26.372h9.171l-2.475,81.878\
                h-39.196l-1.833-52.987h8.998V47.188h-9.91l-0.633-18.297h-32.913l-0.633,18.297h-9.911V73.56h8.999l-1.833,52.987H62.081\
                l-0.974-24.097h8.767V76.079h-9.833l-0.74-18.298H26.446l-0.739,18.298h-9.832v26.371h8.766L19.97,218.045H3.041v26.371h238.333\
                v-26.371z  M144.536,198.667h34.522l-0.586,19.378h-33.267L144.536,198.667z M143.624,172.296l-0.67-19.378h37.487\
                l-0.586,19.378H143.624z M100.792,172.296H63.93l-0.783-19.378h38.315L100.792,172.296z M99.88,198.667l-0.67,19.378h-33.43\
                l-0.783-19.378H99.88z";

            Icons.gasprocessing =
                "F M242.179,212.635V58.634h-80.936v40.877h-13.465l-1.351-33.828h5.284V45.247h-6.1l-0.415-10.382h6.515V14.431h-46.927\
              v20.435h6.515l-0.415,10.382h-6.1v20.436h5.284l-2.8,70.125H96.186V95.007H10.642v117.628H0v25.755h252.82v-25.755H242.179z\
              M73.501,135.808H51.714v76.827H33.327v-94.942h40.174V135.808z M137.797,213.516h-19.099v-88h19.099V213.516z M219.494,212.635\
              h-18.316v-51.411h18.316V212.635z M219.494,138.539h-18.316V99.511h-17.25V81.319h35.566V138.539z";

            Icons.polymerization =
                "F M399.748,237.029 L363.965,174.401 345.094,174.401 343.113,155.463 326.566,155.463 322.797,29.385 290.486,29.385\
                286.715,155.463 270.17,155.463 261.634,237.029 242.029,237.029 242.029,190.314 192.029,190.314 192.029,230.587 109.84,187.329\
                109.84,230.486 27.84,187.329 27.84,237.029 0,237.029 0,394.674 424.059,394.674 424.059,237.029z";

            Icons.finishedgas =
                "F M422.504,346.229v-68.306h-16.678v-24.856c0-21.863-16.199-39.935-37.254-42.882v-0.798\
                c0-26.702-21.723-48.426-48.426-48.426h-1.609c-26.699,0-48.426,21.724-48.426,48.426v87.633h-23.641v-93.169\
                c0-6.083-3.248-11.394-8.096-14.333c5.662-1.667,9.799-6.896,9.799-13.098c0-7.544-6.117-13.661-13.662-13.661h-10.981v-12.727h-17\
                v12.727h-10.984c-7.545,0-13.66,6.116-13.66,13.661c0,6.202,4.137,11.431,9.799,13.098c-4.848,2.94-8.098,8.25-8.098,14.333v93.169\
                h-23v-85.596c0-4.458-3.613-8.071-8.07-8.071h-16.412v-87.591c0-16.03-13.041-29.071-29.07-29.071v-1.267\
                c0-23.608-19.139-42.748-42.748-42.748S21.54,61.817,21.54,85.425v260.805H0v55.139h444.045v-55.139H422.504z M286.256,209.387\
                c0-17.801,14.48-32.284,32.281-32.284h1.609c17.803,0,32.285,14.483,32.285,32.284v1.559\
                c-19.059,4.545-33.232,21.673-33.232,42.124v24.855h-16.676v19.098h-16.27v-87.635H286.256z M302.525,313.162v33.067h-16.27\
                v-33.067H302.525z M270.113,313.162v33.067h-23.641v-33.067H270.113z M144.447,219.496v85.596c0,4.458,3.613,8.071,8.07,8.071\
                h31.07v33.068h-47.482V219.496H144.447z M107.035,102.834c7.129,0,12.93,5.8,12.93,12.929v87.591h-12.93V102.834z M107.035,219.496\
                h12.93v126.733h-12.93V219.496z";

            let IconNames = [];
            for (let n in Icons) IconNames.push(n);

            // A data binding conversion function. Given a name, return the Geometry.
            // If there is only a string, replace it with a Geometry object, which can be shared by multiple Shapes.
            function geoFunc(geoname) {
                let geo = Icons[geoname];
                if (typeof geo === "string") {
                    geo = Icons[geoname] = go.Geometry.parse(geo, true);
                }
                return geo;
            }

            // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
            // For details, see https://gojs.net/latest/intro/buildingObjects.html
            // 初始化
            const $ = go.GraphObject.make;  // for conciseness in defining templates
            myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
                {
                    initialAutoScale: go.Diagram.Uniform,  // scale to show all of the contents
                    "ChangedSelection": onSelectionChanged, // 选中元素
                    "draggingTool.gridSnapCellSize": new go.Size(10, 1),
                    "draggingTool.isGridSnapEnabled": true,
                    "undoManager.isEnabled": true, // 撤销管理器
                    "ModelChanged": e => {     // just for demonstration purposes,
                        if (e.isTransactionFinished) {  // show the model data in the page's TextArea
                            document.getElementById("mySavedModel").textContent = e.model.toJson();
                        }
                    }
                });

            myDiagram.nodeTemplate =
                $(go.Node, "Spot",
                    {
                        locationObjectName: "PORT",
                        locationSpot: go.Spot.Top,  // location point is the middle top of the PORT
                        linkConnected: updatePortHeight,
                        linkDisconnected: updatePortHeight,
                        // 去掉toolTip
                        // toolTip:
                        //     $("ToolTip",
                        //         $(go.TextBlock, { margin: 4, width: 140 },
                        //             new go.Binding("text", "", data => data.text + ":\n\n" + data.description))
                        //     )
                    },
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                    // The main element of the Spot panel is a vertical panel housing an optional icon,
                    // plus a rectangle that acts as the port
                    $(go.Panel, "Vertical",
                        $(go.Shape,
                            {
                                width: 40, height: 0,
                                stroke: null, strokeWidth: 0, fill: "gray"
                            },
                            new go.Binding("height", "icon", () => 40),
                            new go.Binding("fill", "color", colorFunc),
                            new go.Binding("geometry", "icon", geoFunc)),
                        $(go.Shape,
                            {
                                name: "PORT",
                                width: 40, height: 24, margin: new go.Margin(-1, 0, 0, 0),
                                stroke: null, strokeWidth: 0, fill: "gray",
                                portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true
                            },
                            new go.Binding("fill", "color", colorFunc)),
                        $(go.TextBlock,
                            {
                                font: "Bold 14px Lato, sans-serif",
                                textAlign: "center",
                                margin: 3,
                                maxSize: new go.Size(100, NaN),
                                alignment: go.Spot.Top,
                                alignmentFocus: go.Spot.Bottom,
                                editable: true
                            },
                            new go.Binding("text").makeTwoWay())
                    )
                );

            function updatePortHeight(node, link, port) {
                let sideinputs = 0;
                let sideoutputs = 0;
                node.findLinksConnected().each(l => {
                    if (l.toNode === node && l.toSpot === go.Spot.LeftSide) sideinputs++;
                    if (l.fromNode === node && l.fromSpot === go.Spot.RightSide) sideoutputs++;
                });
                let tot = Math.max(sideinputs, sideoutputs);
                tot = Math.max(1, Math.min(tot, 2));
                port.height = tot * (10+2) + 2;  // where 10 is the link path's strokeWidth
            }

            myDiagram.linkTemplate =
                $(go.Link,
                    {
                        layerName: "Background",
                        routing: go.Link.Orthogonal,
                        corner: 15,
                        reshapable: true,
                        resegmentable: true,
                        fromSpot: go.Spot.RightSide,
                        toSpot: go.Spot.LeftSide
                    },
                    // make sure links come in from the proper direction and go out appropriately
                    new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
                    new go.Binding("toSpot", "toSpot", go.Spot.parse),
                    new go.Binding("points").makeTwoWay(),
                    // mark each Shape to get the link geometry with isPanelMain: true
                    $(go.Shape, { isPanelMain: true, stroke: "gray", strokeWidth: 10 },
                        // get the default stroke color from the fromNode
                        new go.Binding("stroke", "fromNode", n => go.Brush.lighten((n && Colors[n.data.color]) || "gray")).ofObject(),
                        // but use the link's data.color if it is set
                        new go.Binding("stroke", "color", colorFunc)),
                    $(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [20, 40] })
                );

            let SpotNames = ["Top", "Left", "Right", "Bottom", "TopSide", "LeftSide", "RightSide", "BottomSide"];

            myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").textContent);

            // show a collection of node types that the designer may drag into the main diagram
            let myPalette =
                $(go.Palette, "myPaletteDiv",
                    {
                        layout: $(go.GridLayout, { cellSize: new go.Size(1, 1) }),
                        initialContentAlignment: go.Spot.TopLeft,
                        initialScale: 0.8,
                        nodeTemplate: myDiagram.nodeTemplate,  // shared with the main Diagram
                        model: new go.GraphLinksModel(
                            {
                                nodeDataArray: [
                                    { "icon":"natgas", "text":"Gas\nCompanies" },
                                    { "icon":"oil", "text":"Oil\nCompanies" },
                                    { "icon":"gasprocessing", "text":"Gas Processing" },
                                    { "icon":"fractionation", "text":"Gas Fractionation" },
                                    { "icon":"pyrolysis", "text":"Pyrolysis (Cracking)" },
                                    { "icon":"polymerization", "text":"Basic Polymers" },
                                    { "text":"Intermediates" },
                                    { "icon":"finishedgas", "text":"LPG, Naphtha,\nMTBE" }
                                ]  // end nodeDataArray
                            })  // end model
                    });  // end Palette

            function onSelectionChanged() {
                let node = myDiagram.selection.first();
                console.log(node)
                if (!node) return
                const data = node.data;
                console.log(data)
            }

            // init end
        },
    },
}
</script>

<style scoped>
.process {
    width: 100%;
    height: calc(100% - 46px);
    display: flex;
    flex-direction: column;
}
</style>
