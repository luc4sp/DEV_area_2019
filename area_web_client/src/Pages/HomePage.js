import React, { Component } from 'react';
import "./PageStyle/HomePageStyle.css"

import TopBar from '../Components/TopBar'
import Dashboard from '../Components/Dashboard'

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleContinue = this.handleContinue.bind(this);
        this.handleFinish = this.handleFinish.bind(this);

        this.state = {
            isOpen: false,
            isSelected: false
        }
    }

    handleOpen() {
        this.setState({
            isOpen: true
        })
    }

    handleClose() {
        this.setState({
            isOpen: false
        })
    }

    handleContinue() {
        this.setState({
            isOpen: false,
            isSelected: true
        })
    }

    handleFinish() {
        this.setState({
            isSelected: false
        })
    }

    render() {
        return (
            <div className="MainContainer">
                <TopBar handleOpen={this.handleOpen} isOpen={this.state.isOpen}/>
                <Dashboard handleClose={this.handleClose} isOpen={this.state.isOpen} isSelected={this.state.isSelected} handleFinish={this.handleFinish} handleContinue={this.handleContinue}/>
            </div>
        )
    }
}

export default HomePage;