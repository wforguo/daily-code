/**
 * html-webpack-plugin 的作用是：当使用 webpack打包时，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCdnPlugin = require('webpack-cdn-plugin')
// 友好的进度条
const WebpackBar = require('webpackbar')

const { name: title } = require('./package.json')
const BASE_URL = process.env.NODE_ENV === 'production' ? `/daily-code/${title}` : '' // Vue 打包性能
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 代码压缩
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-MM-DD HH:mm:ss')
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

let plugins = [
    new HtmlWebpackPlugin({
        title,
        template: 'public/index.html',
        inject: true
    })
]

if (process.env.NODE_ENV === 'production') {
    plugins = [...plugins, ...[new WebpackCdnPlugin(cdnLoader(true))]]
}
module.exports = {
    configureWebpack: {
        // 配置微应用的打包工具
        output: {
            library: `${title}-[name]`,
            libraryTarget: 'umd', // 把微应用打包成 umd 库格式
            jsonpFunction: `webpackJsonp_${title}`
        },
        plugins: [...plugins]
    },
    productionSourceMap: true,
    // 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
    lintOnSave: 'warning',
    chainWebpack: config => {
        // // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // // 移除 preload 插件
        config.plugins.delete('preload')

        if (process.env.NODE_ENV === 'production') {
            config.output.filename('js/[name].[contenthash:8].js')
            config.output.chunkFilename('js/[name].[contenthash:8].js')
            config.plugin('extract-css').tap(() => [
                {
                    filename: 'css/[name].[contenthash:8].css',
                    chunkFilename: 'css/[name].[contenthash:8].css'
                }
            ])
            config.plugin('webpackBar').use(WebpackBar)
            config.optimization.splitChunks({
                name: true,
                chunks: 'all',
                minSize: 10000, // 大于10kb，再去提取
                cacheGroups: {
                    // 公共资源的打包
                    common: {
                        name: 'common',
                        chunks: 'all',
                        minChunks: 2,
                        enforce: true,
                        priority: 5
                    },
                    // 第三方包
                    vendor: {
                        name: 'vendor',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        enforce: true,
                        priority: 10
                    }
                }
            })
            // 运行时，webpack配置文件
            // runtimeChunk: true,
            config.optimization.runtimeChunk({
                name: 'manifest'
            })
        }
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        port: '10087'
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
    publicPath: BASE_URL,
    outputDir: `../../dist/${title}/`
}
