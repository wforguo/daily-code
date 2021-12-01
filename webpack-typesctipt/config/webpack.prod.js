/**
 * @Author: forguo
 * @Date: 2021/11/14 22:13
 * @Description: production
 */
const path = require("path");

module.exports = {
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, '../src/app.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[chunkhash:6].js",
        publicPath: '/',
    }
}
