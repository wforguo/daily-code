/**
 * @Author: forguo
 * @Date: 2022/4/5 18:54
 * @Description: 自定义plugin html-webpack-add-static-server
 */
const path = require('path');
const fs = require('fs');
const readFileAsync = require("util").promisify(fs.readFile);
const writeFileAsync = require("util").promisify(fs.writeFile);

class AddStaticServer {
    constructor(options) {
        this.options = options || {
            serverPath: '//kc.stu.126.net'
        };
        this.serverPath = this.options.serverPath;
    }

    apply(compiler) {
        // console.log(complier.hooks);
        // 等 html-webpack-plugin 解决多页面构建速度慢的问题可以使用此方法
        // compiler.hooks.compilation.tap('AddStaticServer', compilation => {
        //     compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
        //         'AddStaticServer',
        //         data => {
        //             data.html =
        //             data.html.replace(/\/static\/css/g, `${this.serverPath}res/css`)
        //                 .replace(/\/static\/js/g, `${this.serverPath}res/js`)
        //                 .replace(/\/static\/img/g, `${this.serverPath}res/img`);
        //         }
        //     );
        // });

        compiler.hooks.done.tap('AddStaticServer', compilation => {
            let context = compiler.options.context;
            let publicPath = path.resolve(context, 'dist');
            compilation.toJson().assets.forEach((ast) => {
                let {dir, base, ext} = path.parse(ast.name);
                if (ext === '.ftl') {
                    readFileAsync(path.resolve(publicPath, dir, base), {encoding: 'utf-8'}).then((cnt) => {
                        cnt = cnt.replace(/\/static\/css/g, `${this.serverPath}res/css`)
                                .replace(/\/static\/js/g, `${this.serverPath}res/js`)
                                .replace(/\/static\/img/g, `${this.serverPath}res/img`);
                        writeFileAsync(path.resolve(publicPath, dir, base), cnt);
                    });
                }
            });
        });
    }
}

module.exports = AddStaticServer;
