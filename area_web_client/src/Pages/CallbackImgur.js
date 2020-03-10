import React, { Component } from 'react'
import ReactLoading from 'react-loading'
//import axios from 'axios'

class CallbackImgur extends Component {
    componentDidMount() {

        var url = window.location.href
        var tab = url.split('#')
        var encoretab = tab[1].split('=')
        var code = encoretab[1]
        code = code.split("&")
        window.localStorage.setItem("imgur-token", code[0])
        window.localStorage.setItem("isImgurConnected", true)
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

export default CallbackImgur;