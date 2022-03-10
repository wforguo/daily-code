
/**
 * html-webpack-plugin 的作用是：当使用 webpack打包时，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const { name: title } = require('./package.json');
// Vue 打包性能
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 代码压缩
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version;

// 添加cdnLoader


const cdnLoader = (prod = false) => {
    return {
        modules: [
            // {
            //     name: 'axios',
            //     var: 'axios',
            //     path: 'axios.min.js'
            // },
            {
                name: 'vue',
                var: 'Vue',
                path: 'vue.runtime.min.js'
            },
            {
                name: 'vue-router',
                var: 'VueRouter',
                path: 'vue-router.min.js'
            }
        ],
        prod,
        publicPath: '/node_modules',
        prodUrl: '//cdn.staticfile.org/:name/:version/:path'
    }
}

module.exports = {
    configureWebpack: {
        plugins: [
            new HtmlWebpackPlugin({
                title,
                template: 'public/index.html',
                inject: true
            }),
            new WebpackCdnPlugin(cdnLoader(true))
        ]
    },
    productionSourceMap: false, // 去除上产source map
    lintOnSave: true, // 关掉eslint
    chainWebpack: config => {
        // // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        // // 移除 preload 插件
        config.plugins.delete('preload');
    },
    devServer: {
        port: '10086',
        // proxy: {
        //     '/api': {
        //         target: 'https://forguo.cn',
        //         ws: true,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': '/api'
        //         }
        //     }
        // }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? 'https://cloud-app.com.cn/apps/cloud-app-vue'
        : '/'
};
