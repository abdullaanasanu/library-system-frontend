import React, { Fragment } from "react";
import TemplateLayout from "./components/layout/TemplateLayout";
import Profile from './components/profile';
import MainRoute from './components/routes/MainRoute';
import SignUp from "./components/profile/SignUp";
import 'antd/dist/antd.css';
import Login from "./components/profile/Login";
import { Col, Container, Row } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import LoginRoute from "./components/routes/LoginRoute";
import SignUpRoute from './components/routes/SignUpRoute';
import BooksRoute from "./components/routes/BooksRoute";
import StudentRoute from "./components/routes/StudentRoute";
import ProfileRoute from "./components/routes/ProfileRoute";
import CounterRoute from "./components/routes/CounterRoute";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    if (typeof window.localStorage.token !== 'undefined' && window.localStorage.token !== '' ) {
      this.setState({ isLoggedIn: true })
    }
    console.log('token' ,window.localStorage.token);
  }

  loggedIn = () => {
    this.setState({ isLoggedIn: true })
  }

  render () {
    return (
      <Router>
        {/* <TemplateLayout isLoggedIn={this.state.isLoggedIn}>
          {this.state.isLoggedIn ? (
            <Profile />
          ): (
            <Container>
              <Row>
                <Col>
                  <SignUp />
                </Col>
                <Col>
                  <Login logIn={this.loggedIn} />
                </Col>
              </Row>
            </Container>
          )}
        </TemplateLayout> */}
        <Switch>
          <Route exact path="/">
            <MainRoute />
          </Route>
          <Route path="/login">
            <LoginRoute />
          </Route>
          <Route path="/sign-up">
            <SignUpRoute />
          </Route>
          <Route path="/books">
            <BooksRoute />
          </Route>
          <Route path="/students">
            <StudentRoute />
          </Route>
          <Route path="/profile">
            <ProfileRoute />
          </Route>
          <Route path="/counter">
            <CounterRoute />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
