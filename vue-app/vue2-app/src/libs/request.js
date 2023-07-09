import axios from 'axios'
import { Message } from 'element-ui'

class Request {
    constructor(config) {
        this.config = {
            baseURL: 'https://forguo.cn',
            timeout: 10000
        }
        // 创建axios实例
        const options = Object.assign({}, this.config, config)
        this.instance = axios.create(options)
        // 设置拦截器
        this.setInterceptors(this.instance)
    }

    request(config) {
        return this.instance.request(config) // 返回axios实例的执行结果
    }

    setInterceptors(instance) {
        instance.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token')
                if (token) {
                    config.headers.common['Authorization'] = 'Bearer ' + token
                }
                // config.withCredentials = true;
                return config
            },
            err => {
                return Promise.reject(err)
            }
        )
        instance.interceptors.response.use(
            res => {
                if (res.status === 200 && res.data.code === 200) {
                    return Promise.resolve(res.data)
                } else {
                    Message.warning(res.data.message || res.statusText)
                    if (res.data.code === 401) {
                        console.log('token失效，重新授权！')
                        localStorage.clear()
                        window.login()
                    }
                    return Promise.reject(res.data)
                }
            },
            err => {
                Message.warning(err.data.message || err.statusText)
                return Promise.reject(err)
            }
        )
    }
}

const request = new Request()

export default request
