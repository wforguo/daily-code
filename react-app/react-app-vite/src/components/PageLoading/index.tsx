/**
 * @Author: forguo
 * @Date: 2022/6/12 17:57
 * @Description: index
 */
import {Spin} from "antd";
import React from "react";
import {LoadingOutlined} from "@ant-design/icons";

export default () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return <Spin indicator={antIcon} />
};
