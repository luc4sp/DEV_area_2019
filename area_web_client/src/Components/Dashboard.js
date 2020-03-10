import React, { Component } from 'react';

import Modal from "./modal";
import SecondModal from "./secondModal";

import './ComponentsStyle/Dashboard.css'
import Axios from 'axios';
import Areas from './areas';

class Dashboard extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            isThereSomeone: false,
            areas: undefined,
        }
    }

    componentDidMount() {
        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`},
        }
        Axios.get(`http://lucaspoirel.ovh:8080/action/react/${window.localStorage.getItem("id")}`, config)
        .then(res => {
            this.setState({
                areas: res.data
            })
        })
    }

    getAreas(elem, i) {
        return <Areas settings={this.state.areas[i]} id={this.state.areas[i].id} />
    }

    render() {
        const { isThereSomeone } = this.state;

        let widgets

        if (this.state.areas !== undefined) {
            if (!isThereSomeone) {
                widgets = this.state.areas.map((elem, i) => { return this.getAreas(elem, i)})
            }
        }

        return(
            <div className="dashboard">
                { this.props.isOpen ? <div onClick={this.props.handleClose} className="back-drop"></div> : null }
                {widgets}
                <Modal
                    className="modal"
                    show={this.props.isOpen}
                    close={this.props.handleContinue}>
                </Modal>
                { this.props.isSelected ? <div onClick={this.props.handleFinish} className="back-drop"></div> : null }
                <SecondModal
                    className="modal"
                    show={this.props.isSelected}
                    close={this.props.handleFinish}>
                </SecondModal>
            </div>
        )
    }

}

export default Dashboard;