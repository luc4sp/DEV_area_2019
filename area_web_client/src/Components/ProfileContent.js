import React, { Component } from 'react';

import './ComponentsStyle/ProfileContent.css'
import dany from './ComponentsAssets/Dany_Brillant_2012.jpg'

class ProfileContent extends Component {

    render() {
        let pic
        if (window.localStorage.getItem("profil_pic") === null) {
            pic = dany
        } else {
            pic = window.localStorage.getItem("profil_pic")
        }
        console.log(window.localStorage.getItem("name"))
        return(
            <div className="ProfileContent">
                <img alt="profil" src={pic}></img>
                <h1>Name: <var>{window.localStorage.getItem("name")}</var></h1>
                <h1>Email: <var>{window.localStorage.getItem("email")}</var></h1>
                <a href='/client.apk' download>Click to download area app</a>
            </div>
        )
    }
}
export default ProfileContent;