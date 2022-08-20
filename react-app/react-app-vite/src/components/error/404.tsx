/**
 * @Author: forguo
 * @Date: 2022/6/12 17:54
 * @Description: 404
 */
import {Link} from "react-router-dom";
import {Button, Result} from "antd";
import React from "react";

export default () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to='/'>
                <Button type='primary'>返回首页</Button>
            </Link>}
        />
    )
}
