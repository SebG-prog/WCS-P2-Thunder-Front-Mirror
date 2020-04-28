import React from "react";
import "./GameSessionInterface.css";

const singleLetter = s => s.toUpperCase().replace(/\s+/g, '').split("").sort().reduce((a, b) => (a[a.length - 1] !== b) ? (a + b) : a, "")

const GameSessionInterface = props => {
    const artistName = props.artistTrack.artistName
    return (
        <div className="interface-container">
            <div className="solutionDisplayBoxes">
                {
                    artistName.split(" ").map((word,i) => (
                        <div key={i} className="word">
                            {word.split("").map((_,i) =>
                                <div key={i} className="letter"></div>
                            )}
                        </div>
                    ))
                }
            </div>
            {/* comment value to avoid auto filling the input  */}
            <input type="text" name="solution" id="userInput" className="userInput" onChange={props.handleChange} spellCheck="false" />
            <div>
                <div className="letterSelection">
                        {
                            singleLetter(artistName).split("").map((letter,i) =>
                            <input type="button" key={i} className="buttonLetter" value={letter} onClick={props.handleClick} />
                            )
                        }
                </div>
            </div>
            <input type="button" className="correctionButton" value="<" onClick={props.handleCorrection} />
        </div>
    )
}

export default GameSessionInterface;