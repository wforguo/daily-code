/**
 * @Description: 跨域处理
 * @author: forguo
 * @date: 2020/7/28
*/
const chalk = require("chalk");
const cors = async (ctx, next) => {
    // 设置跨域
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
    ctx.set('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // 允许携带cookie
    ctx.set('Access-Control-Allow-Credentials', 'true');
    if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
    } else {
        console.log(chalk.gray(`${new Date().toLocaleString()}`));
        await next();
    }
};

module.exports = cors;
