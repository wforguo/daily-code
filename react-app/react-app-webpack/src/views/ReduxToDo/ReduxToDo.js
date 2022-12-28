import React, { Component } from "react";
import { Layout, List, Input, Row, Col, Button } from "antd";
import ReduxItem from "./ReduxItem";
import { connect } from 'react-redux'
import { getInputChangeAction, addToDoAction, delToDoAction, getListAction} from "../../redux/actions";

class ReduxToDo extends Component {
    // toDo值获取
    getTodo = (e) => {
        const { value } = e.target;
        this.props.getInputChangeAction(value);;
    };

    // toDo添加
    addTodo = () => {
        this.props.addToDoAction();
    };

    // toDo删除
    delTodo = (index) => {
        this.props.delToDoAction(index);
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
                    <ReduxItem key = { Math.random() * Math.random() }
                               item = { item.userName || item}
                               index = { index }
                               delTodo = { this.delTodo }/>
                )
            }
        />
    };

    componentDidMount() {
        let that = this;
        that.props.getListAction();
        // request({
        //     url: 'https://www.forguo.com/api/express/list',
        //     type: 'get'
        // }).then(res => {
        //     that.props.getListAction(res);
        // }, error => {
        //     console.log('error =>', error);
        // }).catch((error) => {
        //     console.log('catch =>', error);
        // });
    };

    render() {
        const { toDoList } = this.props;
        return (
            <Layout>
                <Row>
                    <Col span={16} offset={1}>
                        <Input placeholder={'toDo'} value={this.props.toDoItem} onChange={this.getTodo}/>
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

export default connect(
    (state) => state, {
    getInputChangeAction,
    addToDoAction,
    delToDoAction,
    getListAction
})(ReduxToDo);
