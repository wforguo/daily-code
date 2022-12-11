import React, { Component } from "react";
import { Button, Typography, Row, Col } from "antd";
import './todo-item.css';
const Text = Typography;
class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    delTodo = () => {
        const { delTodo, index } = this.props;
        delTodo(index);
    };

    render() {
        const { item } = this.props;
        return (
            <Row key = { Math.random() * Math.random() } className={'todo-item'}>
                <Col span={16}>
                    <Text>{ item }</Text>
                </Col>
                <Col span={8}>
                    <Button
                        danger size={'small'}
                        onClick = { this.delTodo }
                    >删除</Button>
                </Col>
            </Row>
        )
    }
};

export default ToDoItem;
