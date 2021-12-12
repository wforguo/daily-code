let express = require('express');
let createProxyMiddleware = require('http-proxy-middleware');
const ip = require("ip");
const path = require('path');
const cluster = require('cluster');
const numCpus = require('os').cpus().length;
const cors = require('cors');

// 命令参数传递
const api_url = process.argv[2] || 'https://forguo.cn';
const server_port = process.argv[3] || 10086;

let app = express();

let proxyOption = {
    target: api_url,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/'
    }
};

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api/*', createProxyMiddleware(proxyOption));

//allow custom header and CORS
app.all('*',function (req, res, next) {
    console.log(req);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');

    if (req.method === 'OPTIONS') {
        res.send(200); // 让options请求快速返回/
    }
    else {
        next();
    }
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    // 衍生工作进程。
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    app.listen(server_port, () => {
        console.log(`App running at:\n- Local:   http://localhost:${server_port}\n- Network: http://${ip.address()}:${server_port}`);
    });
    console.log(`工作进程 ${process.pid} 已启动`);
}
