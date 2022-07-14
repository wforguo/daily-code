/**
 * @Author: forguo
 * @Date: 2022/7/14 16:42
 * @Description: user
 */

export default [
    {
        url: "/users/login", // 请求url
        method: "post", // 请求方式
        timeout: 5000, // 超时时间
        statusCode: 200, // 返回的http状态码
        response: { // 返回的结果集
            code: 200,
            message: "登录成功",
            data: {
                code: 200,
                message: "用户登录成功",
                signature: "123456789"
            },
        },
    }
];
