/**
 * @Author: forguo
 * @Date: 2022/4/3 10:45
 * @Description: webpack.dll.js
 */

const path = require('path');
const webpack = require('webpack');

// 在每次 build 后移除你的dist目录（可配置），默认情况下它会读取 webpack 配置的output.path。
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 拼接路径
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    mode: 'none',
    entry: {
        lodash: ['lodash'],
    },
    output: {
        // 打包后的路径
        path: resolve('../static/dll'),
        // chunkFilename: '[name].js',
        filename: '[name].js',
        library: '[name]', // 引用名
    },
    plugins: [
        // 清除上次打包的代码
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: resolve('../static/[name].manifest.json'),
            name: '[name]',
            context: __dirname,
        })
    ]
}
