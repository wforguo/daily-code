import React, { Component }from 'react';
import { Col, Input, Button, message } from 'antd';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'www',
            pwd: '123456'
        };
    }

    handleLogin = () => {
        message.success('Login success');
    };

    render() {
        return (
            <div>
                <Col>
                    <Input defaultValue={this.state.name}></Input>
                </Col>
                <Col>
                    <Input defaultValue={this.state.pwd}></Input>
                </Col>
                <Button type="primary" onClick={this.handleLogin}>登录</Button>
            </div>
        )

    }
}

export default Login
