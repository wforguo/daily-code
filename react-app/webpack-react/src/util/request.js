/**
 *
 */
import axios from 'axios';
import { Modal } from "antd";

export default (params) => {
    return new Promise((resolve, reject) => {
        axios(params.url, {
            method: params.type,
            data: params.data
        }).then(res => {
            if (res.data.code === 200) {
                resolve(res.data.data);
            } else {
                console.log(res);
                Modal.warning({
                    title: '请求错误',
                    content: res.data.message || '请求错误！',
                });
            }
        }, error => {
            reject(error);
            console.log('error =>', error);
        }).catch(error => {
            reject(error);
            console.log('catch =>',error);
        });
    });
};
