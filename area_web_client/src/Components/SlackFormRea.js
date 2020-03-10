import React, { Component } from 'react';

import "./ComponentsStyle/TrelloForm.css"

class SlackFormRea extends Component {
    
    handleChange(e) {
        window.localStorage.setItem("created-conversation", e.target.value)
    }

    render() {
        return(
            <div className="trello-form">
                <label>Conversation Title: </label>
                <input onChange={this.handleChange} placeholder="enter the conversation title" ></input>
            </div>
        )   
    }
}

export default SlackFormRea