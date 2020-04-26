import React from "react"
import axios from "axios"
import { Redirect } from 'react-router-dom'

import GameSessionAudioPlayer from "./GameSessionAudioPlayer"
import GameSessionButtonEndSession from "./GameSessionButtonEndSession"
import GameSessionInterface from "./GameSessionInterface"

import GameSessionTimeCounter from "./GameSessionTimeCounter"

import PointSystem from "./GameSessionPointSystem"

const API_KEY = "MjY4ZTc5ZTktMDI1MS00YTkwLTliZGEtOGE5ZDA5ODQ0YWNi"

const rounds = 5

class GameSession extends React.Component {
    state = {
        genresCode: this.props.location.state,
        artistsList: [], /*Gives a random list of artists*/
        artistTrack: {}, /* Contains a random song from a selected artist */
        isLoaded: false,
        numArtist: 0,
        isPlaying: false,
        solution: null,
        score: 0,
        sessionHistory: [],
        redirect: null,
    }

    componentDidMount() {
        this.getArtistsList(this.state.genresCode)
    }





    /* First call to the api to get a random list of artists. The number of artists selected will be defined by the rounds value */
    getArtistsList = (genresCode) => {
        axios.get(`http://api.napster.com/v2.2/genres/${genresCode}/artists/top`,
            {
                params: {
                    apikey: API_KEY,
                    limit: rounds
                }
            })
            .then(res => {
                this.setState(
                    () => ({ artistList: this.getListShuffled(res.data.artists) }),
                    () => this.getArtistTracksList(this.state.artistList[this.state.numArtist].id))
            })
    }

    /* Return a random song of the current artist*/
    getArtistTracksList = (artistID) => {
        axios.get(`https://api.napster.com/v2.2/artists/${artistID}/tracks/top`,
            {
                params: {
                    apikey: API_KEY
                }
            })
            .then(res => {
                this.setState(
                    () => ({ artistTrack: this.getListShuffled(res.data.tracks)[0], isLoaded: true, solution: ""}),
                    () => {
                        document.getElementById("userInput").value = ""
                        document.getElementById("audioPlayer").play()
                    })
            })
    }

    componentWillUnmount() {
        this.getArtistsList(this.state.genresCode)
    }

    /* Randomized an array. this function is called both on the get ArtistsList and get ArtistTracksList */
    getListShuffled = (list) => {
        let newIndex, temp;
        for (let i = list.length - 1; i > 0; i--) {
            newIndex = Math.floor(Math.random() * (i + 1));
            temp = list[i];
            list[i] = list[newIndex];
            list[newIndex] = temp;
        } return list
    }

    validateAndChange = () => {
        const artistToFind = this.state.artistTrack.artistName.toUpperCase().replace(/\s+/g, '')
        if (artistToFind === this.state.solution) {
            this.setState({ score: this.state.score + 1 });
            this.saveRoundAndLoadNextSong()
        }
    }

    saveRoundAndLoadNextSong = () => {
        this.addToHistory()
        if (this.state.numArtist === rounds - 1) {
            this.setState({ redirect: "/endsession" })
        } else if (this.state.numArtist < rounds - 1) {
            this.nextSong()
        } 

    }

    nextSong = () => {
        this.setState(
            (prevState) => ({ numArtist: prevState.numArtist + 1 }),
            () => this.getArtistTracksList(this.state.artistList[this.state.numArtist].id));
        this.setState({ isPlaying: true })
    }

    addToHistory = () => {
        this.setState(() => ({ sessionHistory: [...this.state.sessionHistory, this.state.artistTrack] }))
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


    componentDidUpdate(props,prevState) {
        if (prevState.solution !== this.state.solution) {
            const solutionBoxes = document.getElementsByClassName("letter")
            for (let i = 0; i < this.state.artistTrack.artistName.replace(/\s+/g, '').length; i++) {
                solutionBoxes[i].textContent = this.state.solution[i]
            }
        }
    }

    updateBoxes = () => {

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect, state: this.state.sessionHistory }} />
        }
        return (
            <div>
                {!this.state.isLoaded ?
                    <div>Loading...</div>
                    :
                    <div>
                        <GameSessionTimeCounter isPlaying={this.state.isPlaying} />
                        <GameSessionAudioPlayer saveRoundAndLoadNextSong={this.saveRoundAndLoadNextSong} artistTrack={this.state.artistTrack} sessionHistory={this.state.sessionHistory} />
                        <GameSessionInterface artistTrack={this.state.artistTrack} handleClick={this.handleClick} handleChange={this.handleChange} handleCorrection={this.handleCorrection} />
                        <PointSystem validateAndChange={this.validateAndChange} score={this.state.score} saveRoundAndLoadNextSong={this.saveRoundAndLoadNextSong} />
                        <GameSessionButtonEndSession />
                    </div>
                }
            </div>
        )
    }

}

export default GameSession