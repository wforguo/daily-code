/**
 * @Author: forguo
 * @Date: 2021/8/22 12:32
 * @Description: 首页/概览
 */

import React from 'react';
import {Typography, Card, Layout} from 'antd';

const { Title } = Typography;

export default class Home extends React.Component {
    render() {
        return (
            <Layout>
                <Card title="欢迎使用与会，您的参会管家！">
                    <Title level={5}>📅 活动管理</Title>
                    <Title level={5}>📝 签到注册</Title>
                    <Title level={5}>📃 导入导出</Title>
                    <Title level={5}>📈 数据统计</Title>
                    <Title level={5}>🔢 线上投票</Title>
                </Card>
            </Layout>
        )
    }
}
