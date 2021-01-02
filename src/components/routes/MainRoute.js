import React, { Fragment } from "react";
import TemplateLayout from "../layout/TemplateLayout";
import Profile from '../profile';
// import SignUp from "../profile/SignUp";
import 'antd/dist/antd.css';
// import Login from "./components/profile/Login";
import { Col, Container, Row } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'
// import LoginRoute from "./components/routes/LoginRoute";

class MainRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      redirect: false
    }
  }

  componentDidMount() {
    if (typeof window.localStorage.token !== 'undefined' && window.localStorage.token !== '' ) {
      this.setState({ isLoggedIn: true })
    }else{
      this.setState({ redirect: true })
    }
    console.log('token' ,window.localStorage.token);
  }

  loggedIn = () => {
    this.setState({ isLoggedIn: true })
  }

  render () {
    if (this.state.redirect) {
      console.log('state ', this.state.redirect);
      return <Redirect to="/login" />
    }
    return (
        <TemplateLayout isLoggedIn={this.state.isLoggedIn}>
          <Profile />
        </TemplateLayout>
    );
  }
}

export default MainRoute;
