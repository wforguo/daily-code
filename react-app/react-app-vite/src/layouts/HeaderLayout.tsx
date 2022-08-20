/**
 * @Author: forguo
 * @Date: 2022/6/11 13:36
 * @Description: HeaderLayout.tsx
 */
import React, {useState} from "react";
import {Avatar, Col, Layout, Row} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import logo from '@/assets/imgs/logo.png';
import { useRecoilState } from "recoil";
import {globalAtom} from "@/state";
const { Header } = Layout;

const HeaderLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useRecoilState(globalAtom.collapsed);
    return (
        <Layout>
            <Header className="site-layout-header">
                <Row justify={'space-between'} align={'middle'} style={{
                    width: '100%',
                }}>
                    <Col span={12} style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'site-layout-collapsed-trigger',
                            onClick: () => setCollapsed(!collapsed),
                            title: collapsed ? '展开' : '隐藏'
                        })}
                        <img src={logo} title='logo' alt='vite-logo' className="site-layout-logo" />
                        <span>React管理系统</span>
                    </Col>
                    <Col span={12} style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}

export default HeaderLayout;
