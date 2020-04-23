import React from "react"
import axios from "axios"

import GameSessionAudioPlayer from "./GameSessionAudioPlayer"
import GameSessionButtonEndSession from "./GameSessionButtonEndSession"
import GameSessionInterface from "./GameSessionInterface"
import GameSessionNextButton from "./GameSessionNextButton"
import GameSessionTimeCounter from "./GameSessionTimeCounter"
import GameSessionValidateButton from "./GameSessionValidateButton"
import PointSystem from "./PointSystem"

const API_KEY = "MjY4ZTc5ZTktMDI1MS00YTkwLTliZGEtOGE5ZDA5ODQ0YWNi"

const rounds = 5

class GameSession extends React.Component {
    state = {
        genresCode: this.props.location.state,
        artistsList: [], /*Gives a random list of artists*/
        artistTrack: {}, /* Contains a random song from a selected artist */
        isLoaded: false,
        numArtist: 0,
        solution:"",
        sessionHistory:[],
        isPlaying : false ,
    }
    
    
    
    

    /* First call to the api to get a random list of artists. The number of artists selected will be defined by the rounds value */
    getArtistsList = (genresCode) => {
        axios.get(`http://api.napster.com/v2.2/genres/${genresCode}/artists/top`, 
                {params: {
                    apikey: API_KEY, 
                    limit: rounds}})
            .then(res => {
                console.log("Artists List: ", res.data) ||
                    this.setState({ artistList: this.getListShuffled(res.data.artists) },
                        () => this.getArtistTracksList(this.state.artistList[this.state.numArtist].id))
            })
    }

    /* Return a random song of the current artist*/
    getArtistTracksList = (artistID) => {
        axios.get(`https://api.napster.com/v2.2/artists/${artistID}/tracks/top`, {params: {apikey: API_KEY}})
            .then(res => {
                console.log("Artist Tracks: ", res.data.tracks[0]) ||
                    this.setState({ artistTrack: this.getListShuffled(res.data.tracks)[0], isLoaded: true },
                        () => {
                            document.getElementById("audioPlayer").play()
                        })
            })
    }

    /* Randomized an array. this function is called both on the get ArtistsList and get ArtistTracksList */
    getListShuffled = (list) => {
        let newIndex, temp;
        for (let i = list.length - 1; i > 0; i--) {
            newIndex = Math.floor(Math.random() * (i+1));
            temp = list[i];
            list[i] = list[newIndex];
            list[newIndex] = temp;
        } return list
    }

    nextSong = () => {
        this.setState({ numArtist: this.state.numArtist + 1 }, this.getArtistTracksList(this.state.artistList[this.state.numArtist].id))
        this.setState({isPlaying : true})
        
    }

    addToHistory = () => {
        this.setState({ sessionHistory: [...this.state.sessionHistory, this.state.artistTrack] }, console.log("1GS state history is:", this.state.sessionHistory))
    }


    saveRoundAndLoadNextSong = event => {
        this.addToHistory()
        if (this.state.numArtist < rounds) {
            this.nextSong()
            console.log("2GS-saveandLoad:", this.state.sessionHistory)
            event.preventDefault() 
        }
    }

    
    componentDidMount() {
        this.getArtistsList(this.state.genresCode)
    }

    componentWillUnmount() {
        this.getArtistsList(this.state.genresCode)
    }


    /*  Functions used in the userinterface that aims at inputing a letter, erease and update the number of boxes based on the artist being played */
    handleClick = event => {
        const letter = event.target.value
        if (this.state.solution.length < this.state.artistTrack.artistName.replace(/\s+/g, '').length) {
            this.setState({ solution: this.state.solution + letter }, this.updateBoxes)
        }
    }

    handleChange = event => {
        const input = event.target.value.replace(/\s+/g, '').toUpperCase()
        this.setState({ solution: input }, this.updateBoxes)
    }

    handleCorrection = () => {
        this.setState({ solution: this.state.solution.slice(0, -1) }, this.updateBoxes)
    }

    updateBoxes = () => {
        const solutionBoxes = document.getElementsByClassName("letter")
        for (let i = 0; i < this.state.artistTrack.artistName.replace(/\s+/g, '').length; i++) {
            solutionBoxes[i].textContent = this.state.solution[i]
        }
    }

    render(){
        console.log("GSrender:", this.state.sessionHistory)
        return(
            <div>
                {!this.state.isLoaded ? 
                <div>Loading...</div>
                :
                <div>
                    <GameSessionTimeCounter isPlaying={this.state.isPlaying} />
                    <GameSessionAudioPlayer saveRoundAndLoadNextSong={this.saveRoundAndLoadNextSong} artistTrack={this.state.artistTrack} sessionHistory={this.state.sessionHistory} />
                    <GameSessionInterface artistTrack={this.state.artistTrack} handleClick={this.handleClick} handleChange={this.handleChange} handleCorrection={this.handleCorrection} />
                    <PointSystem artistTrack={this.state.artistTrack} solution={this.state.solution} nextSong={this.nextSong} />
                    <GameSessionButtonEndSession/>
                </div>
            }
            </div> 
        )
    }
    
}

export default GameSession