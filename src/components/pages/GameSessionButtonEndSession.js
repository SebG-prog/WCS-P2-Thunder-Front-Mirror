import React , {useState} from "react";
import {Link} from 'react-router-dom';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import "./GameSessionButtonEndSession.css";

Modal.setAppElement('#root')

function ButtonEndSession() {
    const [modalIsOpen,setModalIsOpen] = useState(false)
    return(
        <div className="ButtonEndSession-container">
            <FontAwesomeIcon icon={faTimesCircle} className="buttonEndSession" onClick={() => setModalIsOpen(true)} />
            <Modal isOpen={modalIsOpen}
            onRequestClose={()=> setModalIsOpen(false)}
            style ={{
                content: {color:'white',backgroundColor:'#845ec2', width:'40%', textAlign:"center", top:"auto", left:'30%', bottom:'50%'} ,
            }}>
                <h2>Are you sure you want to leave the session ?</h2>
                <div className="button-yes-no-container">
                    <Link to='/'>
                        <button className="button-yes" type='button'>Yes</button>
                    </Link>
                    <button className="button-no" onClick={() => setModalIsOpen(false)}>No</button>
                </div>
            </Modal>
        </div>
        
    )
}


export default ButtonEndSession;