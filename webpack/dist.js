/**
 * @Author: forguo
 * @Date: 2021/12/11 23:14
 * @Description: 打包结果代码分析
 */
(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/            i: moduleId,
            /******/            l: false,
            /******/            exports: {}
            /******/
        };
        /******/
        /******/ 		// Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
    }

    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = 0);
})({
    // 入库文件
    "./src/app.js": (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__("./src/css/app.less");
    }),
    // less处理
    "./src/css/app.less": (function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        // extracted by mini-css-extract-plugin
    }),
    // 多入口文件app.js
    0:(function(module, exports, __webpack_require__) {
        eval("__webpack_require__(/*! babel-polyfill */\"./node_modules/babel-polyfill/lib/index.js\");\n" +
            "module.exports = __webpack_require__(\"./src/app.js\");");
    })
})
