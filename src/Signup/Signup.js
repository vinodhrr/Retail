import React,{useState} from 'react'
import * as SignupCss from './Signup.module.css'

const Signup = (props)=> {
    let [username,setUsername] = useState({username : null});
    let [email,setEmail] = useState({email : null});
    let [password1,setPassword1] = useState({password1 : null});
    let [password2,setPassword2] = useState({password2 : null, error : null});

    const sendSignUpDetails = event => {
        event.preventDefault();

    }

    const onUsernameChange = event => {
        setUsername({username : event.target.value})
    }

    const onEmailChange = event => {
        setEmail({email : event.target.value})
    }

    const onPasswor1Change = event => {
        setPassword1({password1 : event.target.value})
    }

    const onPasswor2Change = event => {
        let error = null
        if(password1.password1!=event.target.value){
            console.log(password1.password1 + " " + event.target.value)
            error = "Password doesnt match"
        }
        setPassword2({password2 : event.target.value, error : error})
    }

    return(
        <div className={SignupCss.Signup}>
            <img src="/signup.png" alt="not available"/>
            <form onSubmit={sendSignUpDetails}>

            <input type="text" 
            placeholder="Enter your Name" 
            name="Username" 
            className={SignupCss.Input} 
            onChange={(event)=>onUsernameChange(event)}/>

            <input 
            type="email" 
            placeholder="Enter your Email-ID" 
            name="EmailId" 
            className={SignupCss.Input}
            onChange={(event)=>{onEmailChange(event)}}/>

            <input 
            type="password" 
            placeholder="Enter your Password" 
            name="Password" 
            className={SignupCss.Input}
            onChange={(event)=>{onPasswor1Change(event)}}/>

            <input 
            type="password" 
            placeholder="Re-Enter your Password" 
            name="Password" 
            className={SignupCss.Input}
            onChange={(event)=>{onPasswor2Change(event)}}/>

            <label>{password2.error}</label>

            <button className={SignupCss.Submit}>Signup</button>
            </form>
        </div>
    );
}

export default Signup