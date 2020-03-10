import React, {Component} from 'react';

import './PageStyle/HomePageStyle.css'

import TopBar from '../Components/TopBar'
import ProfileContent from '../Components/ProfileContent'

class ProfilePage extends Component {

    render() {
        return (
            <div className="MainContainer">
                <TopBar />
                <ProfileContent />
            </div>
        )
    }
}

export default ProfilePage;