/**
 * @author: forguo
 * @time: 2021/5/7 16:49
 * @description: koaJsonError / 错误处理
 */
const koaJsonError = require('koa-json-error');

const middleware = koaJsonError({
    // 格式化error，只在开发环境输出错误栈信息
    postFormat: (e, {
        stack,
        ...rest
    }) => {
        return process.env.NODE_ENV === 'production' ? rest : {
            stack,
            ...rest
        }
    }
})

module.exports = middleware;
