/**
 * @Author: forguo
 * @Date: 2022/6/11 13:43
 * @Description: PageLayout.tsx
 */
import React from "react";
import {Outlet} from "react-router-dom";
import {Layout, Row } from "antd";
import PageLoading from "@/components/PageLoading";
const { Content } = Layout;

const PageLayout: React.FC = () => {
    return (
        <Content className="site-layout-page">
            <React.Suspense
                fallback={
                    <Row align='middle' justify='center' style={{ width: '100%', height: '100%' }}>
                        <PageLoading />
                    </Row>
                }>
                <Outlet />
            </React.Suspense>
        </Content>
    )
}
export default PageLayout;
