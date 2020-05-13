import React from 'react';
import Axios from 'axios';
import {NavLink} from "react-router-dom";
import API_KEY from '../../secret';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import './EndSessionReco.css';

class EndSessionReco extends React.Component{
    state = {
        artistSimilar : [],
    }
componentDidMount(){
        this.getArtistSimilar();
    } 
getArtistSimilar = () => {
    const artists = this.props.location.artistId
    artists.map(artist =>{ 
        return(
            Axios.get(`https://api.napster.com/v2.2/artists/${artist.artistTrack.artistId}/similar`,
        {
            params: {
                apikey: API_KEY,
            }})
            .then(res => { 
                const similar = res.data.artists.splice(0,3)  
                const similar1 = similar.filter( simil  => simil.albumGroups.singlesAndEPs )
                this.setState( () => ({ artistSimilar: [...this.state.artistSimilar, similar1 ]}))
                console.log(similar);
            } )
            )})
        }
    render(){
        const artists = this.props.location.artistId
        const artistSimilar = this.state.artistSimilar
        return(
            <div className='container-reco-page'  >
               <h1 className="big-title-reco" >Artist similar</h1>
                {artists.map((artist, index) => {

                    return (
                        <div className="title-artist-reco" >
                            <h2>{artist.artistTrack.artistName}</h2>
                            {artistSimilar[index] && artistSimilar[index].map( similar   => {
                            
                            return(
                                <div className='block-artist-similar' >
                                <h3>{similar.name}</h3>
                                <img src={`https://api.napster.com/imageserver/v2/albums/${similar.albumGroups.singlesAndEPs[0]}/images/90x90.jpg`} alt="artist"
                                    />
                            </div>
                            )
                        }
                        )}
                        </div>
                )
            }
                )
            }
            <NavLink to="/" className="goHome_button_reco_page"><button><FontAwesomeIcon icon={faHome} className="goHome_icon" /></button></NavLink>
            </div>   
        )
    }
}
export default EndSessionReco;