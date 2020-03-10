import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown'

import "./ComponentsStyle/TrelloForm.css"

class TrelloFormCardRea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boards: [],
            lists: [],
            id_boards: [],
            id_list: [],
            id: ""
        }
    }

    getBoards() {
        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`}
        }
        axios.get(`http://lucaspoirel.ovh:8080/trello/members/${window.localStorage.getItem("trello-name")}/1b710789e2cb56480a610f5a0ae629f6/${window.localStorage.getItem("trello-token")}/boards`, config)
        .then(res => {
            var i = 0
            var tmp = []
            var ids = []
            while( i < res.data.length) {
                tmp[i] = res.data[i].name
                ids[i] = res.data[i].shortLink
                i++
            }
            this.setState({
                boards: tmp,
                id_boards: ids
            })
        })
    }

    selectBoard(e) {
        var i = this.state.boards.indexOf(e.value)
        window.localStorage.setItem("selectedBoardRea", e.value)
        this.setState({
            id: this.state.id_boards[i]
        })
        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`}
        }
        axios.get(`http://lucaspoirel.ovh:8080/trello/boards/${this.state.id}/1b710789e2cb56480a610f5a0ae629f6/${window.localStorage.getItem("trello-token")}`, config)
        .then( res => {
            var i = 0
            var tmp = []
            var ids = []
            while( i < res.data.lists.length) {
                tmp[i] = res.data.lists[i].name
                ids[i] = res.data.lists[i].id
                i++
            }
            this.setState({
                lists: tmp,
                id_list: ids
            })
        })
    }
    
    selectList(e) {
        var i = this.state.lists.indexOf(e.value)
        window.localStorage.setItem("selectedListRea", e.value)
        window.localStorage.setItem("selectedListReaId", this.state.id_list[i])
    }

    handleChange(e) {
        window.localStorage.setItem("created-card", e.target.value)
    }

    render() {
        return(
            <div className="trello-form">
                <Dropdown className="select" onChange={this.selectBoard.bind(this)} options={this.state.boards} onFocus={this.getBoards.bind(this)} placeholder="Show boards" />
                <Dropdown className="select" onChange={this.selectList.bind(this)} options={this.state.lists} placeholder="Show lists" />
                <label>Card Title: </label>
                <input onChange={this.handleChange} placeholder="enter the card title"></input>
            </div>
        )   
    }
}

export default TrelloFormCardRea