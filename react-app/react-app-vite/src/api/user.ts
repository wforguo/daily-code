/**
 * @Author: forguo
 * @Date: 2022/6/11 22:30
 * @Description: user
 */
import request from "@/libs/request";

export default {
    userList: (params?: any) => request.get('https://jsonplaceholder.typicode.com/posts', {
        params
    })
}
