/**
 * @Author forguo
 * @Date 2022/03/11
 * @Description jsonp的实现
 */

const router = require('koa-router')({
    prefix: '/api' // 路由前缀
});

router
.get('/jsonp',async ctx => {
    let method = ctx.request.method || 'GET';
    let params = {};
    if (method === 'GET') {
        params = ctx.request.query;
    }
    if (method === 'POST') {
        params = ctx.request.body;
    }
    try {
        if (params.callback) {
            // 返回结果
            let res = params.callback + '(' + JSON.stringify({
                data: {
                    now: Date.now(),
                },
                code: 200,
                serverTime: Date.now(),
            }) + ')';
            // 需要注明Content-Type
            ctx.response.type = 'application/javascript;charset=utf-8';
            ctx.body = res;
        } else {
            ctx.response.type = 'application/json;charset=utf-8';
            ctx.body = {
                data: {
                    now: Date.now(),
                },
                code: 200,
                serverTime: Date.now(),
            };
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
})

module.exports = router;
