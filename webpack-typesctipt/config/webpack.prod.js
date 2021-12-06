/**
 * @Author: forguo
 * @Date: 2021/11/14 22:13
 * @Description: production
 */
const path = require("path");

// 在每次 build 后移除你的dist目录（可配置），默认情况下它会读取 webpack 配置的output.path。
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// css打包提取为单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: "inline-source-map",
    mode: 'production',
    // 默认打包出来是main.js
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
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // outputPath
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css'
        }),
    ]
}
