/**
 * @Author: forguo
 * @Date: 2021/11/14 22:13
 * @Description: development
 */
const path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, '../src/app.js')
    },
    output: {
        filename: '../js/[name].[hash:6].js',
    }
}
