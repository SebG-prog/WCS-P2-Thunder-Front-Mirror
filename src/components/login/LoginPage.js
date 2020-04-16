import React from "react"
import{PostData} from '../services/PostData';
import{Redirect} from 'react-router-dom'

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            redirect:false

        }
        this.login=this.login.bind(this);
        this.onChange=this.onChange.bind(this);
   
    }
    login(){

        if(this.state.username && this.state.password){
           PostData('login',this.state).then  ((result) =>{
          let responseJSON = result ;
         if(responseJSON.userData){
            sessionStorage.setItem('userData',responseJSON)
            this.setState({redirect:true})
         }
         else{
             console.log("Login error");
         }
      });  
        }
     
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value });
    }  
    

    render(){
        if(this.state.redirect){
            return(<Redirect to={'/HomePage'}/>)
        }
        return(
            <div>
                <div>
                    <h2>Login Page </h2>
                <label>Username</label>
                <input type="text" placeholder="Username" onChange ={this.onChange} />
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" onChange={this.onChange} /> 
                <input type="submit" value="Login" onClick={this.login} />
                
            </div>
        </div>
        )
    }
} 

 
export default LoginPage