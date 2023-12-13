/**
 * @Author: forguo
 * @Description: request.ts.js
 */

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

export interface IResponse {
    code?: number
    message?: string
    time?: string | number
    data?: any
}

class Request {
    // axios实例
    instance: AxiosInstance
    // 用于存储控制器对象
    abortControllerMap: Map<string, AbortController>
    // 构造函数
    constructor(config?: AxiosRequestConfig) {
        // 创建axios实例
        this.instance = axios.create(config)
        // 用于存储控制器对象
        this.abortControllerMap = new Map()
        // 设置拦截器
        this.setInterceptors(this.instance)
    }
    // 请求
    request(config: AxiosRequestConfig): Promise<IResponse> {
        return this.instance(config)
    }
    /**
     * 错误处理
     * @param res
     */
    handleError(res: any) {
        const abortKey = `${res.config.url}${res.config.abortKey || ''}`
        // 请求完成后，将控制器实例从Map中移除
        this.abortControllerMap.delete(abortKey)
        if (axios.isCancel(res)) {
            console.log('Request canceled', res.message)
            return Promise.reject(res)
        }
        if (res.status === 200 && res.data.code === 200) {
            return Promise.resolve(res.data)
        } else {
            console.log('/*******************/')
            console.error(res)
            console.log('/*******************/')
            ElMessage.error(res.message || res.data?.message || '请求失败')
            return Promise.reject(res)
        }
    }
    // 拦截器
    setInterceptors(request: AxiosInstance) {
        // 请求拦截器
        request.interceptors.request.use((config: any) => {
            // toDo 也可以在这里做一个重复请求的拦截
            // https://github.com/axios/axios/tree/main#abortcontroller
            // 请求url为key
            const abortKey = `${config.url}${config.abortKey || ''}`
            // 实例化控制器
            const controller = new AbortController()
            // 将控制器实例与请求绑定
            config.signal = controller.signal
            // 将控制器实例存储到Map中
            this.abortControllerMap.set(abortKey, controller)
            const token = localStorage.getItem('token')
            if (config && config.headers && token) {
                config.headers = {
                    ...config.headers,
                    token
                }
            }
            return config
        })
        // 响应拦截器
        request.interceptors.response.use(
            (res: any) => this.handleError(res),
            (err: any) => this.handleError(err)
        )
    }
    /**
     * 取消全部请求
     */
    cancelAllRequest() {
        for (const [, controller] of this.abortControllerMap) {
            // 取消请求
            controller.abort()
        }
        this.abortControllerMap.clear()
    }
    /**
     * 取消指定的请求
     * @param abortKeys 待取消的请求URL
     */
    cancelRequest(abortKeys: string | string[]) {
        const abortMap = Array.isArray(abortKeys) ? abortKeys : [abortKeys]
        for (const abortKey of abortMap) {
            // 取消请求
            this.abortControllerMap.get(abortKey)?.abort()
            this.abortControllerMap.delete(abortKey)
        }
    }
}

export default Request
