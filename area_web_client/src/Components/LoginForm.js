import React, { Component } from 'react';

import "./ComponentsStyle/LoginForm.css";

import axios from 'axios';

import logo from "./ComponentsAssets/logo.png";
import github from "./ComponentsAssets/github.png";
import trello from './ComponentsAssets/trello.png'


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFetched: [],
            email: "",
            password: "",
            valid: false,
            data: [],
            isGitLogin: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let tmp = this.state;
        e.target.name === "email" && (tmp.email = e.target.value);
        e.target.name === "password" && (tmp.password = e.target.value);
        tmp.valid = !!(tmp.email.length && tmp.password.length);
        this.setState(tmp);
    }

    handleSubmit(e) {
        e.preventDefault();
        window.localStorage.setItem("wayConnect", "auth")

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post(`http://lucaspoirel.ovh:8080/auth/login`, {
            email: user.email,
            password: user.password
         })
        .then(res => {
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("id", res.data.user.id); 
            
            const config = {
                headers: { Authorization:`Bearer ${res.data.token}`}
            }
    
            axios.get(`http://lucaspoirel.ovh:8080/users/${res.data.user.id}`, config)
            .then(res => {
                window.localStorage.setItem("name", res.data.firstName + " " + res.data.lastName)
                window.localStorage.setItem("email", res.data.email)

                    window.localStorage.setItem("isGithubConnected", false)
                    window.localStorage.setItem("isTrelloConnected", false)
                    window.localStorage.setItem("isSpotifyConnected", false)
                    window.localStorage.setItem("isSlackConnected", false)
                    window.localStorage.setItem("isImgurConnected", false)

                window.location.href = "/HomePage"  
            })
        })
    }

    LogToGithub(e) {
        e.preventDefault();
        window.open('https://github.com/login/oauth/authorize?client_id=Iv1.6550254c46078825', "_self")
    }

    LogToTrello(e) {
        e.preventDefault();
        window.open('https://trello.com/1/authorize?expiration=1day&name=Area&scope=read,write,account&response_type=token&key=1b710789e2cb56480a610f5a0ae629f6&callback_method=fragment&return_url=http://lucaspoirel.ovh:3000/CallbackTrello', "_self")
    }

    render() { 
        return (
            <form className="Login-container">
                { this.isGitLogin ? this.data: null}
                <div className="bar">
                    <img alt="logo" src={logo} className="Logo"></img>
                </div>
                <div className="auth">
                    <label htmlFor="email">Email :</label>
                        <input onChange={this.handleChange} type="email" id="email" name="email"/>
                    <label htmlFor="password">Password :</label>
                        <input onChange={this.handleChange} type="password" id="password" name="password"/>
                </div>
                <div onClick={this.LogToGithub} className="SocialButton github" >
                    <img alt="github" src={github}></img>
                    Signin with Github
                </div>
                <div onClick={this.LogToTrello} className="SocialButton trell" >
                    <img alt="trello" src={trello}></img>
                    Signin
                </div>
                <div onClick={this.handleSubmit} type="submit" className="ButtonAccept">Log in</div>
                <a title="Register" href="/register">register to area</a>
            </form>
        )
    }
}

export default LoginForm