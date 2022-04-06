/**
 * @Author: forguo
 * @Date: 2021/11/14 22:13
 * @Description: common
 */
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");

// merge配置合并
const { merge } = require('webpack-merge');

// css打包提取为单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SpritesmithPlugin = require('webpack-spritesmith');

// 自动创建 HTML 模板供 Webpack 打包结果使用，包括文件名称 模板参数 meta 标签配置 压缩等等。SPA 与 MPA 都会使用到。
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 用于将静态文件拷贝到你的输出目录下，有时一些文件并没有适用的 loader 或者是不需要经过处理，原样复制的文件。
const CopyWebpackPlugin = require("copy-webpack-plugin");

// script 属性修改
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

// 友好的进度条
const WebpackBar = require('webpackbar');

// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { name, version } = require("../package");

// dev配置
const devConfig = require('./webpack.dev');
// prod配置
const prodConfig = require('./webpack.prod');

module.exports = env => {
    console.log(chalk.blue('Environment:'), chalk.yellowBright(env));
    console.log(chalk.blue('Version:'), chalk.yellowBright(version));
    // 是否是开发环境
    const devMode = env === 'development';

    const commonConfig = {
        // 默认打包出来是main.js
        // entry: ['babel-polyfill', path.resolve(__dirname, '../src/app.js')],
        entry: {
            app1: ['babel-polyfill', path.resolve(__dirname, '../src/app1.js')],
            app2: ['babel-polyfill', path.resolve(__dirname, '../src/app2.js')]
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            chunkFilename: 'js/[name].[chunkhash:6].js',
            filename: "js/[name].[chunkhash:6].js",
            // publicPath: 'https://cloud-app.com.cn/app/',
        },
        module: {
            rules: [
                {
                    test: /\.ws$/, // 检测ws文件
                    use: {
                        loader: "./ws-loader/index", // 使用自定义loader，ws-loader
                    }
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
                    test: /\.scss$/,
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
                        'sass-loader', // less编译
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
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: 'static',
                reportFilename: 'report.html'
            }),
            new WebpackBar({
                name: name || 'WebPack',
                color: '#61dafb', // react 蓝
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:6].css'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "../public"),
                        to: path.resolve(__dirname, "../dist")
                    },
                ],
            }),
            new HtmlWebpackPlugin({
                title: 'App1',
                template: path.resolve(__dirname, "../public/app1.html"),
                filename: "app1.html",
                chunks: ['app1', 'manifest', 'vendor', 'common'],
                inject: true, // 是否自动引入资源
                // icon: path.join(__dirname, "../public/cloud.png"),
                minify: devMode ? false : {
                    // collapseWhitespace: true,
                    // collapseBooleanAttributes: true,
                    // collapseInlineTagWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyCSS: true, // 压缩css
                    minifyJS: true, // 压缩js
                    minifyURLs: true,
                    useShortDoctype: true,
                }
            }),
            new HtmlWebpackPlugin({
                title: 'App2',
                template: path.resolve(__dirname, "../public/app2.html"),
                filename: "app2.html",
                chunks: ['app2', 'manifest', 'vendor', 'common'],
                minify: devMode ? false : {
                    // collapseWhitespace: true,
                    // collapseBooleanAttributes: true,
                    // collapseInlineTagWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyCSS: true, // 压缩css
                    minifyJS: true, // 压缩js
                    minifyURLs: true,
                    useShortDoctype: true,
                }
            }),
            new ScriptExtHtmlWebpackPlugin({
                custom: {
                    test: /\.js$/,
                    attribute: 'charset',
                    value: 'utf-8',
                },
            }),
            new webpack.NamedChunksPlugin(),
            new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.HashedModuleIdsPlugin(),
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
            splitChunks: {
                name: true,
                chunks: 'all',
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
                    common: {
                        // 公共资源的打包
                        chunks: "all",
                        minChunks: 2,
                        name: 'common',
                        enforce: true,
                        priority: 5
                    }
                },
            },
            // 运行时，webpack配置文件
            // runtimeChunk: true,
            runtimeChunk: {
                "name": "manifest"
            },
        }
    }
    return merge(commonConfig, {
        development: devConfig,
        production: prodConfig
    }[env])
}
