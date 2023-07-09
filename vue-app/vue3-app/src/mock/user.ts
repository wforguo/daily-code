/**
 * @Author: forguo
 * @Date: 2022/7/14 16:42
 * @Description: user
 */
import Mock from 'mockjs'

// 获取 mock.Random 对象
const Random = Mock.Random;

export default [
    {
        url: "/api/user/login", // 请求url
        method: "post", // 请求方式
        timeout: 1000, // 超时时间
        statusCode: 200, // 返回的http状态码
        response: { // 返回的结果集
            uid: Random.id(),
            code: 200,
            message: "登录成功",
            data: {
                code: 200,
                message: "用户登录成功",
                signature: "www"
            },
        },
    },
    {
        url: "/api/search", // 请求url
        method: "post", // 请求方式
        timeout: 1000, // 超时时间
        statusCode: 200, // 返回的http状态码
        response: { // 返回的结果集
            time: '@now',
            code: 200,
            message: "success",
            'data|10': [{
                id: '@guid',
                name: '@cname',
                'age|20-30': 23,
                'city': '@city(true)',
            }]
        },
    },
    {
        url: "/api/search", // 请求url
        method: "get", // 请求方式
        timeout: 1000, // 超时时间
        statusCode: 200, // 返回的http状态码
        response: { // 返回的结果集
            time: '@now',
            code: 200,
            message: "success",
            'data|10': [{
                id: '@guid',
                name: '@cname',
                'age|20-30': 23,
                'city': '@city(true)',
            }]
        },
    },
];
