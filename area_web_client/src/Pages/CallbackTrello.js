import React, { Component } from 'react';

import axios from 'axios'

class CallbackTrello extends Component {

    componentDidMount() {
        var url = window.location.href;
        console.log(url)

        var tab = url.split('=');
        var code = tab[1];
        window.localStorage.setItem("trello-token", code);

        if (window.localStorage.getItem("token") === null) {
            var post_request = 'https://api.trello.com/1/members/me?key=1b710789e2cb56480a610f5a0ae629f6&token=' + code
            axios.get(post_request)
            .then(res => {
                window.localStorage.setItem("name", res.data.username)
                var newMail = res.data.username + "@area.com"
                window.localStorage.setItem("email", newMail)
                window.localStorage.setItem("profil_pic", res.data.avatarUrl)
                axios.post(`http://lucaspoirel.ovh:8080/auth/postEmail`, {
                    email: newMail,
                    client_id: "fef0bdde564ccc25ae62"
                })
                .then(res => {
                    window.localStorage.setItem("token", res.data.token)
    
                    window.localStorage.setItem("isTrelloConnected", true)
                    window.localStorage.setItem("isGithubConnected", false)
                    window.localStorage.setItem("isSpotifyConnected", false)
                    window.localStorage.setItem("isSlackConnected", false)
                    window.localStorage.setItem("isImgurConnected", false)
    
                    window.location.href = "/HomePage";
                })
            })
        } else {
            post_request = 'https://api.trello.com/1/members/me?key=1b710789e2cb56480a610f5a0ae629f6&token=' + code
            axios.get(post_request)
            .then( res => {
                window.localStorage.setItem("trello-name", res.data.username)
                window.localStorage.setItem("isTrelloConnected", true)
                window.location.href = "/HomePage";
            })
        }
}

    render() {
        return(
            <div>
            </div>
        );
    }


}

export default CallbackTrello;