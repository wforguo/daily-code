/**
 * @Description: webpack.prod.配置
 * @author: forguo
 * @date: 2020/9/1
*/
const { merge } = require('webpack-merge');

// 打包版权声明
const { BannerPlugin } = require('webpack');
const common = require('./webpack.common');

// 在每次 build 后移除你的dist目录（可配置），默认情况下它会读取 webpack 配置的output.path。
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm

// JavaScript 压缩
const TerserWebpackPlugin = require('terser-webpack-plugin');

// 优化 & 压缩 CSS 文件，可以选择使用的 CSS 预处理器（默认是cssnano）
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// 友好的进度条
const WebpackBar = require('webpackbar');

const { name } = require('../package');

module.exports = merge(common, {
    mode: 'production',
    stats: {
        all: false,
        hash: true,
        colors: true,
        timings: true,
        version: true,
        builtAt: true
    },
    plugins: [
        new CleanWebpackPlugin(), // outputPath
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
        }),
        new HardSourceWebpackPlugin(),
        new WebpackBar({
            name: name || 'WebPack'
        }),
        new BannerPlugin({
            raw: true,
            banner: `/** @preserve Powered by zc-rubber author forguo.cn */`,
        }),
    ],
    optimization: {
        mergeDuplicateChunks: true,
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true,
                cache: true
            }),
        ],
        splitChunks: {
            minSize: 0,
            chunks: "all",
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minChunks: 1,
                    reuseExistingChunk : true,
                    priority: -10,
                },
                commons: {
                    test: /[\\/]src[\\/]/,
                    name: 'commons',
                    minChunks: 2,
                    reuseExistingChunk : true,
                    priority: -20
                },
                default: {
                    minChunks: 2,
                    name: 'default',
                    reuseExistingChunk: true,
                    priority: -30
                }
            }
        }
    }
});

