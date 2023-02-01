/**
 * @Author: forguo
 * @Date: 2023/1/16 14:59
 * @Description: 弹窗工具
 */

import BaseEvent from './BaseEvent'
import * as Cesium from 'cesium'

const CesiumPopupUtil = (function () {
    let _panelContainer = null
    let _contentContainer = null
    let _closeBtn = null

    let _renderListener = null
    let _viewer = null

    class CesiumPopup extends BaseEvent {
        constructor(options = {}) {
            super()
            this.className = options['className'] || ''
            this.title = options['title'] || ''
            this.offset = options['offset'] || [0, 0]
            this.isVisible = true //默认显示
            // this.render = this.render.bind(this)
            this.closeHandler = this.closeHandler.bind(this)
        }

        /**
         * 初始化面板
         */
        initPanel() {
            const closeBtnIcon =
                '<svg t="1603334792546" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1328" width="32" height="32"><path d="M568.922 508.232L868.29 208.807a39.139 39.139 0 0 0 0-55.145l-1.64-1.64a39.139 39.139 0 0 0-55.09 0l-299.367 299.82-299.425-299.934a39.139 39.139 0 0 0-55.088 0l-1.697 1.64a38.46 38.46 0 0 0 0 55.09l299.48 299.594-299.424 299.48a39.139 39.139 0 0 0 0 55.09l1.64 1.696a39.139 39.139 0 0 0 55.09 0l299.424-299.48L811.56 864.441a39.139 39.139 0 0 0 55.089 0l1.696-1.64a39.139 39.139 0 0 0 0-55.09l-299.48-299.537z" p-id="1329"></path></svg>'

            _panelContainer = document.createElement('div')
            _panelContainer.classList.add('cesium-popup-panel')
            if (this.className && this.className !== '') {
                _panelContainer.classList.add(this.className)
            }

            _closeBtn = document.createElement('div')
            _closeBtn.classList.add('cesium-popup-close-btn')

            _closeBtn.innerHTML = closeBtnIcon

            // header container
            let headerContainer = document.createElement('div')
            headerContainer.classList.add('cesium-popup-header-panel')

            this.headerTitle = document.createElement('div')
            this.headerTitle.classList.add('cesium-popup-header-title')
            this.headerTitle.innerHTML = this.title

            headerContainer.appendChild(this.headerTitle)
            _panelContainer.appendChild(_closeBtn)

            _panelContainer.appendChild(headerContainer)

            // content container

            _contentContainer = document.createElement('div')
            _contentContainer.classList.add('cesium-popup-content-panel')
            _contentContainer.innerHTML = this.content

            _panelContainer.appendChild(_contentContainer)

            //tip container
            let tipContaienr = document.createElement('div')
            tipContaienr.classList.add('cesium-popup-tip-panel')

            let tipDiv = document.createElement('div')
            tipDiv.classList.add('cesium-popup-tip-bottom')

            tipContaienr.appendChild(tipDiv)

            _panelContainer.appendChild(tipContaienr)

            _panelContainer.style.display = 'none'
            // _panelContainer.style.visibility = "hidden";

            // add to Viewer Container
            _viewer.cesiumWidget.container.appendChild(_panelContainer)
            this.emit('open')
        }

        /**
         * 添加到viewer中
         * @param viewer
         * @return {CesiumPopup}
         */
        addTo(viewer) {
            if (_viewer) this.remove()
            _viewer = viewer
            this.initPanel()
            //关闭按钮
            _closeBtn.addEventListener('click', this.closeHandler, false)
            if (this.position) {
                _panelContainer.style.display = 'block'
                // _panelContainer.style.visibility = "visible";

                _renderListener = _viewer.scene.postRender.addEventListener(this.render, this)
            }

            return this
        }

        /**
         * 释放dom
         */
        remove() {
            _closeBtn.removeEventListener('click', this.closeHandler, false)

            if (_closeBtn) {
                _closeBtn.parentNode.removeChild(_closeBtn)
                _closeBtn = null
            }

            if (_contentContainer) {
                _contentContainer.parentNode.removeChild(_contentContainer)
                _contentContainer = null
            }

            if (_panelContainer) {
                _panelContainer.parentNode.removeChild(_panelContainer)
                _panelContainer = null
            }

            if (_renderListener) {
                _renderListener()
                _renderListener = null
            }

            if (_viewer) {
                _viewer = null
            }
            this.emit('close')
        }

        /**
         * 设置弹窗坐标
         * @param cartesian3 {Cesium.Cartesian3}
         * @return {CesiumPopup}
         */
        setPosition(cartesian3) {
            if (_panelContainer) {
                if (!cartesian3) {
                    _panelContainer.style.display = 'none'
                } else {
                    _panelContainer.style.display = 'block'
                }
            }
            this.position = cartesian3

            return this
        }

        /**
         * 添加类名
         * @param className
         * @return {CesiumPopup}
         */
        addClass(className) {
            if (_panelContainer) {
                _panelContainer.classList.add(className)
            }
            return this
        }

        /**
         * 移除类名
         * @param className
         * @return {CesiumPopup}
         */
        removeClass(className) {
            if (_panelContainer) {
                _panelContainer.classList.remove(className)
            }
            return this
        }

        /**
         * 设置弹窗名称
         * @param title
         * @return {CesiumPopup}
         */
        setTitle(title) {
            if (this.headerTitle) {
                this.headerTitle.innerHTML = title
            }
            this.title = title
            return this
        }
        /**
         * 设置弹窗偏移量
         * @param title
         * @return {CesiumPopup}
         */
        setOffset(offset) {
            this.offset = offset
            return this
        }
        closeHandler() {
            this.remove()
        }

        /**
         * 弹窗是否开启
         * @return {boolean}
         */
        isOpen() {
            return _panelContainer ? true : false
        }

        /**
         * 设置弹窗内容
         * @param html{HTML}
         * @return {CesiumPopup}
         */
        setHTML(html) {
            if (_contentContainer) {
                _contentContainer.innerHTML = html
            }
            this.content = html
            return this
        }

        /**
         *
         * @param visible {Boolean}
         * @return {CesiumPopup}
         */
        setVisible(visible) {
            this.isVisible = visible
            if (_panelContainer) {
                _panelContainer.style.display = visible ? 'block' : 'none'
            }
            return this
        }

        /**
         * 渲染函数
         */
        render() {
            const geometry = this.position
            if (!geometry) return
            const position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(_viewer.scene, geometry)
            if (!position) {
                return
            }
            if (!this.isVisible) return
            //判断点是不是地球背面
            const panelVisible = new Cesium.EllipsoidalOccluder(
                Cesium.Ellipsoid.WGS84,
                _viewer.camera.position
            ).isPointVisible(this.position)
            if (_panelContainer) {
                //如果点再地球背面 隐藏panel
                _panelContainer.style.display = panelVisible ? 'block' : 'none'
                if (panelVisible) {
                    _panelContainer.style.left =
                        Math.round(position.x - _panelContainer.offsetWidth / 2 + this.offset[0]) + 'px'
                    _panelContainer.style.top =
                        Math.round(position.y - _panelContainer.offsetHeight - 10 + this.offset[1]) + 'px'
                }
            }
        }
    }
    return CesiumPopup
})()

export default CesiumPopupUtil
