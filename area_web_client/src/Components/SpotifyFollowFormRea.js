import React, { Component } from 'react';

import "./ComponentsStyle/GithubForm.css"
import Axios from 'axios';

class SpotifyFollowFormRea extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isArtist: true,
            inputValue: ""
        }
        this.changeSearch = this.changeSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        window.localStorage.setItem("type-spotify", "artist")
    }

    changeSearch() {
        if (this.state.isArtist === false) {
            this.setState({
                isArtist: true
            })
            window.localStorage.setItem("type-spotify", "artist")
        } else {
            this.setState({
                isArtist: false
            })
            window.localStorage.setItem("type-spotify", "user")
        }
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    findArtist() {
        window.localStorage.setItem("spotify-artist-rea", this.state.inputValue)
        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`},
        }
        Axios.get(`http://lucaspoirel.ovh:8080/spotify/search/${this.state.inputValue}/${window.localStorage.getItem("spotify-token")}`, config)
        .then (res => {
            window.localStorage.setItem("id-artist-rea", res.data.artists.items[0].id)
        })
    }

    findUser() {
        window.localStorage.setItem("spotify-user-follow", this.state.inputValue)
    }

    render() {
        return(
            <div className="github-form">
                <label>Artist name</label>
                <input value={this.state.inputValue} onChange={this.handleChange} placeholder="enter the artist name" ></input>
                <div className="switch-container">
                    <label>
                        <input type="radio" value="artist" onChange={this.changeSearch} checked={this.state.isArtist} />
                        Search in artist
                    </label>
                    <label>
                        <input type="radio" value="users" onChange={this.changeSearch} checked={!this.state.isArtist} />
                        Search in users
                    </label>
                </div>
                {
                    this.state.isArtist ? <button onClick={this.findArtist.bind(this)} value="search"> find Artist </button> :
                    <button onClick={this.findUser.bind(this)} value="search"> find user </button>
                }
            </div>
        )   
    }
}

export default SpotifyFollowFormRea