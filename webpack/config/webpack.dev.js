/**
 * @Author: forguo
 * @Date: 2022/3/23 15:45
 * @Description: webpack.dev
 */

const path = require("path");
const webpack = require("webpack");

// 友好的错误提示
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ip = require("ip");

const domain = require("./domainConfig");
const env = domain.env;
const server_port = 10010;

module.exports = {
    mode: 'development',
    stats: {
        all: false,
    },
    //use inline-source-map for development:
    devtool: "inline-source-map",
    output: {
        filename: "js/[name].[hash].js",
    },
    devServer: {
        open: false, // 可以使用Boolean或者指定浏览器
        port: server_port, // 服务端口
        hot: true, // 热更新 --> live reloading【浏览器会刷新】
        hotOnly: true, // 只使用热更新，不使用 live reloading
        host: '0.0.0.0', // 服务地址
        noInfo: true, // 禁止显示诸如 Webpack 捆绑包信息之类的消息
        historyApiFallback: true, // 路径重定向
        contentBase: path.resolve(__dirname, "../dist"),
        /**
         * 设置代理配置【跨域】
         */
        proxy: {
            // 需要代理的地址
            '/api/*': {
                // 代理的目标地址
                target: domain[env].api,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                },
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`App running at:\n- Local:   http://localhost:${server_port}\n- Network: http://${ip.address()}:${server_port}`],
            }
        }),
    ],
}
