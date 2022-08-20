import HeaderLayout from "@/layouts/HeaderLayout";
import {Layout} from "antd";
import SlideLayout from "@/layouts/SlideLayout";
import BreadLayout from "@/layouts/BreadLayout";
import PageLayout from "@/layouts/PageLayout";
import FooterLayout from "@/layouts/FooterLayout";

/**
 * @Author: forguo
 * @Date: 2022/6/12 18:14
 * @Description: 页面布局
 */
export default () => {
    return (
        <Layout>
            <HeaderLayout/>
            <Layout className='site-layout-container'>
                <SlideLayout/>
                <Layout className='site-layout-content'>
                    <BreadLayout/>
                    <PageLayout/>
                    <FooterLayout/>
                </Layout>
            </Layout>
        </Layout>
    )
}
