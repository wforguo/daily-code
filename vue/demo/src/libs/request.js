import axios from "axios";
import { Toast } from "vant";

class request {
    constructor() {
        this.config = {
            baseURL: 'https://forguo.cn',
            timeout: 10000,
        };
    }

    request(options) {
        const config = Object.assign({}, this.config, options);
        const instance = axios.create();
        this.setInterceptors(instance);
        return instance(config); // 返回axios实例的执行结果
    }

    setInterceptors(instance) {
        instance.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            config.headers.common['Authorization'] = 'Bearer ' + token;
            return config;
        }, err => {
            return Promise.reject(err);
        });
        instance.interceptors.response.use((res) => {
            console.log(JSON.stringify(res));
            if (res.status === 200 && res.data.code === 200) {
                return Promise.resolve(res.data);
            } else {
                Toast(res.data.message || res.statusText);
                if (res.data.code === 401) {
                    console.log('token失效，重新授权！')
                    localStorage.clear();
                    window.login();
                }
                return Promise.reject(res.data);
            }
        }, (err) => {
            console.log(JSON.stringify(err));
            Toast(err.data.message || err.statusText);
            return Promise.reject(err);
        })
    }
}
export default new request();
