/**
 * @Author: forguo
 * @Date: 2022/3/23 13:56
 * @Description: webpack.config
 */
const path = require('path');
const chalk = require("chalk");
const webpack = require("webpack");

// merge配置合并
const { merge } = require('webpack-merge');

// Html编译
const HtmlWebpackPlugin = require('html-webpack-plugin');

// CDN提取
const WebpackCdnPlugin = require('webpack-cdn-plugin');

// css打包提取为单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// script 属性修改
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

// 友好的进度条
const WebpackBar = require('webpackbar');

// 用于将静态文件拷贝到你的输出目录下，有时一些文件并没有适用的 loader 或者是不需要经过处理，原样复制的文件。
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 雪碧图
const SpritesmithPlugin = require('webpack-spritesmith');

const { name, version } = require("../package");

// dev配置
const devConfig = require('./webpack.dev');
// prod配置
const prodConfig = require('./webpack.prod');

// 拼接路径
const resolve = dir => path.join(__dirname, dir);

module.exports = (env) => {

    console.log(chalk.blue('Environment:'), chalk.yellowBright(env));
    console.log(chalk.blue('Version:'), chalk.yellowBright(version));
    const devMode = env === 'development';

    const cdnLoader = (prod = false) => {
        return {
            modules: [
                {
                    name: 'axios',
                    var: 'axios',
                    path: 'axios.min.js'
                },
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
                // {
                //   name: 'view-design',
                //   var: 'iview',
                //   path: 'iview.min.js'
                // }
            ],
            prod,
            publicPath: '/node_modules',
            prodUrl: '//cdn.staticfile.org/:name/:version/:path'
            // prodUrl: 'https://cdn.jsdelivr.net/npm/:name@:version/dist/:path'
        }
    }

    // 基本配置
    const baseConfig = {
        /**
         * 入口文件，如果不做任何配置默认入口是[src/index.js]
         */
        // entry: [path.resolve(__dirname, '../src/app.js')],

        // 多入口需要如下键值对形式
        entry: {
            app: ['babel-polyfill', resolve('../src/app.js')],
        },

        /*--------------*/
        /**
         * 出口文件
         */
        output: {
            // 打包后的路径
            path: resolve('../dist'),
            chunkFilename: 'js/[name].[chunkhash:6].js',
            // 打包后的文件名，默认打包出来是main.js
            filename: 'js/[name].[chunkhash:6].js',
            publicPath: devMode ? `` : ``,
        },
        module: {
            rules: [
                {
                    test: /\.ws$/, // 检测ws文件
                    use: {
                        loader: "loader/ws-loader", // 使用自定义loader，ws-loader
                    }
                },
                {
                    test: /\.js$/, // 检测js文件
                    use: {
                        loader: 'babel-loader', // 使用babel-loader
                    },
                    include: [resolve('src')],
                    exclude: [resolve('node_modules')]
                },
                {
                    test: /\.css$/,
                    use: [
                        /**
                         * MiniCssExtractPlugin提取css为一个文件，MiniCssExtractPlugin没有hdr，
                         * 所以开发使用style-loader
                         */
                        devMode ?  'style-loader' : MiniCssExtractPlugin.loader,
                        // 'style-loader', // 将css文件打包到js
                        'css-loader', // css文件处理
                        // css兼容性处理，添加前缀
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        /**
                         * MiniCssExtractPlugin提取css为一个文件，MiniCssExtractPlugin没有hdr，
                         * 所以开发使用style-loader
                         */
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        // 'style-loader', // 将css文件打包到js
                        'css-loader', // css文件处理
                        // css兼容性处理，添加前缀
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        'less-loader', // less编译
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                outputPath: 'img/',
                                publicPath: '../img/',
                                // 压缩之后的图片如果小于10KB，那么将直接转为Base64编码，否则通过URL的形式连接图片;
                                limit: 10 * 1024, // 默认转为Base64编码
                                name: '[name].[hash:6].[ext]',
                            },
                        },
                        /**
                         * loader for zip img
                         */
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4, // 1-11 越小压缩效果越好
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // new webpack.ProgressPlugin(), // 打包进度
            new WebpackBar({
                name: name || 'WebPack',
                color: '#61dafb', // react 蓝
            }),
            new webpack.NamedChunksPlugin(),
            // HMR shows correct file names in console on update.
            new webpack.NamedModulesPlugin(),
            // 固定moduleId
            new webpack.HashedModuleIdsPlugin(),
            // 资源拷贝
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: resolve("../public"),
                        to: resolve( "../dist")
                    },
                ],
            }),
            // cdn抽离
            new WebpackCdnPlugin(cdnLoader(true)),
            // script标签utf-8编码修复
            new ScriptExtHtmlWebpackPlugin({
                custom: {
                    test: /\.js$/,
                    attribute: 'charset',
                    value: 'utf-8',
                },
            }),
            // 提取css文件
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:6].css',
            }),
            // 默认会压缩html，
            new HtmlWebpackPlugin({
                title: 'app',
                template: resolve('../public/index.html'),
                filename: 'index.html',
                inject: true,
                chunksSortMode: 'none',
                minify: devMode ? false : {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    collapseInlineTagWhitespace: true,
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

            // toDo
            // css雪碧图插件
            // 【问题】没有将雪碧图打包进css，而且 会被CleanWebpackPlugin删除掉雪碧图文件夹
            /**
             new SpritesmithPlugin({
                // 原图片路径
                src: {
                    cwd: path.resolve(__dirname, '../src/sprites'),
                    glob: '*.png'
                },
                // 生成雪碧图及css路径
                target: {
                    image: path.resolve(__dirname, '../dist/sprites/sprite.[hash:6].png'),
                    css: path.resolve(__dirname, '../dist/sprites/sprite.[hash:6].css')
                },
                // css引入雪碧图
                apiOptions: {
                    cssImageRef: '../sprites/sprite.[hash:6].png',
                },
                // 配置spritesmith选项，非必选
                spritesmithOptions: {
                    algorithm: `top-down`,//設定圖示的排列方式
                    padding: 4 //每張小圖的補白,避免雪碧圖中邊界部分的bug
                }
            }),
             **/
        ],
        optimization: {
            // 开启代码压缩，mode为production默认开启代码压缩和TreeShaking
            // minimize: true,
            // 代码分割
            splitChunks: {
                name: true,
                // 选择哪些 chunk 进行优化，可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all,
                chunks: 'all', // 表示对所有的第三方库进行代码分割(包括async和initial)
                minSize: 10000, // 大于10kb，再去提取
                // 指定需要打包哪些内容
                cacheGroups: {
                    vendor: {
                        // 第三方包
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        enforce: true,
                        priority: 10,
                        name: 'vendor'
                    },
                    /**
                     * https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegrouppriority
                     * 一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组。
                     * 默认组的优先级为负，以允许自定义组获得更高的优先级（自定义组的默认值为 0）。
                     */
                    common: {
                        // 公共资源的打包
                        chunks: "all",
                        minChunks: 2, // 表示被引用次数大于等于2的module符合该cacheGroup的条件
                        name: 'common',
                        enforce: true,
                        priority: 5, // 表示优先处理，webpack默认的两个cacheGroup的优先级为负数。
                    }
                },
            },
            // 运行时，webpack配置文件
            // runtimeChunk: true,
            runtimeChunk: {
                "name": "manifest"
            },
        },
    }

    return merge(baseConfig, {
        development: devConfig,
        production: prodConfig,
    }[env]);
}
