/**
 * @Author: forguo
 * @Date: 2023/2/20 17:35
 * @Description: index.js
 */
export { default as log } from '@/libs/log'
export { default as ajax } from '@/libs/ajax'
export * from '@/libs/utils'
import Request from '@/libs/request'
import type { AxiosRequestConfig } from 'axios'

const instance = new Request()

// 请求
export const request = (config: AxiosRequestConfig) => {
    return instance.request(config)
}

// 取消请求
export const cancelRequest = (url: string) => {
    return instance.cancelRequest(url)
}
