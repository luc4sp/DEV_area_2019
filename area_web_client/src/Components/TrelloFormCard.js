import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown'

import "./ComponentsStyle/TrelloForm.css"

class TrelloFormCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boards: [],
            lists: [],
            id_boards: [],
            id_list: [],
            oth: [],
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
            var other = []
            while( i < res.data.length) {
                tmp[i] = res.data[i].name
                ids[i] = res.data[i].shortLink
                other[i] = res.data[i].id
                i++
            }
            this.setState({
                boards: tmp,
                id_boards: ids,
                oth: other
            })
        })
    }

    selectBoard(e) {
        var i = this.state.boards.indexOf(e.value)
        window.localStorage.setItem("selectedBoard", e.value)
        window.localStorage.setItem("selectedBoardId", this.state.oth[i])
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
        window.localStorage.setItem("selectedList", e.value)
        window.localStorage.setItem("selectedListId", this.state.id_list[i])
    }

    render() {
        return(
            <div className="trello-form">
                <Dropdown className="select" onChange={this.selectBoard.bind(this)} options={this.state.boards} onFocus={this.getBoards.bind(this)} placeholder="Show boards" />
                <Dropdown className="select" onChange={this.selectList.bind(this)} options={this.state.lists} placeholder="Show lists" />
            </div>
        )   
    }
}

export default TrelloFormCard