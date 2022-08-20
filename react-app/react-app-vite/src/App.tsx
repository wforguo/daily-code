/**
 * @Author: forguo
 * @Date: 2022/6/11 17:22
 * @Description: App.js
 */
import {ConfigProvider} from 'antd';
import AutoRoutes from "@/router/AutoRoutes";

export default function App () {
    return (
        <ConfigProvider componentSize='middle'>
            <AutoRoutes />
        </ConfigProvider>
    )
}
