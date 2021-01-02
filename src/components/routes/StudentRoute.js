import React, { Fragment } from "react";
import axios from 'axios'
import TemplateLayout from "../layout/TemplateLayout";
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Alert, Select, message, Table, Modal } from 'antd';
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';

const { Option } = Select;
const { confirm } = Modal;

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class StudentRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            redirect: false,
            authors: [],
            categories: [],
            students: [],
            isAuthorLoading: true,
            visibleAddModal: false,
            visibleUpdateModal: false,
            updateData: {},
            updateComponent: '',
            studentTableColumn: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'Admission No.',
                    dataIndex: 'admissionNo',
                    key: 'admissionNo'
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    render: (text, record, index) => {
                        return (
                            <Fragment>
                                <Button type="primary" onClick={() => this.props.updateStudent(record._id, record)}>Update</Button><Button type="danger" style={{ marginLeft: 5 }} onClick={() => this.props.deleteStudent(record._id)}>Delete</Button>
                            </Fragment>
                        )
                    }
                }
            ]
        }
    }

    componentDidMount() {
        if (typeof window.localStorage.token !== 'undefined' && window.localStorage.token !== '') {
            this.setState({ isLoggedIn: true })
        } else {
            this.setState({ redirect: true })
        }
        console.log('token', window.localStorage.token);
        axios.get('http://13.212.72.237:3000/author/list')
            .then((res) => {
                console.log('Authors Data -> ', res.data.authors);
                this.setState({ authors: res.data.authors, isAuthorLoading: false })
            })
        axios.get('http://13.212.72.237:3000/category/list')
            .then((res) => {
                console.log('Category Data -> ', res.data.categories);
                this.setState({ categories: res.data.categories })
            })
        axios.get('http://13.212.72.237:3000/student/list')
            .then((res) => {
                console.log('Student Data -> ', res.data.students);
                this.setState({ students: res.data.students })
            })
    }

    loggedIn = () => {
        this.setState({ isLoggedIn: true })
    }

    updateStudent = (id, data) => {
        console.log('Update ID -> ', id);
        this.setState({
            visibleUpdateModal: true,
            updateData: data,
            updateComponent: <UpdateStudent authors={this.state.authors} categories={this.state.categories} data={data} />
        })
    }

    deleteStudent = (id) => {
        console.log('Delete ID -> ', id);
        let _this = this;
        confirm({
            title: 'Are you sure delete this student?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            okText: 'Sure',
            okType: 'danger',
            cancelText: 'Not Now',
            onOk() {
                console.log('OK');
                _this.confirmDeleteStudent(id)
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    confirmDeleteStudent = (id) => {
        let _this = this;
        axios.delete('http://13.212.72.237:3000/student/remove/'+id)
            .then((res) => {
                message.success('Student Removed!')
                let studentList = _.reject(this.state.students, {
                    id: id
                })
                console.log('Updated Student List', studentList);
                _this.setState({
                    students: studentList
                })
            })
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

    addStudentAction = (newStudentData) => {
        console.log('data ', newStudentData);
        let StudentList = this.state.students;
        StudentList.push(newStudentData)
        this.setState({
            students: StudentList
        })
    }

    render() {
        console.log('studentttt ', this.state.students);
        if (this.state.redirect) {
            console.log('state ', this.state.redirect);
            return <Redirect to="/login" />
        }
        return (
            <TemplateLayout isLoggedIn={this.state.isLoggedIn}>
                {/* <ListStudent students={this.state.students} updateStudent={this.updateStudent} deleteStudent={this.deleteStudent} showAddModal={this.showAddModal} /> */}
                <Container>
                    <Row>
                        <Col>
                            <h1>List Student</h1>
                            <Button type="primary" size="large" onClick={this.showAddModal} style={{ position: 'absolute', top: 15, right: 20 }}>Add Student</Button>
                            {/* <Table columns={this.state.studentTableColumn} dataSource={this.state.students} /> */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Admission No.</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.students.map( e => {
                                        return (
                                            <tr>
                                                <td>{e.name}</td>
                                                <td>{e.admissionNo}</td>
                                                <td>
                                                    <Button type="primary" onClick={() => this.updateStudent(e.id, e)}>Update</Button><Button type="danger" style={{ marginLeft: 5 }} onClick={() => this.deleteStudent(e.id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
                <Modal
                    visible={this.state.visibleAddModal}
                    title="Add Student"
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
                    <AddStudent authors={this.state.authors} categories={this.state.categories} addStudentAction={this.addStudentAction} />
                </Modal>
                <Modal
                    visible={this.state.visibleUpdateModal}
                    title="Update Student"
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

class AddStudent extends React.Component {

    onFinish = e => {
        console.log('Add Student Data --> ', e);
        axios.post('http://13.212.72.237:3000/student/add', {
            name: e.name,
            admissionNo: e.admissionNo
        }).then((res) => {
            message.success('Student Added');
            this.props.addStudentAction({
                id: res.data.id,
                name: e.name,
                admissionNo: e.admissionNo
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            {/* <h1>Add Student</h1> */}
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
                                    label="Admission No."
                                    name="admissionNo"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
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


class UpdateStudent extends React.Component {

    onFinish = e => {
        console.log('Add Student Data --> ', e);
        axios.post('http://13.212.72.237:3000/book/add', {
            name: e.name,
            authorId: e.author,
            categoryId: e.category
        }).then((res) => {
            message.success('Student Added');
        })
    }

    render() {
        console.log('Update Data in Comp -> ', this.props);
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            {/* <h1>Add Student</h1> */}
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


class ListStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentTableColumn: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'Admission No.',
                    dataIndex: 'admissionNo',
                    key: 'admissionNo'
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    render: (text, record, index) => {
                        return (
                            <Fragment>
                                <Button type="primary" onClick={() => this.props.updateStudent(record._id, record)}>Update</Button><Button type="danger" style={{ marginLeft: 5 }} onClick={() => this.props.deleteStudent(record._id)}>Delete</Button>
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
                            <h1>List Student</h1>
                            <Button type="primary" size="large" onClick={this.props.showAddModal} style={{ position: 'absolute', top: 15, right: 20 }}>Add Student</Button>
                            <Table columns={this.state.studentTableColumn} dataSource={this.props.students} />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default StudentRoute;
