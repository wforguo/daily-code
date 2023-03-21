/**
 * @Author: forguo
 * @Date: 2022/5/16 21:29
 * @Description: request.ts.js
 */

import axios from 'axios'
import { log } from '@/plugin/index'

const request = axios.create({
    baseURL: '/api'
})

request.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-auth-token': import.meta.env.VITE_TOKEN
    }
    return config
})

request.interceptors.response.use(res => {
    if (res.status === 200) {
        return Promise.resolve(res.data)
    }
    log.danger(res)
    return Promise.reject(res)
})

export default request
