/**
 * @Author: forguo
 * @Date: 2021/11/14 22:13
 * @Description: common
 */
const path = require("path");
const chalk = require("chalk");

// merge配置合并
const { merge } = require('webpack-merge');

// 在每次 build 后移除你的dist目录（可配置），默认情况下它会读取 webpack 配置的output.path。
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// css打包提取为单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SpritesmithPlugin = require('webpack-spritesmith');

// 自动创建 HTML 模板供 Webpack 打包结果使用，包括文件名称 模板参数 meta 标签配置 压缩等等。SPA 与 MPA 都会使用到。
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    const _DEV_ = env === 'development';
    const commonConfig = {
        // 默认打包出来是main.js
        // entry: ['babel-polyfill', path.resolve(__dirname, '../src/app.js')],
        entry: {
            app1: ['babel-polyfill', path.resolve(__dirname, '../src/app1.js')],
            app2: ['babel-polyfill', path.resolve(__dirname, '../src/app2.js')]
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            chunkFilename: 'js/[name].[contenthash:6].js',
            filename: "js/[name].[contenthash:6].min.js",
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
                },
                {
                    test: /\.(png|jpe?g|gif|svg|bmp|mp4)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                outputPath: 'img/',
                                publicPath: '../img/',
                                // base64配置 小于 limit 字节的文件会被转为 base64，大于 limit 的使用 file-loader 进行处理，单独打包
                                limit: 1 * 1024, // 单位b
                                name: '[name].[hash:6].[ext]'
                            }
                        },
                        /*********** loader for zip img  ***************/
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
                        },
                        /*********** loader for zip img  ***************/
                    ]
                },
                {
                    test: /\.(ttf|eot|woff2?)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        publicPath: '../fonts/',
                        name: '[name].[hash:6].[ext]',
                    },
                },
            ]
        },
        plugins: [
            // 清除上次打包的代码
            new CleanWebpackPlugin(),
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
                filename: 'css/[name].[contenthash:6].min.css'
            }),
            new HtmlWebpackPlugin({
                title: 'App1',
                template: path.resolve(__dirname, "../public/app1.html"),
                filename: "app1.html",
                chunks:['app1', 'manifest', 'vendor', 'common'],
                inject: true, // 是否自动引入资源
                // icon: path.join(__dirname, "../public/cloud.png"),
                minify: _DEV_ ? false : {
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
                chunks:['app2', 'manifest', 'vendor', 'common']
            }),
            new ScriptExtHtmlWebpackPlugin({
                custom: {
                    test: /\.js$/,
                    attribute: 'charset',
                    value: 'utf-8',
                },
            }),
            // toDo
            // css雪碧图插件
            // 【问题】没有将雪碧图打包进css，而且 会被CleanWebpackPlugin删除掉雪碧图文件夹
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
        ],
        optimization: {
            splitChunks: {
                // name: true, // 以入口name命名
                chunks: 'all',
                // 默认1000 --> 1kb，大于1000才去将公共的代码做一个分割，
                // 限制大小是为了避免小文件也去做分割 避免多余的http请求
                minSize: 1000,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        enforce: true,
                        priority: 10,
                        name: 'vendor'
                    },
                    common: {
                        chunks: "all",
                        minChunks: 2,
                        name: 'common',
                        enforce: true,
                        priority: 5
                    }
                },
            },
            // 运行时，webpack配置文件
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
