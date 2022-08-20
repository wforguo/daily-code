/**
 * @Author: forguo
 * @Date: 2022/6/11 13:36
 * @Description: HeaderLayout.tsx
 */
import React from "react";
import {Layout, Menu} from "antd";
import {MenuFoldOutlined, UserOutlined} from "@ant-design/icons";
import {To, useLocation, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {globalAtom} from "@/state";
const {Sider} = Layout;

const SlideLayout: React.FC = (props) => {
    const [collapsed] = useRecoilState(globalAtom.collapsed);
    const navigate = useNavigate();
    const location = useLocation();
    const handleMenuNav = (item: { key: To; }) => {
        navigate(item.key);
        // 修改面包屑导航数据
    }
    const defaultOpenKeys = location.pathname
        .slice(1)
        .split('/')
        .reduce((arr, item, index) => {
            if (index === 0) {
                arr.push(`/${item}`);
            } else {
                arr.push(`${arr[index - 1]}/${item}`);
            }
            return arr;
        }, [] as string[]);

    const items = [
        { label: '列表', key: '/user/list', icon: <UserOutlined /> }, // 菜单项务必填写 key
        { label: '编辑', key: '/user/add', icon: <MenuFoldOutlined /> },
    ]
    return (
        <Sider theme={"light"} trigger={null} collapsible collapsed={collapsed} className='site-layout-slide'>
            <Menu
                className='site-layout-menu'
                theme="light"
                mode="inline"
                selectedKeys={[location.pathname]}
                defaultOpenKeys={defaultOpenKeys}
                items={items}
                onClick={(item) => {
                    handleMenuNav(item)
                }}
            />
        </Sider>
    )
}
export default SlideLayout
