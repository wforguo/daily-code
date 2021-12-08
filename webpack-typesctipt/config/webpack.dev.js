/**
 * @Author: forguo
 * @Date: 2021/11/14 22:13
 * @Description: development
 */
const path = require("path");
const domain = require("./domainConfig");
const env = domain.env;

module.exports = {
    mode: 'development',
    devtool: "inline-source-map",
    output: {
        filename: "js/[name].[hash].js",
    },
    devServer: {
        open: 'Google Chrome', // 可以使用Boolean或者指定浏览器
        port: 10086, // 服务端口
        hot: true, // 热更新 --> live reloading【浏览器会刷新】
        hotOnly: true, // 只使用热更新，不使用 live reloading
        host: '0.0.0.0', // 服务地址
        noInfo: true, // 禁止显示诸如 Webpack 捆绑包信息之类的消息
        historyApiFallback: true, // 路径重定向
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
    }
}
