/**
 * @Author: forguo
 * @Date: 2022/3/23 15:45
 * @Description: webpack.prod
 */
const path = require('path');
const webpack = require("webpack");

// 在每次 build 后移除你的dist目录（可配置），默认情况下它会读取 webpack 配置的output.path。
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 用于将静态文件拷贝到你的输出目录下，有时一些文件并没有适用的 loader 或者是不需要经过处理，原样复制的文件。
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const htmlWebpackAddStaticServer = require("./plugin/html-webpack-add-static-server");

// 拼接路径
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    mode: 'production',
    stats: {
        all: false,
        hash: true,
        colors: true,
        timings: true,
        version: true,
        builtAt: true,
        assets: true,
    },
    // use source-map for production:
    devtool: false,
    plugins:[
        // 清除上次打包的代码
        new CleanWebpackPlugin(),
        // Dll优化
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(resolve('../static/lodash.manifest.json')), // manifest的位置
        }),
        // 拷贝dll资源
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: resolve("../static/js"),
        //             to: resolve( "../dist/js"),
        //         },
        //     ],
        // }),
        // 添加dll文件到html
        new AddAssetHtmlPlugin({
            filepath: resolve('../static/dll/lodash.js'),
            outputPath: 'js/',
            publicPath: 'js/',
        }),
        // 自定义plugin
        // new htmlWebpackAddStaticServer(),
        // 打包结果分析
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: 'report.html'
        }),
    ],
}
