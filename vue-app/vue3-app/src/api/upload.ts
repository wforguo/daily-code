/**
 * @Author: forguo
 * @Date: 2023/12/3 17:37
 * @Description: upload.ts
 */
import { request } from '@/libs'
import type { GenericAbortSignal } from 'axios'

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
 * @param abortKey
 */
export const uploadChunk = (data: any, onUploadProgress: any, abortKey: string) =>
    request({
        url: '/v1/common/upload/chunk',
        method: 'post',
        data,
        // 文件的上传配置请求头为form-data形式
        headers: {
            'Content-type': 'multipart/form-data;charset=UTF-8'
        },
        onUploadProgress,
        abortKey
    })

/**
 * 合并文件分片
 * @param data
 */
export const mergeChunks = (data: any) =>
    request({
        url: '/v1/common/upload/merge',
        method: 'post',
        data
    })
