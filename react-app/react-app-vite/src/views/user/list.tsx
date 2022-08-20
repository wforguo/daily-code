/**
 * @Author: forguo
 * @Date: 2022/5/28 14:34
 * @Description: 列表
 */
import {Button, Space, Table, Tag } from 'antd';
import UpdateModal from "./components/UpdateModal";
import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import api from '@/api'

const UserList: React.FC = () => {
    const navigate = useNavigate();
    const handleAdd = () => {
        navigate('/user/add');
    }
    const handleEdit = (item: any) => {
        console.log(item);
        navigate(`user/add?id=${item.key}`);
    }

    useEffect(() => {
        api.user.userList().then((res: any) => {
        })
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_: any, record: { tags: string[]; }) => {
                const { tags } = record;
                return <>
                    {
                        tags.map((tag: string) => {
                            if (tag) {
                                let color = tag.length > 5 ? 'geekblue' : 'green';

                                if (tag === 'loser') {
                                    color = 'volcano';
                                }
                                return (
                                    <Tag color={color} key={tag}>
                                        {tag.toUpperCase()}
                                    </Tag>
                                );
                            }
                        })}
                </>
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: {name: string}) => (
                <Space size="middle">
                    <a onClick={() => {
                        handleEdit(record);
                    }}>编辑</a>
                    <a>删除</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <>
            <Button
                type={'primary'}
                onClick={() => {
                    handleAdd()
                }}
            >
                添加用户
            </Button>
            <UpdateModal title='用户信息编辑' />
            <Table columns={columns} dataSource={data} />
        </>
    )
}
export default UserList;
