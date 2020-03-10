import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown'


import './ComponentsStyle/GithubForm.css'

class GithubForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isRepo: true,
            inputValue: "",
            repos: [],
            logins: [],
        }

        this.findRepo = this.findRepo.bind(this)
        this.findUser = this.findUser.bind(this)
        this.changeSearch = this.changeSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    changeSearch() {
        if (this.state.isRepo === false) {
            this.setState({
                isRepo: true
            })
        } else {
            this.setState({
                isRepo: false
            })
        }
    }

    findRepo() {
        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`},
        }

        axios.get(`http://lucaspoirel.ovh:8080/github/search/repos/${this.state.inputValue}`, config)
        .then(res => {
            var i = 0
            var tmp = []
            var login = []
            while( i < res.data.items.length) {
                tmp[i] = res.data.items[i].name
                login[i] = res.data.items[i].owner.login
                i++
            }
            this.setState({
                repos: tmp,
                logins: login
            })
        })
    }

    findUser() {
        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`},
        }
        window.localStorage.setItem("github-login", this.state.inputValue)

        axios.get(`http://lucaspoirel.ovh:8080/github/${this.state.inputValue}/repos`, config)
        .then(res => {
            var i = 0
            var tmp = []
            while( i < res.data.length) {
                tmp[i] = res.data[i].name
                i++
            }
            this.setState({
                repos: tmp,
            })
        })
    }

    selectRepo(e) {
        var i = this.state.repos.indexOf(e.value)
        window.localStorage.setItem("selectedRepo", e.value)
        window.localStorage.setItem("github-login", this.state.logins[i])
    }

    selectUserRepo(e) {
        window.localStorage.setItem("selectedRepo", e.value)
    }

    render() {
        
        return(
            <div className="github-form">
                <label>Search in github:</label>
                { this.state.isRepo ? <input value={this.state.inputValue} onChange={this.handleChange} onSubmit={this.findUser} placeholder="search in repositories" /> :
                                    <input value={this.state.inputValue} onChange={this.handleChange} onSubmit={this.findRepo} placeholder="search in usernames" />                    
                }
                <div className="switch-container">
                    <label>
                        <input type="radio" value="repositories" onChange={this.changeSearch} checked={this.state.isRepo} />
                        Search in repositories
                    </label>
                    <label>
                        <input type="radio" value="username" onChange={this.changeSearch} checked={!this.state.isRepo} />
                        Search in usernames
                    </label>
                </div>
                {
                    this.state.isRepo ? <button onClick={this.findRepo} value="search"> search</button>:
                    <button onClick={this.findUser} value="search"> search </button>
                }
                {
                    this.state.isRepo ? <Dropdown className="select" onChange={this.selectRepo.bind(this)} options={this.state.repos} placeholder="Show repositories" /> :
                    <Dropdown className="select" onChange={this.selectUserRepo.bind(this)} options={this.state.repos} placeholder="Show repositories" />
                }
                </div>
        )
    }
}

export default GithubForm;