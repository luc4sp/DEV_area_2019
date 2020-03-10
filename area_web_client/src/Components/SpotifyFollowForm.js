import React, { Component } from 'react';

import "./ComponentsStyle/TrelloForm.css"

class SpotifyFollowForm extends Component {

    handleChange(e) {
        window.localStorage.setItem("spotify-artist", e.target.value)
    }

    render() {
        return(
            <div className="trello-form">
                <label>Artist name</label>
                <input onChange={this.handleChange} placeholder="artist name" />                    
            </div>
        )   
    }
}

export default SpotifyFollowForm