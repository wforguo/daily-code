/**
 * @Author: forguo
 * @Date: 2021/11/14 22:13
 * @Description: production
 */
const path = require("path");

// 在每次 build 后移除你的dist目录（可配置），默认情况下它会读取 webpack 配置的output.path。
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm

module.exports = {
    mode: 'production',
    entry: {
        app: ['babel-polyfill', path.resolve(__dirname, '../src/app.js')],
        app2: ['babel-polyfill', path.resolve(__dirname, '../src/app2.js')],
    },
    output: {
        // path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[chunkhash:8].js",
        // publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 检测js
                use: {
                    loader: 'babel-loader', // 使用babel-loader
                    // 打包参数
                    options: {
                        // 存储JavaScript不同标准的插件
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // outputPath
    ]
}
