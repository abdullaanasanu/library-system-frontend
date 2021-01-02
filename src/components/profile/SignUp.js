import React from "react";
import { Fragment } from "react";
import { Form, Input, Button, Checkbox, Col, Result } from 'antd';
import { Container, Row } from "react-bootstrap";
import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: 'demo',
            password: '',
            showResult: false
        }
    }

    changeField = (label, e) => {
        console.log('eeee ', e.target.value);
        this.setState({ [label]: e.target.value })
    }

    signUpForm = (e) => {
        e.preventDefault()
        console.log('form Data ', this.state);
    }

    onFinish = e => {
        console.log('Form Values -> ', e);
        axios.post('http://localhost:3000/user/sign-up', {
            username: e.username,
            email: e.email,
            password: e.password
        }).then((res) => {
            console.log('Response Data ', res);
            this.setState({ showResult: true })
        }).catch((err) => {
            console.log('Error -> ', err);
        })
    }

    render() {
        return (
            <Fragment>
                <h1>Sign Up</h1>
                {this.state.showResult ? (
                    <Result
                        status="success"
                        title="Successfully Account Created!"
                        subTitle="Login to access your account that have been created!"
                    />
                ) : (
                    <Form
                        // {...layout}
                        name="basic"
                        // initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

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
                                Submit
                                        </Button>
                        </Form.Item>
                    </Form>
                )}
                {/* <form onSubmit={this.signUpForm}>
                                <input placeholder="Username" value={this.state.username} onChange={(e) => this.changeField('username', e)} />
                                <input placeholder="password" value={this.state.password} onChange={(e) => this.changeField('password', e)} />
                                <button>Submit</button>
                            </form> */}
                

            </Fragment>
        )
    }
}