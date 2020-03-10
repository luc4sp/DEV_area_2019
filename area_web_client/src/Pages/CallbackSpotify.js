import React, { Component } from 'react'
import ReactLoading from 'react-loading'

//import axios from 'axios'

class CallbackSpotify extends Component {

    componentDidMount() {
        console.log(window.location.href)

        var url = window.location.href;
        console.log(url)

        var tab = url.split('#');
        var encoretab = tab[1].split('=');
        var code = encoretab[1]
        code = code.split("&")
        window.localStorage.setItem("spotify-token", code[0]);
        window.localStorage.setItem("isSpotifyConnected", true)
        window.location.href = "/HomePage"
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

export default CallbackSpotify;