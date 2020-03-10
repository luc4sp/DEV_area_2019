import React, { Component } from 'react'
import './ComponentsStyle/areas.css'
import Axios from 'axios'

//import trello from "./ComponentsAssets/trello.png"
import time from "./ComponentsAssets/time.png"
import github from "./ComponentsAssets/github.png"
import spotify from './ComponentsAssets/spotify.png'
import trello from './ComponentsAssets/trello.png'
import slack from './ComponentsAssets/slack.png'
import imgur from './ComponentsAssets/imgur.png'

class Areas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: [],
            contentRea: []
        }

        this.deleteArea = this.deleteArea.bind(this)
    }

    componentDidMount() {
        this.setState({
            content: JSON.parse(this.props.settings.body),
            contentRea: JSON.parse(this.props.settings.reaction.body)    
        })
    }

    deleteArea() {
        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`},
        }
        Axios.delete(`http://lucaspoirel.ovh:8080/action/delete/${this.props.id}`, config)
        .then( res => {
            window.location.reload()
        })
    }

    render() {

        let logoAction
        let logoReaction



        if (this.props.settings.headers === "github") {
            logoAction = <img alt="github" className="logoAction" src={github}/>
        }
        else if (this.props.settings.headers === "world-times-api") {
            logoAction = <img alt="time" className="logoAction" src={time}/>
        }
        else if (this.props.settings.headers === "spotify") {
            logoAction = <img alt="spotify" className="logoAction" src={spotify}/>
        }
        else if (this.props.settings.headers === "trello") {
            logoAction = <img alt="trello" className="logoAction" src={trello}/>
        }
        else if (this.props.settings.headers === "slack") {
            logoAction = <img alt="slack" className="logoAction" src={slack}/>
        }
        else if (this.props.settings.headers === "imgur") {
            logoAction = <img alt="imgur" className="logoAction" src={imgur}/>
        }
        
        if (this.props.settings.reaction.headers === "github") {
            logoReaction = <img alt="github" className="logoAction" src={github}/>
        }
        else if (this.props.settings.reaction.headers === "world-times-api") {
            logoReaction = <img alt="time" className="logoAction" src={time}/>
        }
        else if (this.props.settings.reaction.headers === "spotify") {
            logoReaction = <img alt="spotify" className="logoAction" src={spotify}/>
        }
        else if (this.props.settings.reaction.headers === "trello") {
            logoReaction = <img alt="trello" className="logoAction" src={trello}/>
        }
        else if (this.props.settings.reaction.headers === "slack") {
            logoReaction = <img alt="slack" className="logoAction" src={slack}/>
        }
        else if (this.props.settings.reaction.headers === "imgur") {
            logoReaction = <img alt="imgur" className="logoAction" src={imgur}/>
        }

        return (
            <div className="areas">
                <div className="delete">
                    <div className="settings" >settings</div>
                    <div className="button" onClick={this.deleteArea}>delete</div>
                </div>
                <div className="in">
                    <div className="content">
                        <h3>Action</h3>
                        <div className="orangeSquare">
                            {logoAction}                        
                            <h2>{this.props.settings.name}</h2>
                            <h2>{this.state.content.content}</h2>
                        </div>
                    </div>
                    <div className="separator"/>
                    <div className="content">
                        <h3>Reaction</h3>
                        <div className="colorSquare">
                            {logoReaction}
                            <h2>{this.props.settings.reaction.name}</h2>
                            <h2>{this.state.contentRea.content}</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Areas