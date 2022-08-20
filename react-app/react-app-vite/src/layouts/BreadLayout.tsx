/**
 * @Author: forguo
 * @Date: 2022/6/11 13:43
 * @Description: BreadLayout.tsx
 */
import {Breadcrumb, PageHeader} from "antd";
import React from "react";

const BreadLayout: React.FC = () => {
    const routes = [
        {
            path: 'index',
            breadcrumbName: 'First-level Menu',
        },
        {
            path: 'first',
            breadcrumbName: 'Second-level Menu',
        },
        {
            path: 'second',
            breadcrumbName: 'Third-level Menu',
        },
    ];
    return (
        <PageHeader
            style={{ marginBottom: 24 }}
            title="Title"
            breadcrumb={{ routes }}
            ghost={false}
            subTitle="This is a subtitle"
        />
    )
}
export default BreadLayout;
