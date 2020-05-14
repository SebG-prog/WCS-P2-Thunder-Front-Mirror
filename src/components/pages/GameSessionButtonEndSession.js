import React , {useState} from "react";
import {NavLink} from 'react-router-dom';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import "./GameSessionButtonEndSession.css";

Modal.setAppElement('#root')

function ButtonEndSession(props) {
    const [modalIsOpen,setModalIsOpen] = useState(false)
    return(
        <div className="ButtonEndSession-container" >
            <FontAwesomeIcon icon={faTimesCircle} className="buttonEndSession" onClick={() => setModalIsOpen(true)} />
            <Modal isOpen={modalIsOpen}
            onRequestClose={()=> setModalIsOpen(false)}
            style ={{
                content: {color:'black',backgroundColor:'grey',width:'40%',textAlign:"center",top:"auto",left:'30%',bottom:'50%'} ,
            }}>
                <h2>Are you sure you want to leave the session ?</h2>
                <div>
                    <NavLink to={{pathname:`/mode-page/${props.username}`, username:props.username}} >
                        <button type='button'>Yes</button>
                    /</NavLink>
                    <button onClick={() => setModalIsOpen(false)}>No</button>
                </div>
            </Modal>
        </div>
        
    )
}


export default ButtonEndSession;