import React, { Fragment } from "react";
import TemplateLayout from "../layout/TemplateLayout";
import Profile from '../profile';
// import SignUp from "../profile/SignUp";
import 'antd/dist/antd.css';
// import Login from "./components/profile/Login";
import { Col, Container, Row } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'
import axios from "axios";
// import LoginRoute from "./components/routes/LoginRoute";

class ProfileRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      redirect: false,
      profileData: {}
    }
  }

  componentDidMount() {
    if (typeof window.localStorage.token !== 'undefined' && window.localStorage.token !== '' ) {
      this.setState({ isLoggedIn: true })
      axios.get('http://localhost:3000/user/profile', {
          headers: {
              Authorization: window.localStorage.token
          }
      })
        .then((res) => {
            console.log('Profile Data -> ', res.data);
            this.setState({ profileData: res.data });
        })
        .catch((err) => {
            console.log('Profile Error ', err.response.data.code);
            if (err.response.data.code === 1) {
                localStorage.removeItem('token')
                this.setState({ redirect: true })
            }
        })
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
            <div style={{textAlign: 'center'}}>
                <h1>Username: {typeof this.state.profileData.username !== 'undefined' && this.state.profileData.username}</h1>
                <h3>Email: {typeof this.state.profileData.email !== 'undefined' && this.state.profileData.email}</h3>
            </div>
        </TemplateLayout>
    );
  }
}

export default ProfileRoute;
