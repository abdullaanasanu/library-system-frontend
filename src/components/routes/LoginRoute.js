import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Login from "../profile/Login";
import TemplateLayout from "../layout/TemplateLayout";

export default class LoginRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        if (typeof window.localStorage.token !== 'undefined' && window.localStorage.token !== '') {
            this.setState({ isLoggedIn: true })
        }
        console.log('token', window.localStorage.token);
    }

    render() {
        return (
            <TemplateLayout isLoggedIn={this.state.isLoggedIn}>
                <Container>
                    <Row>
                        <Col style={{paddingTop: 50 }}>
                            <Login />
                        </Col>
                    </Row>
                </Container>
            </TemplateLayout>
        )
    }
}