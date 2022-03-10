/**
 * @Author forguo
 * @Date 2019/12/14
 * @Description 微信sdk
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

router
.get('/cors',async ctx => {
    let method = ctx.request.method || 'GET';
    let params = {};
    if (method === 'GET') {
        params = ctx.request.query;
    }
    if (method === 'POST') {
        params = ctx.request.body;
    }

    ctx.cookies.set("user", "forguo", {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/request',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2020-03-15'),  // cookie失效时间
        httpOnly: true,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
    });

    ctx.body = {
        data: {
            ...params,
        },
        code: 200,
        serverTime: Date.now(),
    };
})

module.exports = router;
