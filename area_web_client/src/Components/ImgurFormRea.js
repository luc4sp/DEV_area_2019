import React, { Component } from 'react';

import "./ComponentsStyle/TrelloForm.css"

class ImgurFormRea extends Component {

    handleChange(e) {
        window.localStorage.setItem("created-tag", e.target.value)
    }

    render() {
        return(
            <div className="trello-form">
                <label>Tag name: </label>
                <input onChange={this.handleChange} placeholder="enter the tag" ></input>
            </div>
        )   
    }
}

export default ImgurFormRea