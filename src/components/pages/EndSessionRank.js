import React from 'react'

import { Link } from 'react-router-dom'
import './EndSessionRank.css'

class EndSessionRank extends React.Component {
    render(){
       const score = this.props.score
       const username = this.props.username
       return(
            <div className='endSessionRank'>
                <h1> Your ranking :</h1>
                <table >
                    <tr>
                        <th>Rank</th>
                        <th className='rankName'>Name</th>
                        <th>points</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>{username}</td>
                        <td>{score}pts</td>
                    </tr>
             
                </table>
                <Link to={{pathname:'/ranking', score :{username} , username :{username}}}><button>Full ranking</button></Link>
            </div>
        )
    }
}
export default EndSessionRank