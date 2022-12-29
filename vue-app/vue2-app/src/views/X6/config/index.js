/**
 * @Author: forguo
 * @Date: 2022/12/17 16:04
 * @Description: 流程图配置
 */

import { Shape } from '@antv/x6'
/**
 * @desc 初始化面板配置
 * @param check 查看模式
 */
export const graphOptions = (check = false) => {
    return {
        container: document.getElementById('container'),
        // 定制节点和边的交互行为 ==> boolean 节点或边是否可交互
        interacting: check
            ? {
                  nodeMovable: false,
                  edgeMovable: false,
                  magnetConnectable: false,
                  vertexDeletable: false
              }
            : true,
        // 对齐线
        snapline: true,
        // 撤销/重做
        history: !check,
        // 点选/框选
        selecting: {
            enabled: true,
            multiple: !check, // 多选【开启】
            rubberband: false // 启用框选【关闭】
        },
        // 显示网格 // 'dot' | 'fixedDot' | 'mesh'
        grid: {
            visible: true,
            size: 20, // 网格大小
            type: 'mesh',
            args: {
                color: '#e9e9e9',
                thickness: 2 // 网格线宽度/网格点大小
            }
        },
        // 滚动
        scroller: {
            enabled: true,
            pageVisible: false, // 是否分页
            pageBreak: false,
            pannable: true // 是否平移
        },
        // 滚轮缩放 MouseWheel
        mousewheel: {
            enabled: true,
            zoomAtMousePosition: true,
            modifiers: ['ctrl', 'meta'],
            maxScale: 3,
            minScale: 0.3
        },
        // 连线规则
        connecting: {
            // 路由类型
            router: {
                // 连线类型在此修改
                // 曼哈顿路由 'manhattan' 路由是正交路由 'orth' 的智能版本，该路由由水平或垂直的正交线段组成，并自动避开路径上的其他节点（障碍）。
                name: 'manhattan',
                args: {
                    padding: 1
                }
            },
            // 圆角连接器，将起点、路由点、终点通过直线按顺序连接，并在线段连接处通过圆弧连接（倒圆角）。
            connector: {
                name: 'rounded',
                args: {
                    radius: 8
                }
            },
            anchor: 'center',
            connectionPoint: 'anchor',
            // 是否允许连接到画布空白位置的点，默认为 true。
            allowBlank: false,
            // 距离节点或者连接桩 20px 时会触发自动吸附
            snap: {
                radius: 20
            },
            // 拽出新的边
            createEdge() {
                return new Shape.Edge({
                    markup: [
                        {
                            tagName: 'path',
                            selector: 'stroke'
                        }
                    ],
                    connector: { name: 'rounded' },
                    attrs: {
                        stroke: {
                            fill: 'none',
                            connection: true,
                            strokeWidth: 4,
                            strokeLinecap: 'round',
                            stroke: '#666'
                        }
                    },
                    zIndex: 0
                })
            },
            validateConnection({ targetMagnet }) {
                return !!targetMagnet
            }
        },
        // 连线高亮
        highlighting: {
            // 连线过程中，自动吸附到链接桩时被使用。
            magnetAdsorbed: {
                name: 'stroke',
                args: {
                    attrs: {
                        width: 12,
                        r: 6,
                        magnet: true,
                        stroke: '#008CFF',
                        strokeWidth: 2,
                        fill: '#0F67FF'
                    }
                }
            }
        },
        // 修改大小
        resizing: check
            ? false
            : {
                  enabled: true,
                  minWidth: 64, // 最小宽
                  maxWidth: 64 * 2, // 最大宽
                  minHeight: 105 / 2, // 最小高
                  maxHeight: 105 * 2, // 最大高
                  orthogonal: true, // 是否显示中间调整点，默认为 true
                  restricted: false, // 调整大小边界是否可以超出画布边缘
                  preserveAspectRatio: true // 调整大小过程中是否保持节点的宽高比例
              },
        rotating: false, // 不能旋转
        keyboard: !check, // 按键操作
        clipboard: !check, // 剪切板
        autoResize: true,
        onToolItemCreated({ tool }) {
            const options = tool.options
            if (options && options.index % 2 === 1) {
                tool.setAttrs({ fill: 'red' })
            }
        }
    }
}

