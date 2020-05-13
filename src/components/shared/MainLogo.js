import React from 'react';
import {NavLink} from 'react-router-dom';

import logo from "../../images/logo_thunder.svg";

import "./MainLogo.css";

function MainLogo() {
    return (
        <NavLink to="/">
            <div className="mainLogo-container">
                <img className="mainLogo" src={logo} alt="Logo of the application" />
            </div>
        </NavLink>
    )
}

export default MainLogo;