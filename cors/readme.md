## 同源策略

### 浏览器的同源策略 (Same Origin Policy)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1645947603963-bdbdb6d2-740a-4bbf-981b-4d174313022b.png#clientId=ua0c3fd67-aa3e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=77&id=u1ef1d7a3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=154&originWidth=1172&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40323&status=done&style=none&taskId=u0ecd8a4e-e5e6-4992-bfa5-2cf0d22dd29&title=&width=586#crop=0&crop=0&crop=1&crop=1&id=kJUYX&originHeight=154&originWidth=1172&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

同源策略是网站安全的基石，https://a.com只能存取自己网站的资源，不允许网站https://b.com来存取。
目的是为了保证用户信息的安全，防止恶意的网站窃取数据。

### 判断

只要url当中的协议scheme、域名domain、端口port都一样，就会被视为就会被视为同源 (same-origin)，
其他则是不同源。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1645947024556-46b84de3-bb81-4da5-aa70-f9582780ab2c.png#clientId=ua0c3fd67-aa3e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=181&id=u9b91b622&margin=%5Bobject%20Object%5D&name=image.png&originHeight=361&originWidth=884&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23716&status=done&style=none&taskId=u2b89c63e-c3a5-4194-be10-bf1d44e6497&title=&width=442#crop=0&crop=0&crop=1&crop=1&id=YP4cP&originHeight=361&originWidth=884&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

```javascript
http://domain-a.com → 不同源．scheme 不同
https://domain-a.com/mike → 同源
https://news.domain-a.com → 不同源．domain 不同
https://domain-a.com:81 → 不同源．port 不同
https://domain-b.com → 不同源．domain 不同
```

### 限制范围

1、在某些情況下跨来源是被允许的，比如跨来源嵌入。
script、link、img、iframe、video、audio、font-face等等。

2、如非同源,跨来源读取通常被禁止。

- Cookie、LocalStorage 和 IndexDB 无法读取。
- DOM 无法获得。
- AJAX 请求不能发送。

## Cookie跨域

### Cookie的同源策略

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1645950966046-20ae4ac6-4f0b-449a-b115-82c34404778e.png#clientId=ua0c3fd67-aa3e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=250&id=zxbxQ&margin=%5Bobject%20Object%5D&name=image.png&originHeight=500&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59368&status=done&style=none&taskId=u2be7fea2-1279-4e3d-987c-fcb979960f2&title=&width=700#crop=0&crop=0&crop=1&crop=1&id=aS13L&originHeight=500&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

只要 domain 跟 Path 与Cookie 上的一样就会被视为同源。若经过一些设定才会判断 scheme 要是 http 或 https。

```javascript
// 加了 Secure 会限定此 Cookie 只能以 https 传送
Set-Cookie: id=1234567; domain=hello.com; Secure
```

下面这样设置，`domain`为一级域名，二级域名和三级域名不用做任何设置，都可以读取这个`Cookie`。

```javascript
Set-Cookie: key=value; domain=.example.com; path=/
```

### 跨域携带Cookie

