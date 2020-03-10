
import React, { Component } from 'react';

import axios from 'axios';

import ReactLoading from 'react-loading'
import './PageStyle/Callback.css'

class Callback extends Component {

    componentDidMount() {
        var url = window.location.href;

        var tmp
        var tab = url.split('=');
        var code = tab[1];
        window.localStorage.setItem("github-code", code);

        /// url to app settings: https://github.com/settings/applications/1210435

        var post_request = 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=Iv1.6550254c46078825&client_secret=d72a2c68efee3de120e8e7158b09ce34290202de&code=' + code;
        axios.post(post_request)
        .then(res => {  

            tmp = res.data
            var responses = tmp.split("&")
            var access = responses[0].split("=")
            window.localStorage.setItem("github-token", access[1])

            if (window.localStorage.getItem("token") === null) {
                const config = {
                    headers: { Authorization:`token ${window.localStorage.getItem("github-token")}`}
                }
        
                axios.get(`https://api.github.com/user`, config)
                .then(res => {
                    console.log(res)
                    window.localStorage.setItem("name", res.data.name)
                    if (res.data.email === undefined) {
                        window.localStorage.setItem("email", res.data.login + "@area.com")
                    } else {
                        window.localStorage.setItem("email", res.data.email)
                    }
                    window.localStorage.setItem("profil_pic", res.data.avatar_url)
    
                    axios.post(`http://lucaspoirel.ovh:8080/auth/postEmail`, {
                        email: window.localStorage.getItem("email"),
                        client_id: "Iv1.6550254c46078825"
                    })
                    .then(res => {
                        window.localStorage.setItem("token", res.data.token)
                        window.localStorage.setItem("id", res.data.user.id)
    
                        window.localStorage.setItem("isGithubConnected", true)
                        window.localStorage.setItem("isTrelloConnected", false)
                        window.localStorage.setItem("isSpotifyConnected", false)
                        window.localStorage.setItem("isSlackConnected", false)
                        window.localStorage.setItem("isImgurConnected", false)
                        
                        window.location.href = "/HomePage";
                    })
                })
            } else {
                window.localStorage.setItem("isGithubConnected", true)
                window.location.href = "/HomePage";
            }
        })
    }

    render() {
        return(
            <div className="loading">
                <h2>Redirecting to AREA</h2>
                <ReactLoading type="spinningBubbles" color="seagreen" height='20%' width="20%"/>
            </div>
        );
    }
}

export default Callback;