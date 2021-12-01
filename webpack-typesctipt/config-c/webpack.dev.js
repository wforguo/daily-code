/**
 * @Description: webpack.prod.配置
 * @author: forguo
 * @date: 2020/9/1
 */
const { merge } = require('webpack-merge');
const webpack = require("webpack");
const path = require("path");
const ip = require("ip");

// 友好的错误提示
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common.js');
const domain = require('./domainConfig');
const environmental = domain.env;

console.log(ip.address());

module.exports = merge(common, {
    mode: 'development',
    stats: {
        all: false,
    },
    devtool: "inline-source-map",
    output: {
        filename: "js/[name].[hash].js",
    },
    devServer: {
        open: false,
        // open: 'Google Chrome',
        contentBase: path.resolve(__dirname, "../dist"),
        port: 9010,
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        host: ip.address() || '0.0.0.0',
        noInfo: true, // 禁止显示诸如 Webpack 捆绑包信息之类的消息
        // useLocalIp: true,
        proxy: {
            '/api/*': {
                target: domain[environmental].api,
                changeOrigin: true,
                pathRewrite: {'^/api': '/api'}
            },
            '/wx/*': {
                target: 'https://dtapi.zcrubber.com',
                changeOrigin: true,
                pathRewrite: {'^/wx': '/api'}
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`App running at:\n- Local:   http://localhost:9010\n- Network: http://${ip.address()}:9010`],
            }
        }),
    ],
});
