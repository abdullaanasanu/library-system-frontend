import React, { Fragment } from 'react';
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Redirect, Link } from 'react-router-dom'

const { confirm } = Modal;

export default class LayoutClassNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "Library System",
            redirect: false
        }
    }

    logoutConfirm = () => {
        let _this = this;
        confirm({
            title: 'Are you sure to logout?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
              window.localStorage.removeItem('token')
              _this.setState({ redirect: true })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        }
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">{this.state.name}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/books">Books</Nav.Link>
                    <Nav.Link href="/students">Student</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>
                    {this.props.isLoggedIn ? (
                        <Nav.Link onClick={this.logoutConfirm}>Logout</Nav.Link>
                    ): (
                        <Fragment>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                        </Fragment>
                    )}
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

// export default LayoutClassNavbar;