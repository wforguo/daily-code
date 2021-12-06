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
    entry: ['babel-polyfill', path.resolve(__dirname, '../src/app.js')],
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
                // https://www.dengwb.com/typescript/project/compile-tools.html#ts-loader
                test: /\.tsx?$/, // 检测ts或者tsx文件
                use: {
                    loader: 'ts-loader',
                    options: {
                        // 忽略类型检查，提高编译速度
                        transpileOnly: true
                    }
                },
            },
            {
                // 从下往下编译的，所以css-loader在下
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        // css前缀，处理兼容性
                        loader: 'postcss-loader',
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // outputPath
    ]
}
