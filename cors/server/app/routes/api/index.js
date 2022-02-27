/**
 *@description: 实现自动加载路由
 *@author: forguo
 *@date: 2021/3/20
 */
const fs = require('fs');
module.exports = (app) => {
    // 读取并遍历所有路由文件
    fs.readdirSync(__dirname).forEach(file => {
        if (file !== 'index.js') {
            const route = require(`./${file}`);
            // 注册路由
            // allowedMethods 响应options请求
            app.use(route.routes()).use(route.allowedMethods());
        }
    });
};
