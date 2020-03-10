import React, { Component } from 'react';

import "./ComponentsStyle/TrelloForm.css"

class TrelloFormRea extends Component {

    handleChange(e) {
        window.localStorage.setItem("created-board", e.target.value)
    }

    render() {
        return(
            <div className="trello-form">
                <label>Board Title: </label>
                <input onChange={this.handleChange} placeholder="enter the board title" ></input>
            </div>
        )   
    }
}

export default TrelloFormRea