import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown'

import "./ComponentsStyle/TrelloForm.css"

class TrelloFormBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            boards: [],
            id_boards: []
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
                ids[i] = res.data[i].id
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
        window.localStorage.setItem("selectedBoard", e.value)
        window.localStorage.setItem("selectedBoardId", this.state.id_boards[i])
    }

    render() {
        return(
            <div className="trello-form">
                <Dropdown className="select" onChange={this.selectBoard.bind(this)} options={this.state.boards} onFocus={this.getBoards.bind(this)} placeholder="Show boards" />
            </div>
        )   
    }

}

export default TrelloFormBoard