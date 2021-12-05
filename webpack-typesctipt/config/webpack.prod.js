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
    },
    output: {
        // path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[hash:8].js",
        // publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 检测js文件
                use: {
                    loader: "babel-loader", // 使用babel-loader
                }
            },
            {
                test: /\.tsx?$/, // 检测ts或者tsx文件
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // outputPath
    ]
}
