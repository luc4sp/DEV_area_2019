import React, { Component } from 'react';

import './ComponentsStyle/TopBar.css';

import logout from './ComponentsAssets/logout.png'

class TopBar extends Component {

    constructor() {
        super();
        this.handleQuit = this.handleQuit.bind(this);
    }

    handleQuit() {
        window.localStorage.clear();
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("trello-token");
        window.localStorage.removeItem("github-code");

        window.localStorage.removeItem("profil_pic");
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("email");

        window.localStorage.removeItem("id");
        window.localStorage.removeItem("actions");
        window.localStorage.removeItem("reactions");

        window.location.reload();
    }

    openProfile() {
        window.location.href = "/ProfilePage"
    }

    openHomePage() {
        window.location.href = "/HomePage"
    }

    render() {
        let my;
        let pro;
        if(window.location.pathname === '/HomePage') {
            my = <div className="Text orange" onClick={this.openHomePage}>My connections</div>
        } else {
            my = <div className="Text green" onClick={this.openHomePage}>My connections</div>
        }

        if(window.location.pathname === '/ProfilePage') {
            pro = <div className="Text orange" onClick={this.openProfile}>{window.localStorage.getItem("name")}</div>
        } else {
            pro = <div className="Text green" onClick={this.openProfile}>{window.localStorage.getItem("name")}</div>
            
        }
        return (

            <div className="Bar-Container">
                <div className="Left-Buttons">
                    <img alt="logout" onClick={this.handleQuit} src={logout}></img>
                    {my}
                    <div onClick={this.props.handleOpen} className="Text green"> + Add Connection</div>
                    {pro}
                </div>
            </div>
        )
    }

}

export default TopBar;