/**
 * @Author: forguo
 * @Date: 2022/7/14 13:58
 * @Description: user
 */
import axios from "axios";
import request from "@/libs/request";

export default {
    /**
     * Simulate a login
     * @param {object} data
     */
    login: (data: any) => request({
        method: 'post',
        url: 'https://www.forguo.cn/api/common/wechat/sdk',
        data
    })
}
