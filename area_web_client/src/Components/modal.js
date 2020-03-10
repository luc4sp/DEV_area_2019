import React from "react";

import './ComponentsStyle/modal.css'

import trello from "./ComponentsAssets/trello.png"
import github from "./ComponentsAssets/github.png"
import spotify from "./ComponentsAssets/spotify.png"
import slack from "./ComponentsAssets/slack.png"
import imgur from "./ComponentsAssets/imgur.png"
//import Axios from "axios";

class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            trelloActionFocused: false,
            githubActionFocused: false,
            spotifyActionFocused: false,
            slackActionFocused: false,
            imgurActionFocused: false,

            trelloReaFocused: false,
            githubReaFocused: false,
            spotifyReaFocused: false,
            slackReaFocused: false,
            imgurReaFocused: false
        }
        this.focusActionTrello = this.focusActionTrello.bind(this)
        this.focusActionGithub = this.focusActionGithub.bind(this)
        this.focusActionSpotify = this.focusActionSpotify.bind(this)
        this.focusActionSlack = this.focusActionSlack.bind(this)
        this.focusActionImgur = this.focusActionImgur.bind(this)

        this.focusReaTrello = this.focusReaTrello.bind(this)
        this.focusReaGithub = this.focusReaGithub.bind(this)
        this.focusReaSpotify = this.focusReaSpotify.bind(this)
        this.focusReaSlack = this.focusReaSlack.bind(this)
        this.focusReaImgur = this.focusReaImgur.bind(this)

        this.checkSelected = this.checkSelected.bind(this)
    }

    componentDidMount() {
        window.localStorage.setItem("serviceAction", "")
        window.localStorage.setItem("serviceRea", "")
    }

    focusActionTrello() {
        window.localStorage.setItem("serviceAction", "trello")
        if (window.localStorage.getItem("isTrelloConnected") === 'false') {
            window.open('https://trello.com/1/authorize?expiration=1day&name=Area&scope=read,write,account&response_type=token&key=1b710789e2cb56480a610f5a0ae629f6&callback_method=fragment&return_url=http://lucaspoirel.ovh:3000/CallbackTrello', "_self")
        } else {
            this.setState({
                spotifyActionFocused: false,
                trelloActionFocused: true,
                githubActionFocused: false,
                imgurActionFocused: false
            })    
        }
    }

    focusReaTrello() {
        window.localStorage.setItem("serviceRea", "trello")

        if (window.localStorage.getItem("isTrelloConnected") === 'false') {
            window.open('https://trello.com/1/authorize?expiration=1day&name=Area&scope=read,write,account&response_type=token&key=1b710789e2cb56480a610f5a0ae629f6&callback_method=fragment&return_url=http://lucaspoirel.ovh:3000/CallbackTrello', "_self")
        } else {
            this.setState({
                spotifyReaFocused: false,
                trelloReaFocused: true,
                githubReaFocused: false,
                imgurReaFocused: false
            })    
        }
    }

    focusActionGithub() {
        window.localStorage.setItem("serviceAction", "github")
        this.setState({
            spotifyActionFocused: false,
            githubActionFocused: true,
            trelloActionFocused: false,
            slackActionFocused: false,
            imgurActionFocused: false
        })
    }

    focusReaGithub() {
        window.localStorage.setItem("serviceRea", "github")
        if (window.localStorage.getItem("isGithubConnected") === "false") {
            window.open('https://github.com/login/oauth/authorize?client_id=Iv1.6550254c46078825', "_self")
        } else {
            this.setState({
                spotifyReaFocused: false,
                githubReaFocused: true,
                trelloReaFocused: false,
                slackReaFocused: false,
                imgurReaFocused: false
            })
        }
    }

    focusActionSpotify() {
        window.localStorage.setItem("serviceAction", "spotify")
        if (window.localStorage.getItem("isSpotifyConnected") === "false") {
            window.open(`https://accounts.spotify.com/authorize?client_id=f6111d04b3a647f89e0ec72bcb5db3af&redirect_uri=http://lucaspoirel.ovh:3000/CallbackSpotify&response_type=token&scope=user-follow-modify`, "_self")
        } else {
            this.setState({
                spotifyActionFocused: true,
                githubActionFocused: false,
                trelloActionFocused: false,
                slackActionFocused: false,
                imgurActionFocused: false
            })    
        }
    }

    focusReaSpotify() {
        window.localStorage.setItem("serviceRea", "spotify")

        if (window.localStorage.getItem("isSpotifyConnected") === "false") {
            window.open(`https://accounts.spotify.com/authorize?client_id=f6111d04b3a647f89e0ec72bcb5db3af&redirect_uri=http://lucaspoirel.ovh:3000/CallbackSpotify&response_type=token&scope=user-follow-modify`, "_self")
        } else {
            this.setState({
                spotifyReaFocused: true,
                githubReaFocused: false,
                trelloReaFocused: false,
                slackReaFocused: false,
                imgurReaFocused: false
            })
        }
    }

    focusActionSlack() {
        window.localStorage.setItem("serviceAction", "slack")
        if (window.localStorage.getItem("isSlackConnected") === "false") {
            window.open("https://slack.com/oauth/v2/authorize?scope=commands,channels:read,groups:read,mpim:read,im:read,channels:manage,groups:write,mpim:write,im:write&client_id=973222196038.972875814919&response_type=code", "_self")
        } else {
            this.setState({
                spotifyActionFocused: false,
                githubActionFocused: false,
                trelloActionFocused: false,
                slackActionFocused: true,
                imgurActionFocused: false
            })    
        }
    }

    focusReaSlack() {
        window.localStorage.setItem("serviceRea", "slack")
        if (window.localStorage.getItem("isSlackConnected") === "false") {
            window.open("https://slack.com/oauth/v2/authorize?scope=commands,channels:read,groups:read,mpim:read,im:read,channels:manage,groups:write,mpim:write,im:write&client_id=973222196038.972875814919&response_type=code", "_self")
        } else {
            this.setState({
                spotifyReaFocused: false,
                githubReaFocused: false,
                trelloReaFocused: false,
                slackReaFocused: true,
                imgurActionFocused: false
            })
        }
    }

    focusActionImgur() {
        window.localStorage.setItem("serviceAction", "imgur")
        if (window.localStorage.getItem("isImgurConnected") === "false") {
            window.open("http://api.imgur.com/oauth2/authorize?client_id=192f05c0ae9029c&response_type=token&state=cestlastate", "_self")
        } else {
            this.setState({
                spotifyActionFocused: false,
                githubActionFocused: false,
                trelloActionFocused: false,
                slackActionFocused: false,
                imgurActionFocused: true
            })      
        }
    }

    focusReaImgur() {
        window.localStorage.setItem("serviceRea", "imgur")
        if (window.localStorage.getItem("isImgurConnected") === "false") {
            window.open("http://api.imgur.com/oauth2/authorize?client_id=192f05c0ae9029c&response_type=token&state=cestlastate", "_self")
        } else {
            this.setState({
                spotifyReaFocused: false,
                githubReaFocused: false,
                trelloReaFocused: false,
                slackReaFocused: false,
                imgurReaFocused: true
            })  
        }
    }

    checkSelected() {
        if (this.state.serviceAction !== "" && this.state.serviceReaction !== "") {
            this.props.close()            
        } else {}
    }

    render() {

        return (
            <div className="modal-wrapper"
                 style={{
                     transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                     opacity: this.props.show ? '1' : '0',
                 }}>
                <div className="modal-panel">
                    <div className="actions">
                        <label>Choose an action service</label>
                        <div className="apis">
                            { this.state.trelloActionFocused ? <img alt="trello" className="services focusGreen" src={trello}/> : <img alt="trello" onClick={this.focusActionTrello} className="services" src={trello}/>}
                            { this.state.githubActionFocused ? <img alt="github" className="services focusGreen" src={github}/> : <img alt="github" onClick={this.focusActionGithub} className="services white" src={github}/>}
                            { this.state.spotifyActionFocused ? <img alt="spotify" className="services focusGreen" src={spotify}/> : <img alt="spotify" onClick={this.focusActionSpotify} className="services" src={spotify}/>}
                            { this.state.slackActionFocused ? <img alt="slack" className="services focusGreen" src={slack} /> : <img alt="slack" onClick={this.focusActionSlack} className="services" src={slack} />}
                            { this.state.imgurActionFocused ? <img alt="imgur" className="services focusGreen" src={imgur} /> : <img alt="imgur" onClick={this.focusActionImgur} className="services" src={imgur} />}  
                        </div>
                    </div>
                    <div className="actions">
                        <label>Choose a reaction service</label>
                        <div className="apis">
                            { this.state.trelloReaFocused ? <img alt="trello" className="services focusGreen" src={trello}/> : <img alt="trello" onClick={this.focusReaTrello} className="services" src={trello}/>}
                            { this.state.githubReaFocused ? <img alt="github" className="services focusGreen" src={github}/> : <img alt="github" onClick={this.focusReaGithub} className="services white" src={github}/>}
                            { this.state.spotifyReaFocused ? <img alt="spotify" className="services focusGreen" src={spotify}/> : <img alt="spotify" onClick={this.focusReaSpotify} className="services" src={spotify}/>}
                            { this.state.slackReaFocused ? <img alt="slack" className="services focusGreen" src={slack} /> : <img alt="slack" onClick={this.focusReaSlack} className="services" src={slack} />}
                            { this.state.imgurReaFocused ? <img alt="imgur" className="services focusGreen" src={imgur} /> : <img alt="imgur" onClick={this.focusReaImgur} className="services" src={imgur} />}
                        </div>
                    </div>
                    <div onClick={this.checkSelected} className="connectButton">
                        Continue
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;