// 链接桩样式
export const portStyle = {
    width: 12,
    r: 6, // 半径
    // 当 magnet 属性为 true 时，表示该元素可以被链接，即在连线过程中可以被当做连线的起点或终点，与链接桩类似。
    magnet: true,
    stroke: '#008CFF',
    strokeWidth: 2,
    fill: '#fff',
    zIndex: 1
}

// 链接桩配置
export const ports = {
    // 设置链接桩分组
    groups: {
        top: {
            // 定义连接柱的位置，如果不配置，将显示为默认样式
            position: 'top',
            // 定义连接柱的样式
            attrs: {
                circle: {
                    ...portStyle
                }
            }
        },
        right: {
            position: 'right',
            attrs: {
                circle: {
                    ...portStyle
                }
            }
        },
        bottom: {
            position: 'bottom',
            attrs: {
                circle: {
                    ...portStyle
                }
            }
        },
        left: {
            position: 'left',
            attrs: {
                circle: {
                    ...portStyle
                }
            }
        },
        absolute: {
            position: 'absolute',
            attrs: {
                circle: {
                    r: 6,
                    magnet: true,
                    stroke: '#008CFF',
                    strokeWidth: 2,
                    fill: '#fff'
                }
            }
        }
    },
    // 链接桩
    items: [
        {
            group: 'top'
        },
        {
            group: 'right'
        },
        {
            group: 'bottom'
        },
        {
            group: 'left'
        }
    ]
}

// 自定义节点的名称
export const SETTING_SHAPE_NAME = 'setting-shape'

// 动态计算宽高比
export const transformToPercent = (target, sum, font) => {
    // https://x6.antv.vision/zh/docs/tutorial/intermediate/attrs
    // 相对节点的大小
    const percent = (target / sum).toFixed(2) * 100
    return `${percent}${font ? 'px' : '%'}`
}

// 自定义对象节点的配置，需要展示更多的节点内容在这里去添加，并更新数据
// https://x6.antv.vision/zh/docs/tutorial/intermediate/custom-node
export const SettingNodeOptions = {
    inherit: 'rect',
    width: 64,
    height: 64,
    markup: [
        {
            tagName: 'rect',
            selector: 'body'
        },
        {
            tagName: 'image',
            selector: 'settingImage'
        },
        {
            tagName: 'text',
            selector: 'settingName'
        }
    ],
    attrs: {
        body: {
            class: SETTING_SHAPE_NAME,
            stroke: '#5F95FF',
            fill: '#5F95FF',
            strokeWidth: 2,
            fillOpacity: 0.75
        },
        settingImage: {
            refWidth: transformToPercent(32, 64),
            refHeight: transformToPercent(32, 64),
            refX: transformToPercent(16, 64),
            refY: transformToPercent(8, 64),
            textAnchor: 'middle',
            textVerticalAnchor: 'bottom',
            anchor: 'middle',
            verticalAnchor: 'bottom'
        },
        settingName: {
            refWidth: '100%',
            refX: transformToPercent(32, 64),
            refY: transformToPercent(60, 64),
            textAnchor: 'middle',
            textVerticalAnchor: 'bottom',
            fontSize: 12,
            fill: '#262626'
            // 超出换行
            // textWrap: {
            //     width: 64,
            //     breakWord: false, // 是否截断单词
            // },
        }
    },
    ports: { ...ports }
}

export const colors = ['#2AC94F', '#0AAEFF', '#DB5A6B', '#057748', '#2E4E7E', '#845A33']
