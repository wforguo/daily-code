/**
 * @Author: forguo
 * @Date: 2021/11/14 22:13
 * @Description: production
 */
const path = require("path");

module.exports = {
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, '../src/app.js')
    },
    output: {
        // path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[hash:8].js",
        // publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 检测js
                use: {
                    loader: 'babel-loader', // 使用babel-loader
                    // 打包参数
                    options: {
                        // 存储JavaScript不同标准的插件
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            }
        ]
    }
}
