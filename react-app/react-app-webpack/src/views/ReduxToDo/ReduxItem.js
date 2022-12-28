import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Button, Typography, Row, Col } from "antd";
import './redux-todo.css'
const Text = Typography;
class ReduxItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    delTodo = () => {
        const { delTodo, index } = this.props;
        delTodo(index);
    };

    // componentWillMount() {
    //     console.log('componentWillMount----组件将要挂载到页面的时刻')
    // }
    //
    // componentDidMount() {
    //     console.log('componentDidMount----组件挂载完成的时刻执行')
    // }

    render() {
        // console.log('render---组件挂载中.......');
        const { item } = this.props;
        return (
            <Row key = { Math.random() * Math.random() } className={'todo-item'}>
                <Col span={16}>
                    <Text>{ item }</Text>
                </Col>
                <Col span={7}>
                    <Button
                        type={'link'}
                        danger size={'small'}
                        onClick = { this.delTodo }
                    >删除</Button>
                </Col>
            </Row>
        )
    }
}

// props的校验
ReduxItem.propTypes = {
    item: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// 默认值
ReduxItem.defaultProps = {
    item: 'toDoItem'
};

export default ReduxItem;
