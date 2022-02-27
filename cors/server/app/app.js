/**
 * @Description: 入口
 * @author: forguo
 * @date: 2020/7/14
 */
const Koa = require('koa');
const onerror = require('koa-onerror');
const compress = require('koa-compress');
const chalk = require('chalk');
const figlet = require('figlet');
const middleWares = require('./middleWares');

figlet('Wechat', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err); // 打印出该对象的所有属性和属性值.
        return;
    }
    data && console.log(chalk.green(data));
});

// 所有路由
const routing = require('./routes');

const app = new Koa();

// error handler
onerror(app);

if (process.env.NODE_ENV === 'production') {
    app.use(compress())
}

app.use(middleWares);

// 所有路由
routing(app);


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;
