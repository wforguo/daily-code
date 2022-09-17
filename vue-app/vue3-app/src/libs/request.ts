/**
 * @Author: forguo
 * @Date: 2022/5/16 21:29
 * @Description: request.ts.js
 */

import axios from "axios";

const request = axios.create();
request.interceptors.request.use((config) => {
    console.log(config);
    return config;
});

request.interceptors.response.use((res) => {
    console.log('res --->', res);
    if (res.status === 200) {
        return Promise.resolve(res.data);
    }
    return Promise.reject(res);
});

export default request;
