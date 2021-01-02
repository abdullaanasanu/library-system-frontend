import React, { Fragment } from "react";
import axios from 'axios'
import TemplateLayout from "../layout/TemplateLayout";
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Alert, Select, message, Table, Modal } from 'antd';
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'

const { Option } = Select;

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class BooksRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            redirect: false,
            authors: [],
            categories: [],
            books: [],
            isAuthorLoading: true,
            visibleAddModal: false,
            visibleUpdateModal: false,
            updateData: {},
            updateComponent: ''
        }
    }

    componentDidMount() {
        if (typeof window.localStorage.token !== 'undefined' && window.localStorage.token !== '') {
            this.setState({ isLoggedIn: true })
        } else {
            this.setState({ redirect: true })
        }
        console.log('token', window.localStorage.token);
        axios.get('http://localhost:3000/author/list')
            .then((res) => {
                console.log('Authors Data -> ', res.data.authors);
                this.setState({ authors: res.data.authors, isAuthorLoading: false })
            })
        axios.get('http://localhost:3000/category/list')
            .then((res) => {
                console.log('Category Data -> ', res.data.categories);
                this.setState({ categories: res.data.categories })
            })
        axios.get('http://localhost:3000/book/list')
            .then((res) => {
                console.log('Book Data -> ', res.data.books);
                this.setState({ books: res.data.books })
            })
    }

    loggedIn = () => {
        this.setState({ isLoggedIn: true })
    }

    updateBook = (id, data) => {
        console.log('Update ID -> ', id);
        this.setState({
            visibleUpdateModal: true,
            updateData: data,
            updateComponent: <UpdateBook authors={this.state.authors} categories={this.state.categories} data={data} />
        })
    }

    deleteBook = (id) => {
        console.log('Delete ID -> ', id);
    }

    showAddModal = () => {
        this.setState({
            visibleAddModal: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visibleAddModal: false,
            visibleUpdateModal: false,
            updateData: {},
            updateComponent: ''
        })
    }

    render() {
        if (this.state.redirect) {
            console.log('state ', this.state.redirect);
            return <Redirect to="/login" />
        }
        return (
            <TemplateLayout isLoggedIn={this.state.isLoggedIn}>
                <ListBook books={this.state.books} updateBook={this.updateBook} deleteBook={this.deleteBook} showAddModal={this.showAddModal} />
                <Modal
                    visible={this.state.visibleAddModal}
                    title="Add Book"
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        // <Button key="back" onClick={this.handleCancel}>
                        // Return
                        // </Button>,
                        // <Button key="submit" type="primary" onClick={this.handleOk}>
                        // Submit
                        // </Button>,
                    ]}
                >
                    <AddBook authors={this.state.authors} categories={this.state.categories} />
                </Modal>
                <Modal
                    visible={this.state.visibleUpdateModal}
                    title="Update Book"
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        // <Button key="back" onClick={this.handleCancel}>
                        // Return
                        // </Button>,
                        // <Button key="submit" type="primary" onClick={this.handleOk}>
                        // Submit
                        // </Button>,
                    ]}
                >
                    {this.state.updateComponent}
                </Modal>
            </TemplateLayout>
        );
    }
}

class AddBook extends React.Component {

    onFinish = e => {
        console.log('Add Book Data --> ', e);
        axios.post('http://localhost:3000/book/add', {
            name: e.name,
            authorId: e.author,
            categoryId: e.category
        }).then((res) => {
            message.success('Book Added');
        })
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            {/* <h1>Add Book</h1> */}
                            <Form
                                // {...layout}
                                name="basic"
                                // initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                            // onFinishFailed={onFinishFailed}
                            >

                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Author"
                                    name="author"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Select
                                        placeholder="Select a option and change input text above"
                                        onChange={this.onAuthorChange}
                                        allowClear
                                    >
                                        {this.props.authors.map(e =>
                                            <Option value={e.id}>{e.name}</Option>
                                        )}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Select
                                        placeholder="Select a option and change input text above"
                                        onChange={this.onAuthorChange}
                                        allowClear
                                    >
                                        {this.props.categories.map(e =>
                                            <Option value={e.id}>{e.name}</Option>
                                        )}
                                    </Select>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block size="large">
                                        Add
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </Fragment>
        )
    }
}


class UpdateBook extends React.Component {

    onFinish = e => {
        console.log('Add Book Data --> ', e);
        axios.post('http://localhost:3000/book/add', {
            name: e.name,
            authorId: e.author,
            categoryId: e.category
        }).then((res) => {
            message.success('Book Added');
        })
    }

    render() {
        console.log('Update Data in Comp -> ', this.props);
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            {/* <h1>Add Book</h1> */}
                            <Form
                                // {...layout}
                                name="basic"
                                initialValues={{ name: this.props.data.name }}
                                onFinish={this.onFinish}
                            // onFinishFailed={onFinishFailed}
                            >

                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Author"
                                    name="author"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Select
                                        placeholder="Select a option and change input text above"
                                        onChange={this.onAuthorChange}
                                        allowClear
                                    >
                                        {this.props.authors.map(e =>
                                            <Option value={e.id}>{e.name}</Option>
                                        )}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Select
                                        placeholder="Select a option and change input text above"
                                        onChange={this.onAuthorChange}
                                        allowClear
                                    >
                                        {this.props.categories.map(e =>
                                            <Option value={e.id}>{e.name}</Option>
                                        )}
                                    </Select>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block size="large">
                                        Add
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </Fragment>
        )
    }
}


class ListBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookTableColumn: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'Author',
                    dataIndex: 'author',
                    key: 'author',
                    render: (text, record, index) => {
                        return <p>{record.author.name}</p>
                    }
                },
                {
                    title: 'Category',
                    dataIndex: 'category',
                    key: 'category',
                    render: (text, record, index) => {
                        if (record.category !== null) {
                            return <p>{record.category.name}</p>
                        }else{
                            return <p>NIL</p>
                        }
                    }
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    render: (text, record, index) => {
                        return (
                            <Fragment>
                                <Button type="primary" onClick={() => this.props.updateBook(record._id, record)}>Update</Button><Button type="danger" style={{ marginLeft: 5 }} onClick={() => this.props.deleteBook(record._id)}>Delete</Button>
                            </Fragment>
                        )
                    }
                }
            ]
        }
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <h1>List Book</h1>
                            <Button type="primary" size="large" onClick={this.props.showAddModal} style={{ position: 'absolute', top: 15, right: 20 }}>Add Book</Button>
                            <Table columns={this.state.bookTableColumn} dataSource={this.props.books} />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default BooksRoute;
