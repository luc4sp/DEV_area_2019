import React, { Component } from 'react';
import "./PageStyle/LoginPageStyle.css"

import RegisterForm from "../Components/RegisterForm"

class RegisterPage extends Component {
    render() {
        return (
            <div className="LoginContainer">
                <RegisterForm />
            </div>
        )
    }
}

export default RegisterPage;