import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import axios from 'axios'

class CallbackSlack extends Component {

    componentDidMount() {
        var url = window.location.href;

        var tab = url.split('?')
        var encoretab = tab[1].split('=')
        var code = encoretab[1]
        code = code.split("&")
        window.localStorage.setItem("slack-code", code[0])
        const config = {
            headers: { Authorization: `token ${code[0]}`}
        }
        axios.post(`https://api.slack.com/api/oauth.v2.access?code=${code[0]}&client_id=973222196038.972875814919&client_secret=ad8fd04a734392f80743ffcaea857033`, config)
        .then(res => {
            window.localStorage.setItem("slack-token", res.data.access_token)
            window.localStorage.setItem("isSlackConnected", true)
            window.location.href = "/HomePage"
        })
    }

    render() {
        return(
            <div className="loading">
                <h2>Redirecting to AREA</h2>
                <ReactLoading type="spinningBubbles" color="seagreen" height='20%' width="20%"/>
            </div>
        )
    }
}

export default CallbackSlack