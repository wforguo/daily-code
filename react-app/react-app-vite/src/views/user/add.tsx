import React from "react";
import { Select, Button } from "antd";
import Form, { useForm } from "form-render";

const schema = {
    type: "object",
    properties: {
        string: {
            title: "网址输入自定义组件",
            type: "string",
            widget: "site",
            required: true,
            enum: [],
            enumNames: []
        },
        select: {
            title: "单选",
            type: "number",
            enum: [1, 2, 3],
            enumNames: ["选项1", "选项2", "选项3"]
        }
    }
};

const SiteInput = (props: { value: any; }) => {
    console.log("widget props:", props);
    return (
        <Select
            style={{ width: '100%' }}
            placeholder="请选择"
            options={[
                {
                    label: "A",
                    value: "A"
                },
                {
                    label: "B",
                    value: "B"
                }
            ]}
            value={props.value || ""}
            onChange={(value) => {
                props.onChange(value);
                console.log(value);
            }}
            allowClear
        />
    );
};

const Demo = () => {
    const form = useForm();
    return (
        <div>
            <Form
                form={form}
                schema={schema}
                widgets={{ site: SiteInput }}
                onFinish={(formData) => console.log(JSON.stringify(formData, null, 2))}
            />
            <Button type="primary" onClick={form.submit}>
                提交
            </Button>
            <Button type="primary" onClick={() => {
                form.setValueByPath("string", "B");
                form.submit();
            }}>
                初始化
            </Button>
        </div>
    );
};

export default Demo;
