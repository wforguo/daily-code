## 同源策略

### 浏览器的同源策略 (Same Origin Policy)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1645947603963-bdbdb6d2-740a-4bbf-981b-4d174313022b.png#clientId=ua0c3fd67-aa3e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=77&id=u1ef1d7a3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=154&originWidth=1172&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40323&status=done&style=none&taskId=u0ecd8a4e-e5e6-4992-bfa5-2cf0d22dd29&title=&width=586)

同源策略是网站安全的基石，https://a.com只能存取自己网站的资源，不允许网站https://b.com来存取。
目的是为了保证用户信息的安全，防止恶意的网站窃取数据。

### 判断

只要url当中的协议scheme、域名domain、端口port都一样，就会被视为就会被视为同源 (same-origin)，
其他则是不同源。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1645947024556-46b84de3-bb81-4da5-aa70-f9582780ab2c.png#clientId=ua0c3fd67-aa3e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=181&id=u9b91b622&margin=%5Bobject%20Object%5D&name=image.png&originHeight=361&originWidth=884&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23716&status=done&style=none&taskId=u2b89c63e-c3a5-4194-be10-bf1d44e6497&title=&width=442)

```javascript
http://domain-a.com → 不同源．scheme 不同
https://domain-a.com/mike → 同源
https://news.domain-a.com → 不同源．domain 不同
https://domain-a.com:81 → 不同源．port 不同
https://domain-b.com → 不同源．domain 不同
```
### 限制范围

1、在某些情況下跨来源是被允許的，跨来源嵌入通常被允许。

像`<script src=""></script><link rel="stylesheet" href=""><iframe>`图片`<img><video>`
或是`@font-face <object> <embed>`

2、跨来源读取通常被禁止，如非同源，以下行为将收到限制。

```javascript
（1） Cookie、LocalStorage 和 IndexDB 无法读取。
（2） DOM 无法获得。
（3） AJAX 请求不能发送。
```

## cookie的同源

```javascript
Set-Cookie: <cookie-name>=<cookie-value>
Set-Cookie: id=1234567; domain=hello.com
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1645950966046-20ae4ac6-4f0b-449a-b115-82c34404778e.png#clientId=ua0c3fd67-aa3e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=250&id=zxbxQ&margin=%5Bobject%20Object%5D&name=image.png&originHeight=500&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59368&status=done&style=none&taskId=u2be7fea2-1279-4e3d-987c-fcb979960f2&title=&width=700)

只要 domain 跟 Path 与Cookie 上的一样就会被视为同源。若经过一些设定才会判断 scheme 要是 http 或 https。

```javascript
// 加了 Secure 会限定此 Cookie 只能以 https 传送
Set-Cookie: id=1234567; domain=hello.com; Secure
```


下面这样设置，`domain`为一级域名，二级域名和三级域名不用做任何设置，都可以读取这个`Cookie`。

```javascript
Set-Cookie: key=value; domain=.example.com; path=/
```

## Ajax

同源政策规定，AJAX请求只能发给同源的网址，否则就报错。

解决办法：

- JSONP
- WebSocket
- CORS
- 服务器转发

### Jsonp

实现一个简易jsonp：https://github.com/wforguo/study/tree/master/cors

- 优点：简单适用，老式浏览器全部支持，服务器改造非常小。
- 缺点：只支持get请求。

基本思路是：向网页动态插入`<script>`元素，通过src向服务器请求数据，服务器收到请求后，将数据放在一个指定名字的回调函数里传回来，浏览器执行回调函数，在回调函数中去接受返回结果。

#### web端代码

```javascript
/**
 * @desc js原生实现jsonp
 */
function jsonpRequest () {
    // 创建一个script标签，并插入页面
    let script = document.createElement('script');

    // 获取到跨域资源后的回调
    window.handleFn = function (res) {
        // JSONP跨域成功返回的资源
        console.log(res);
        //代码执行后，删除插入的script标签
        document.getElementsByTagName('head')[0].removeChild(script);
    }
    let url = `http://127.0.0.1:3003/common/wechat/sdk?callback=handleFn`;
    script.setAttribute('src', url);
    // 将script标签插入到网页中
    document.getElementsByTagName('head')[0].appendChild(script);
}

jsonpRequest();
```

#### 服务端代码

基于koa2

```javascript
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
            };
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
})
```

### WebSocket

WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

### Cors

跨源资源分享（Cross-Origin Resource Sharing），允许任何类型的请求 。

**（1）Access-Control-Allow-Origin**

**（2）Access-Control-Allow-Credentials**

**（3）Access-Control-Expose-Headers**

**（4）Access-Control-Request-Method**

基于koa2的cors配置

```javascript
const cors = async (ctx, next) => {
    // 设置跨域
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
    } else {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    }
};
```

### 服务器代理

#### nginx代理
```nginx
server {
  # 转发api到node服务
  location /api/ {
    proxy_pass http://127.0.0.1:3333/api/;
  }
}
```

#### node.js代理

```javascript
/* 代理配置 start */
const proxy = require('koa2-proxy-middleware'); //引入代理模块
const options = {
    targets: {
        // (.*) means anything
        '/api/(.*)': {
            target: 'http://test02.com/',
            changeOrigin: true,
        },
    }
}
app.use(
    proxy(options)
);

const bodyparser = require('koa-bodyparser')
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))

/* 代理配置 end */
```
