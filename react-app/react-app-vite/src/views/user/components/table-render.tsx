import { Switch, Table, Tag, Transfer } from 'antd';
import difference from 'lodash/difference';
import {useEffect, useState } from 'react';
import axios from "axios";
import api from '@/api';
const columns = [
    {
        dataIndex: "id",
        title: "ID"
    },
    {
        dataIndex: "title",
        title: "Title"
    }
];
// Customize Table Transfer
const TableTransfer = ({ ...restProps }) => {
    const { targetKeys } = restProps;
    const [dataSource, setDataSource] = useState();
    const [totalDataSource, setTotalDataSource] = useState();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total: any) => `共 ${total} 条数`
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData({
            ...pagination
        });
    }, []);

    // 获取商品列表数据
    const fetchData =  (params: any) => {
        setLoading(true);
        try {
            const { search, pageSize: size = 10, current = 1 } = params;
            api.user.userList({
                _start: (params.current - 1) * params.pageSize,
                _limit: params.pageSize
            }).then((res: any) => {
                console.log(res);
                const total = res.length;
                setPagination({
                    ...pagination,
                    current,
                    pageSize: size,
                    total
                });
                setDataSource(res);
                setLoading(false);
            });
        } catch (e) {
            setLoading(false);
        }
    };
    return <Transfer {...restProps}
                     dataSource={dataSource}
                     rowKey={(record) => record.id}
    >
        {({
              direction,
              onItemSelectAll,
              onItemSelect,
              selectedKeys: listSelectedKeys,
              disabled: listDisabled,
          }) => {
            const rowSelection = {
                getCheckboxProps: (item: { disabled: any; }) => ({
                    disabled: listDisabled || item.disabled
                }),
                onSelectAll(selected: boolean, selectedRows: any[]) {
                    const treeSelectedKeys = selectedRows
                        .filter((item) => !item.disabled)
                        .map(({ id }) => id);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ id }: any, selected: boolean) {
                    onItemSelect(id, selected);
                },
                selectedRowKeys: listSelectedKeys
            };

            const handleTableChange = (newPagination) => {
                if (direction === "left") {
                    fetchData({
                        ...newPagination,
                    });
                }
            };

            const rightDataSource = totalDataSource.filter((item) =>
                targetKeys.includes(item.id)
            );

            const leftDataSource = dataSource.map((item) => ({
                ...item,
                disabled: targetKeys.includes(item.id)
            }));

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    loading={direction === "left" && loading}
                    dataSource={
                        direction === "left" ? leftDataSource : rightDataSource
                    }
                    size="small"
                    rowKey="id"
                    onRow={({ id, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled) return;
                            onItemSelect(id, !listSelectedKeys.includes(id));
                        }
                    })}
                    onChange={handleTableChange}
                    pagination={direction === "left" ? pagination : true}
                />
            );
        }}
    </Transfer>
};

const App = () => {
    const [targetKeys, setTargetKeys] = useState([]);

    const onChange = (targetKeys) => {
        setTargetKeys(targetKeys);
    };

    return (
        <>
            <TableTransfer
                targetKeys={targetKeys}
                onChange={onChange}
            />
        </>
    );
};

export default App;
