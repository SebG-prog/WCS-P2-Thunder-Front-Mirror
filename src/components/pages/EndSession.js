import React, { Component } from "react"
import {NavLink} from "react-router-dom"

import EndSessionTrackList from  "./EndSessionTrackList"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import "./EndSession.css"

class EndSession extends Component {
    render() {
        console.log("4propslcoation state:", this.props.location.state)
        return (
            <div className="endsession-container">
                <h1>The tracklist of your game session :</h1>
                {this.props.location.state.map(track => <EndSessionTrackList sessionHistory={track} />)}
                <NavLink to="/" className="goHome_button"><button><FontAwesomeIcon icon={faHome} className="goHome_icon" /></button></NavLink>
            </div>
        )
    }
}

export default EndSession