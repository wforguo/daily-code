/**
 * @Description: 集成中间件
 * @author: forguo
 * @date: 2020/7/29
*/

const views = require('koa-views');
const json = require('koa-json');
const logger = require('koa-logger');
const compose = require('koa-compose');
const koaBody = require('./koaBody');
const koaJsonError = require('./koaJsonError');
const cors = require('./cors');

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
    require('koa-static')(__dirname + '/../public'),
    views(__dirname + '/../views', {
        extension: 'pug'
    }),
    logger(),
    cors,
    json(),
    koaBody,
    koaJsonError,
]);

module.exports = middleware;
