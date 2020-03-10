import React, { Component } from 'react';
import "./PageStyle/LoginPageStyle.css"

import LoginForm from "../Components/LoginForm"

class LoginPage extends Component {
    render() {
        return (
            <div className="LoginContainer">
                <LoginForm />
            </div>
        )
    }
}

export default LoginPage;