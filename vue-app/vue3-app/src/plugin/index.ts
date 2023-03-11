/**
 * @Author: forguo
 * @Date: 2023/2/20 17:35
 * @Description: index.js
 */
import log from '@/plugin/log'
import request from '@/plugin/request'
import ajax from '@/plugin/ajax'

// 使用 export{}，导出与声明分开
export { log, request, ajax }

export default {
    async install(app: any) {
        app.config.globalProperties.$log = log
        app.config.globalProperties.$http = request
        app.config.globalProperties.$ajax = ajax
    }
}
