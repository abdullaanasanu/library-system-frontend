import React from "react";
import { Fragment } from "react";
import { Form, Input, Button, Checkbox, Col, Alert } from 'antd';
import { Container, Row } from "react-bootstrap";
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showError: false,
            redirect: false
        }
    }

    onFinish = e => {
        console.log('Form Values -> ', e);
        axios.post('http://13.212.72.237:3000/user/login', {
            email: e.email,
            password: e.password
        }).then((res) => {
            console.log('Response Data ', res.data.token);
            window.localStorage.setItem('token', res.data.token)
            this.setState({ redirect: true})
            // this.props.logIn();
        }).catch((err) => {
            console.log('Error -> ', err);
            this.setState({showError: true})
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <Fragment>
                <h1>LogIn</h1>
                {/* <form onSubmit={this.signUpForm}>
                                <input placeholder="Username" value={this.state.username} onChange={(e) => this.changeField('username', e)} />
                                <input placeholder="password" value={this.state.password} onChange={(e) => this.changeField('password', e)} />
                                <button>Submit</button>
                            </form> */}
                {this.state.showError && (
                    <Alert
                        message="Login Failed!"
                        description="Invalid Email & Password"
                        type="error"
                        showIcon
                        style={{ marginBottom: '20px'}}
                    />
                )}
                <Form
                    // {...layout}
                    name="basic"
                    // initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                // onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            LogIn
                                    </Button>
                    </Form.Item>
                </Form>

            </Fragment>
        )
    }
}