import React, { Fragment, Component } from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'

export default class Profile extends Component {
    render() {
        return (
            <Fragment>
                <Avatar size="large" src="https://cdn.pixabay.com/photo/2020/12/16/10/44/cat-5836297__340.jpg" />
                <h1>My Profile</h1>
            </Fragment>
        )
    }
}