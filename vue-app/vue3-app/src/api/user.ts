/**
 * @Author: forguo
 * @Date: 2022/7/14 13:58
 * @Description: user
 */
import { request } from '@/libs'

/**
 * 登录
 * @param {object} data
 */
export const login = (data: any) =>
    request({
        method: 'post',
        url: '/api/user/login',
        data
    })