[跨域请求如何携带cookie](https://juejin.cn/post/7066420545327218725)

[withCredentials](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)

> **XMLHttpRequest.withCredentials  **属性是一个[Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)类型，它指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求。在同一个站点下使用`withCredentials`属性是无效的。


#### 1、设置Cookie
> 不同域下的`XmlHttpRequest`响应，不论其`Access-Control-header` 设置什么值，都无法为它自身站点设置`cookie`值，除非它在请求之前将`withCredentials`设为`true`。

##### 同IP不同端口
比如`127.0.0.1:3000`请求`127.0.0.1:8000`
```javascript
ctx.cookies.set("user", "forguo", {
    domain: '127.0.0.1',  // 写cookie所在的域名，默认主域名不带.，也就是子域名不生效
    path: '/',       // 写cookie所在的路径
    maxAge: 10 * 60 * 1000, // cookie有效时长 10分钟
    expires: new Date('2022-03-15'),  // cookie失效时间
    httpOnly: true,  // 是否只用于http请求中获取
    overwrite: false // 是否允许重写
});
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1646982330542-372887e5-9018-4bd0-a3c8-f1006d2687b4.png#clientId=u4925323a-4f05-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=886&id=PN5Pv&margin=%5Bobject%20Object%5D&name=image.png&originHeight=886&originWidth=1105&originalType=binary&ratio=1&rotation=0&showTitle=false&size=83182&status=done&style=none&taskId=u3b3532fa-6ce7-4ff9-b71d-bdc8b1640d5&title=&width=1105)

查看浏览器 `Application `> `Cookie`可以看到`Cookie`信息已经存储成功
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1646981983099-a48d45d4-d136-4d86-a8ee-0a1fdac729ae.png#clientId=u4925323a-4f05-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=329&id=PMW5F&margin=%5Bobject%20Object%5D&name=image.png&originHeight=329&originWidth=1119&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26640&status=done&style=none&taskId=ub2e348a9-b204-4838-a289-8efaaffd9df&title=&width=1119)

此时，接口返回的`Response Headers`会设置Cookie
```javascript
Set-Cookie: user=forguo; path=/; expires=Fri, 11 Mar 2022 06:21:27 GMT; domain=127.0.0.1; httponly
```
设置好前后端配置后，我们通过跨端口从 [http://127.0.0.1:3003](http://127.0.0.1:3003/)向 [http://127.0.0.1:3009](http://127.0.0.1:3009/user/info) 发起一个请求就会携带上`Cookie`数据。
##### 域名端口都不同
**以上是同域名不同端口，如果是不同域名和端口，需要设置**`**samesite**`**为**`**none**`**，但是设置为none有一个要求，就是必须**`**secure**`**属性为true，也就是必须使用**`**https**`**。**
而且不能是`nginx`的`proxy_pass`之后的api，否则会有以下报错，
> **Cannot send secure cookie over unencrypted connection**

**这样设置过后的cookie，实际是存在于接口所在的domain，下次请求接口会带上该cookie数据**
```javascript
ctx.cookies.set("user", params.user, {
    // domain: '127.0.0.1',  // 写cookie所在的域名
    // path: '/',       // 写cookie所在的路径
    maxAge: 60 * 60 * 1000 * 24 * 7, // cookie有效时长 7天
    expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7), // cookie失效时间
    httpOnly: false,  // 是否只用于http请求中获取（设置为true的话，客户端在控制台就获取不到）
    overwrite: false,  // 是否允许重写
    secure: true, // ++新增
    sameSite: 'none', // ++新增
});
```
proxy_pass过后的api
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1647505243015-ab1f4f2f-8cae-4ad1-a139-8f98f01230b7.png#clientId=u2c91b68b-0396-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=159&id=u7050fb27&margin=%5Bobject%20Object%5D&name=image.png&originHeight=317&originWidth=1497&originalType=binary&ratio=1&rotation=0&showTitle=false&size=71985&status=done&style=none&taskId=u2d4ec4b6-d70f-46f4-9534-585fe40c49b&title=&width=748.5)

成功设置cookie
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1647505505288-63440f68-290b-4d33-b482-25db8d88a371.png#clientId=u2c91b68b-0396-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=363&id=u39ab7e41&margin=%5Bobject%20Object%5D&name=image.png&originHeight=726&originWidth=1703&originalType=binary&ratio=1&rotation=0&showTitle=false&size=155782&status=done&style=none&taskId=ueff54b64-de45-4f1e-ab13-6c223bd78ff&title=&width=851.5)
成功携带cookie
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1647505938344-63ded802-9f80-4155-a2b3-e1dc4dd128b4.png#clientId=u2c91b68b-0396-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=352&id=u3c465a73&margin=%5Bobject%20Object%5D&name=image.png&originHeight=703&originWidth=1397&originalType=binary&ratio=1&rotation=0&showTitle=false&size=126470&status=done&style=none&taskId=u1873f7f8-41fa-4aad-ba43-f75019e0614&title=&width=698.5)
此时`Cookie`存放于接口所在域名，同时下次请求该域名下的接口，会带上该`Cookie`

#### 2、携带Cookie

##### 1、前端添加withCredentials
在前端请求的时候设置`request`对象的属性`withCredentials`为`true`
```javascript
// axios添加withCredentials
axios({
    method: "get",
    withCredentials: true, // ++ 携带cookie数据
    url: "http://127.0.0.1:3009/user/info",
}).then((res) => {
    console.log(res);
});
```
#### 
##### 2、服务端设置Access-Control-Allow-Origin

此时，我们从 [http://127.0.0.1:3003/](http://127.0.0.1:3003/) 向 [http://127.0.0.1:3009/user/info](http://127.0.0.1:3009/user/info) 去发起一个请求，发现报错
意思是需要设置header的`Access-Control-Allow-Origin`属性：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1646982765010-f2daf76b-913d-4187-be9d-37bdc93250b0.png#clientId=u2bedbe6f-f348-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=159&id=wijyl&margin=%5Bobject%20Object%5D&name=image.png&originHeight=159&originWidth=808&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25483&status=done&style=none&taskId=u6be925e6-27bd-4e42-b952-23354404b85&title=&width=808)

携带了`Cookie`，但是报错`CORS error`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1646984784151-f000eef3-7d96-47ec-ac33-a62e9f3515b6.png#clientId=ud475813b-7bd0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=673&id=X0WWZ&margin=%5Bobject%20Object%5D&name=image.png&originHeight=673&originWidth=1102&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60071&status=done&style=none&taskId=u87b0fbfe-8d83-421f-a319-feb9abd4246&title=&width=1102)
**跨域发送 Cookie 还要求 **`**Access-Control-Allow-Origin**`**不允许使用通配符*（跨域设置Cookie会报错），而且只能指定单一域名：可以使用**`**ctx.headers.origin**`

```javascript
const cors = async (ctx, next) => {
    // 设置跨域
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
    // ctx.set('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // 允许携带cookie
    // ctx.set('Access-Control-Allow-Credentials', 'true');
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

如果是下面这个错误，就说明配置的`Origin`和当前前端所在`Origin`不是同一个
that is not equal to the supplied origin.

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1646987958089-096a05d3-ec4f-457b-9d4a-c79a63766cf3.png#clientId=u31e4d5d9-f672-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=187&id=ua6ac0953&margin=%5Bobject%20Object%5D&name=image.png&originHeight=187&originWidth=613&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26636&status=done&style=none&taskId=ua42ef69b-1950-4cdc-94e7-a12b4c3e785&title=&width=613)

##### 3、服务端设置Access-Control-Allow-Credentials

重复1的请求，发现还是报错
意思是`Access-Control-Allow-Credentials`这个属性应该设置为`true`
当然如果前端没有设置`withCredentials`，是不会携带Cookie的，也不会有这个错误的
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1646984550617-6c3b49e5-9c66-4a26-9922-b972f705a6d0.png#clientId=ud475813b-7bd0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=190&id=CcgOk&margin=%5Bobject%20Object%5D&name=image.png&originHeight=190&originWidth=810&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30124&status=done&style=none&taskId=u39250142-4033-4920-a93c-3a8deeca973&title=&width=810)
```javascript
const cors = async (ctx, next) => {
    // 设置跨域
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
    // ctx.set('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // 允许携带cookie
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

再去发起1的请求，会发现请求成功，并且返回了`cookie`数据
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1088766/1646985132304-1fd2bb21-203b-4fdb-91d6-7c3cdbbf19d6.png#clientId=u31e4d5d9-f672-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=323&id=u8b89b7f6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=323&originWidth=813&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30825&status=done&style=none&taskId=u45959783-ffa2-40f4-9c28-5650c52e993&title=&width=813)

接口处理是解析了Cookie内容，并返回
```javascript
.get('/info',async ctx => {
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
```

## Ajax跨域

同源政策规定，`ajax`请求只能发给同源的网址，否则就报错。

解决方案

- JSONP
- 服务器代理
- CORS
- WebSocket

### Jsonp

实现一个简易jsonp：[https://github.com/f2e-learning/daily-code/tree/master/cors](https://github.com/f2e-learning/daily-code/tree/master/cors)

- 优点：简单适用，老式浏览器全部支持，服务器改造非常小。
- 缺点：只支持get请求。

基本思路是：向网页动态插入<script>元素，通过src向服务器请求数据，服务器收到请求后，将数据放在一个指定名字的回调函数里传回来，浏览器执行回调函数，在回调函数中去接受返回结果。

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


```javascript
// koa2
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

### 使用代理

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
// koa2
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

### Cors

跨源资源分享（Cross-Origin Resource Sharing），通过相应的请求头与响应头来实现跨域资源访问。
#### 参数

- **Access-Control-Allow-Origin**

如果将`Access-Control-Allow-Origin`的值设置为*，则会接受所有域的请求。这时的客户端不需要任何配置即可进行跨域访问。

- **Access-Control-Allow-Credentials**

与`Access-Control-Allow-Origin`相配套的，还有一个叫`Access-Control-Allow-Credentials`的响应头，如果设置为`true`则表明服务器允许该请求内包含`cookie`信息。

同时，在客户端，还需要在`ajax`请求中设置`withCredentials`属性为`true`。
```javascript
// axios 拦截器
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    config.withCredentials = true;
    return config;
}, err => {
    return Promise.reject(err);
});
```

- **Access-Control-Request-Headers**

该字段是一个逗号分隔的字符串，指定浏览器`CORS`请求会额外发送的头信息字段，上例是X-Custom-Header。


- **Access-Control-Request-Method**

该字段是必须的，用来列出浏览器的`CORS`请求会用到哪些`HTTP`方法。

#### 配置
完整的`cors`配置

```javascript
// koa2
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

### WebSocket

WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

## 非简单请求

只要同时满足以下两大条件，就属于简单请求。

（1) 请求方法是以下三种方法之一：

- HEAD
- GET
- POST

（2）HTTP的头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

jQuery的ajax默认`Content-Type`为`application/x-www-form-urlencoded`，所以是一个简单请求
Axios的默认`Content-Type`是没有的，所以是一个非简单请求
