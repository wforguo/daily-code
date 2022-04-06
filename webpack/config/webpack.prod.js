/**
 * @Author: forguo
 * @Date: 2022/3/23 15:45
 * @Description: webpack.prod
 */
const path = require('path');

// 在每次 build 后移除你的dist目录（可配置），默认情况下它会读取 webpack 配置的output.path。
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    // use source-map for production:
    devtool: 'source-map',
    stats: {
        all: false,
        hash: true,
        colors: true,
        timings: true,
        version: true,
        builtAt: true,
        assets: true,
    },
    plugins:[
        // 清除上次打包的代码
        new CleanWebpackPlugin(),
    ],
}
