/**
 * @Author: forguo
 * @Date: 2022/7/14 13:58
 * @Description: user
 */
import { request } from '@/libs'

export default {
    /**
     * Simulate a login
     * @param {object} data
     */
    login: (data: any) =>
        request({
            method: 'post',
            url: '/api/user/login',
            data
        })
}
