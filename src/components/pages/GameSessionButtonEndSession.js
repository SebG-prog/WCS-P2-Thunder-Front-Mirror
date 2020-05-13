import React , {useState} from "react";

import {Link} from 'react-router-dom';
import Modal from 'react-modal';

import "./GameSessionButtonEndSession.css";

Modal.setAppElement('#root')

function ButtonEndSession() {
    const [modalIsOpen,setModalIsOpen] = useState(false)
    return(
        <div className="ButtonEndSession-container" >
            <button className="buttonEndSession" onClick={() => setModalIsOpen(true)}>End session</button>
            <Modal isOpen={modalIsOpen}
            onRequestClose={()=> setModalIsOpen(false)}
            style ={{
                content: {color:'black',backgroundColor:'grey',width:'40%',textAlign:"center",top:"auto",left:'30%',bottom:'50%'} ,
            }}>
                <h2>Are you sure you want to leave the session ?</h2>
                <div>
                    <Link to='/'>
                        <button type='button'>Yes</button>
                    </Link>
                    <button onClick={() => setModalIsOpen(false)}>No</button>
                </div>
            </Modal>
        </div>
        
    )
}


export default ButtonEndSession;