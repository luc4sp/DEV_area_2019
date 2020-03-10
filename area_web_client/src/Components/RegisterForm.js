import React, { Component } from 'react';
import "./ComponentsStyle/LoginForm.css";

import logo from "./ComponentsAssets/logo.png";
import github from "./ComponentsAssets/github.png";
import trello from "./ComponentsAssets/trello.png";

import axios from 'axios';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        let tmp = this.state;
        e.target.name === "firstname" && (tmp.firstName = e.target.value);
        e.target.name === "lastname" && (tmp.lastName = e.target.value);
        e.target.name === "email" && (tmp.email = e.target.value);
        e.target.name === "password" && (tmp.password = e.target.value);
        this.setState(tmp);
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        };

        console.log(user)

        axios.post(`http://lucaspoirel.ovh:8080/auth/signin`, {
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
         })
        .then(res => {
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("name", user.firstName + " " + user.lastName)
            window.localStorage.setItem("email", user.email)
            window.location.href = "/HomePage"
        })
    }

    render() {
        return (
            <form className="Login-container">
                <div className="bar">
                    <img alt="logo" src={logo} className="Logo"></img>
                </div>
                <div className="auth">
                    <label htmlFor="name">first name :</label>
                        <input onChange={this.handleChange} type="firstname" id="firstname" name="firstname"/>
                    <label htmlFor="name">last name :</label>
                        <input onChange={this.handleChange} type="lastname" id="lastname" name="lastname"/>
                    <label htmlFor="email">Email :</label>
                        <input onChange={this.handleChange} type="email" id="email" name="email"/>
                    <label htmlFor="password">Password :</label>
                        <input onChange={this.handleChange} type="password" id="password" name="password"/>
                </div>
                <div className="SocialButton github">
                    <img alt="github" src={github}></img>
                    <text>Register with Github</text>
                </div>
                <div className="SocialButton trell" >
                    <img alt="trello" src={trello}></img>
                </div>
                <div onClick={this.handleSubmit} className="ButtonAccept">Register</div>
                <a title="Login" href="/">already have an account ?</a>
            </form>
        )
    }
}

export default RegisterForm