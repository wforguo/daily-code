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

// 自动创建 HTML 模板供 Webpack 打包结果使用，包括文件名称 模板参数 meta 标签配置 压缩等等。SPA 与 MPA 都会使用到。
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 是否是本地开发环境
const _DEV_ = process.env === 'development';

module.exports = {
    devtool: "inline-source-map",
    mode: 'production',
    // 默认打包出来是main.js
    entry: ['babel-polyfill', path.resolve(__dirname, '../src/app.js')],
    output: {
        // path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[contenthash:8].js",
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
        new HtmlWebpackPlugin({
            title: 'WebPack',
            template: path.resolve(__dirname, "../public/index.html"),
            filename: "index.html",
            inject: true, // 是否自动引入资源
            icon: path.join(__dirname, "../public/favicon.ico"),
            minify: _DEV_ ? false : {
                // collapseWhitespace: true,
                // collapseBooleanAttributes: true,
                // collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                useShortDoctype: true,
            }
        }),
        new CleanWebpackPlugin(), // outputPath
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:7].css'
        }),
    ]
}
