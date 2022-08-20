/**
 * @Author: forguo
 * @Date: 2022/5/28 16:45
 * @Description: 修改信息
 */

import FormRender, {useForm} from "form-render";
import {Button} from "antd";
import React from "react";
import style from './UpdateModal.module.less';
interface Props {
    title: string,
}

const schema = {
    type: 'object',
    properties: {
        input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
        },
        select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
        }
    }
};

// React.FC 代表React Function Component的接口
const UpdateModal: React.FC<Props> = ({title}) => {
    const form = useForm();
    const onFinish = (formData: any, errors: any) => {
        console.log('formData:', formData, 'errors', errors);
    };
    return (
        <div className={style.updateModal}>
            <h2>{ title }</h2>
            <FormRender form={form} schema={schema} onFinish={onFinish} />
            <Button type="primary" onClick={form.submit}>
                提交
            </Button>
        </div>
    );
};
export default UpdateModal;
