/**
 *@description: 实现自动加载路由
 *@author: forguo
 *@date: 2021/3/20
 */

// api
const routingWechat = require('./api');

module.exports = (app) => {
    routingWechat(app);
};
