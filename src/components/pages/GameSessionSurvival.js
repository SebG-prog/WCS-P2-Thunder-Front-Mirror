import React from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

import CountDownTimer from './CountDownTimer';
import GameSessionAudioPlayer from "./GameSessionAudioPlayer";
import GameSessionButtonEndSession from "./GameSessionButtonEndSession";
import GameSessionHeader from "./GameSessionHeader";
import GameSessionInterface from "./GameSessionInterface";
import GameSessionPointSystem from "./GameSessionPointSystem";
import Loader from '../Loader/Loader';

import API_KEY from '../../secret'

const rounds = 10
const startTime = 30

class GameSessionSurvival extends React.Component {
    state = {
        artistTrackList: [],
        artistTrack: {}, /* Contains the song currently playing */
        isLoaded: false,
        numArtist: 0,
        solution: null,
        score: 0,
        isArtistFound: null,
        sessionHistory: [],
        genresTitle : "Survival",
        color: this.props.location.background,
        redirect: null,
        counter: 30
    }

    componentDidMount() {
        this.getArtistTrackList()
    }

    /* First call to the api to get a random list of artists. The number of artists selected will be defined by the rounds value */
    getArtistTrackList = () => {
        axios.get(`http://api.napster.com/v2.2/tracks/top`,
            {
                params: {
                    apikey: API_KEY,
                    limit: rounds
                }
            })
            .then(res => {
                this.setState({
                    artistTrackList: res.data.tracks,
                    artistTrack: res.data.tracks[0],
                    isLoaded: true,
                    solution: "",
                    isArtistFound: false
                },
                    () => console.log(this.state.artistTrack))
            })
    }

    /* Randomized an array. this function is called both on the get ArtistsList and get ArtistTracksList */
    /*  getListShuffled = (list) => {
         let newIndex, temp;
         for (let i = list.length - 1; i > 0; i--) {
             newIndex = Math.floor(Math.random() * (i + 1));
             temp = list[i];
             list[i] = list[newIndex];
             list[newIndex] = temp;
         } return list
     } */

    validateAndChange = () => {
        const artistToFind = this.state.artistTrack.artistName.toUpperCase().replace(/\s+/g, '')
        if (artistToFind === this.state.solution) {
            this.setState((prevState) => ({ score: prevState.score + prevState.counter, isArtistFound: true }));
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

    addToHistory = () => {
        this.setState((prevState) => ({ sessionHistory: [...prevState.sessionHistory, { numArtist: prevState.numArtist, artistTrack: prevState.artistTrack, isArtistFound: prevState.isArtistFound }] }))
    }

    nextSong = () => {
        this.setState(
            (prevState) => ({ numArtist: prevState.numArtist + 1 }),
            // () => this.getArtistTracksList(this.state.artistList[this.state.numArtist].id));
            () => this.setState({ artistTrack: this.state.artistTrackList[this.state.numArtist] },
                () => {
                    this.setState({solution: ""})
                    this.restartCounter()
                    document.getElementById("userInput").value = ""
                    document.getElementById("audioPlayer").play()
                }));
    }

    /*CountDownTimer methods*/

    updateCounter = () => {
        this.setState({ counter: this.state.counter - 1 })
    }

    restartCounter = () => {
        document.querySelector(".circle").style.animation = "none"
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                document.querySelector(".circle").style.animation = `countdown-animation ${startTime}s linear, color-animation ${startTime}s linear`;
            })
        })
        this.setState({ counter: startTime })
    }

    /*  Functions used in the userinterface that aims at inputing a letter, erease and update the number of boxes based on the artist being played */
    handleClick = event => {
        const letter = event.target.value
        if (this.state.solution.length < this.state.artistTrack.artistName.replace(/\s+/g, '').length) {
            this.setState({ solution: this.state.solution + letter })
        }
    }

    handleChange = event => {
        const input = event.target.value.replace(/\s+/g, '').toUpperCase()
        this.setState({ solution: input })
    }

    handleCorrection = () => {
        this.setState({ solution: this.state.solution.slice(0, -1) })
    }

    componentDidUpdate(props, prevState) {
        if (prevState.solution !== this.state.solution) {
            const solutionBoxes = document.getElementsByClassName("letter")
            for (let i = 0; i < this.state.artistTrack.artistName.replace(/\s+/g, '').length; i++) {
                solutionBoxes[i].textContent = this.state.solution[i]
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect, state: this.state.sessionHistory }} />
        }
        return (

            <div>
                {!this.state.isLoaded ?
                    <div><Loader /></div>
                    :
                    <div>
                        <GameSessionHeader genresTitle={this.state.genresTitle} color={this.state.color} />
                        <CountDownTimer counter={this.state.counter} startTime={startTime} updateCounter={this.updateCounter} />
                        <GameSessionAudioPlayer saveRoundAndLoadNextSong={this.saveRoundAndLoadNextSong} artistTrack={this.state.artistTrack} sessionHistory={this.state.sessionHistory} />
                        <GameSessionInterface artistTrack={this.state.artistTrack} handleClick={this.handleClick} handleChange={this.handleChange} handleCorrection={this.handleCorrection} />
                        <GameSessionPointSystem validateAndChange={this.validateAndChange} score={this.state.score} saveRoundAndLoadNextSong={this.saveRoundAndLoadNextSong} counter={this.state.counter} />
                        <GameSessionButtonEndSession />
                    </div>
                }
            </div>
        )
    }
}

export default GameSessionSurvival;





