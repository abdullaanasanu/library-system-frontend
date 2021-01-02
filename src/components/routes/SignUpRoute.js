import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TemplateLayout from "../layout/TemplateLayout";
import SignUp from "../profile/SignUp";

export default class SignUpRoute extends React.Component {

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
                            <SignUp />
                        </Col>
                    </Row>
                </Container>
            </TemplateLayout>
        )
    }
}