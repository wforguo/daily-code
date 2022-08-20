/**
 * @Author: forguo
 * @Date: 2022/6/11 21:54
 * @Description: util
 */

import axios from 'axios';
import {message, Modal} from "antd";
import qs from 'qs';

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL as string,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
    }
});
const onError = function (msg: string) {
    message.error(msg);
}
// 请求拦截
request.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
    };
    if (config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
        config.data = qs.stringify(config.data);
    }
    return config;
    }, (err) => Promise.reject(err)
);

// 响应拦截
request.interceptors.response.use((response) => {
    if (response.status === 200) {
        return Promise.resolve(response.data);
    } else {
        const msg = response.data.msg;
        onError(msg);
        return Promise.reject(response);
    }
}, error => {
    if (error.response?.status === 401) {
        return Modal.info({
            title: '会话超时，请重新登陆!',
            maskClosable: false,
            onOk() {
            }
        });
    }
    const msg = (error.response && error.response.data.msg) || error.message;
    onError(msg);
    return Promise.reject(error);
});

export default request;
