/**
 * @Author: forguo
 * @Date: 2021/11/14 22:13
 * @Description: development
 */
const path = require("path");

module.exports = {
    mode: 'development',
    devtool: "inline-source-map",
    output: {
        filename: "js/[name].[hash].js",
    },
}
