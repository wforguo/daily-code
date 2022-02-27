/**
 * @author: forguo
 * @time: 2021/5/7 16:44
 * @description: koaBody / 请求体解析
 */

const koaBody = require("koa-body");
const path = require("path");

const middleware = koaBody({
    multipart: true, // 支持文件上传
    // encoding: 'gzip',
    formidable:{
        uploadDir: path.join(__dirname,'public/uploads/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin:(name,file) => { // 文件上传前的设置
            // console.log(`name: ${name}`);
            // console.log(file);
        },
    }
})

module.exports = middleware;
