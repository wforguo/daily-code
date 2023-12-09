/**
 * @Author: forguo
 * @Date: 2023/12/3 17:37
 * @Description: upload.ts
 */
import { request } from '@/libs'

/**
 * Simulate a login
 * @param {object} data
 */
export const upload = (data: any) =>
    request({
        url: '/v1/common/upload',
        method: 'post',
        data
    })

/**
 * 上传文件分片
 * @param data
 * @param onUploadProgress
 */
export const uploadChunk = (data: any, onUploadProgress: any) =>
    request({
        url: '/v1/common/upload/chunk',
        method: 'post',
        data,
        // 文件的上传配置请求头为form-data形式
        headers: {
            'Content-type': 'multipart/form-data;charset=UTF-8'
        },
        onUploadProgress
    })

/**
 * 合并文件分片
 * @param data
 */
export const mergeChunks = (data: any) =>
    request({
        url: '/v1/common/upload/merge',
        method: 'post',
        data,
        onUploadProgress: (progressEvent: any) => {
            // 上传进度
            console.log(progressEvent.loaded, progressEvent.total)
        }
    })
