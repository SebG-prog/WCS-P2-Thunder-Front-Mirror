import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import "./Navbar.css";


class NavbarFooter extends Component {
    render(){
        return(
            <nav className="nav-bottom-container">
                <ul className="nav-links-wrapper">
                    <li><NavLink className="nav-title" activeClassName ="current" to="/"><FontAwesomeIcon icon={faHome} className="nav-icon" /></NavLink></li>
                    <li><NavLink className="nav-title" activeClassName ="current" to="/sign_in/pseudo"><FontAwesomeIcon icon={faUser} className="nav-icon" /></NavLink></li>
                </ul>
            </nav>
        )
    }
}
export default NavbarFooter;