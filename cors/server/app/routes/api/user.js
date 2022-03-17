/**
 * @Author forguo
 * @Date 2022/03/11
 * @Description 跨域请求携带cookie
 */
const router = require('koa-router')({
    prefix: '/user' // 路由前缀
});

/**
 * 设置cookie
 */
router
    .post('/cookie',async ctx => {
        let method = ctx.request.method || 'GET';
        let params = {};
        if (method === 'GET') {
            params = ctx.request.query;
        }
        if (method === 'POST') {
            params = ctx.request.body;
        }

        ctx.cookies.set("user", params.user, {
            // domain: '127.0.0.1',  // 写cookie所在的域名
            // path: '/',       // 写cookie所在的路径
            maxAge: 60 * 60 * 1000 * 24 * 7, // cookie有效时长 7天
            expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取（设置为true的话，客户端在控制台就获取不到）
            overwrite: false,  // 是否允许重写
            secure: true,
            sameSite: 'none',
        });

        ctx.body = {
            data: {
                ...params,
            },
            code: 200,
            serverTime: Date.now(),
        };
    })

/**
 * 设置cookie
 */
.post('/login',async ctx => {
    let method = ctx.request.method || 'GET';
    let params = {};
    if (method === 'GET') {
        params = ctx.request.query;
    }
    if (method === 'POST') {
        params = ctx.request.body;
    }

    ctx.cookies.set("user", params.user, {
        // domain: '127.0.0.1',  // 写cookie所在的域名
        // path: '/',       // 写cookie所在的路径
        maxAge: 60 * 60 * 1000 * 24 * 7, // cookie有效时长 7天
        expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取（设置为true的话，客户端在控制台就获取不到）
        overwrite: false,  // 是否允许重写
        secure: true,
        sameSite: 'none',
    });

    ctx.body = {
        data: {
            ...params,
        },
        code: 200,
        serverTime: Date.now(),
    };
})

/**
 * 接收cookie
 */
    .post('/info',async ctx => {
        let user = {};
        if (ctx.headers.cookie) {
            // req.headers.cookie: user=forguo
            user = ctx.headers.cookie.split("=")[1];
        }
        ctx.body = {
            data: {
                user,
                cookie: ctx.headers.cookie,
            },
            code: 200,
            serverTime: Date.now(),
        };
    })

module.exports = router;
