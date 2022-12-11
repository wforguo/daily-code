import React, { Component } from "react";
import { Layout, List, Input, Row, Col, Button } from "antd";
import ToDoItem from "./ToDoItem";
import store from "../../store";
import { getInputChangeAction, addToDoAction, delToDoAction, getListAction } from "../../store/actions/actionCreators";
import request from "../../util/request";
class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        // 注册监听器
        store.subscribe(this.handleStoreChange);
    }

    // toDo值获取
    getTodo = (e) => {
        const { value } = e.target;
        // ES6 return 简写
        // this.setState(() => ({
        //     toDoItem: value
        // }));
        const action = getInputChangeAction(value);
        store.dispatch(action);
    };

    // store数据改变
    handleStoreChange = () => {
        this.setState(store.getState());
    };

    // toDo添加
    addTodo = () => {

        // this.setState((prevState) => ({
        //     toDoList: [...prevState.toDoList, prevState.toDoItem || Math.random()],
        //     toDoItem: ''
        // }));

        const action = addToDoAction();
        store.dispatch(action);
    };

    // toDo删除
    delTodo = (index) => {
        // this.setState((prevState) => {
        //     const toDoList = [...prevState.toDoList]
        //     toDoList.splice(index, 1);
        //     return { toDoList };
        // });

        const action = delToDoAction(index);
        store.dispatch(action);
    };

    // toDo列表
    getToDoList = (toDoList) => {
        return  <List
            size="small"
            header={<div>toDoList</div>}
            bordered
            dataSource={ toDoList }
            renderItem={(item, index) =>
                (
                    <ToDoItem key = { Math.random() * Math.random() }
                              item = { item.userName || item }
                              index = { index }
                              delTodo = { this.delTodo}/>
                )
            }
        />
    };

    componentDidMount() {
        request({
            url: 'https://www.forguo.cn/api/weixin/share',
            type: 'get'
        }).then(res => {
            const action = getListAction(Array.from(res) || []);
            store.dispatch(action);
        }, error => {
            console.log('error =>', error);
        }).catch((error) => {
            console.log('catch =>', error);
        });
    };

    render() {
        const { toDoList } = this.state;
        return (
            <Layout>
                <Row>
                    <Col span={14} offset={1}>
                        <Input placeholder={'toDo'}
                               value={ this.state.toDoItem }
                               onChange={ this.getTodo }></Input>
                    </Col>
                    <Col span={3} offset={1}>
                       <Button type={ "primary" } onClick={ this.addTodo }>添加</Button>
                    </Col>
                </Row>
                {
                    this.getToDoList(toDoList)
                }
            </Layout>
        );
    }
}
export default ToDoList;
