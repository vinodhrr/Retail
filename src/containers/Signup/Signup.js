import React,{useState} from 'react'
import * as SignupCss from './Signup.module.css'
import Instruction from '../../components/Signup/Instruction'
import * as CONSTANTS from '../constants/indexConstants'

const Signup = (props)=> {
    let [username,setUsername] = useState({username : null, error : null});
    let [email,setEmail] = useState({email : null, error : null});
    let [password1,setPassword1] = useState({password1 : null, error : null});
    let [password2,setPassword2] = useState({password2 : null, error : null});
    let usernameClass,emailClass,password1Class,password2Class;
    let displayError = null

    usernameClass = emailClass = password1Class = password2Class = SignupCss.Input

    if(username.error !== null)
        usernameClass+=" "+SignupCss.onError
    if(email.error !== null)
        emailClass+=" "+SignupCss.onError
    if(password1.error != null)
        password1Class+=" "+SignupCss.onError
    if(password2.error != null)
        password2Class+=" "+SignupCss.onError

    displayError = username.error || email.error || password1.error || password2.error

    console.log(displayError)

    const sendSignUpDetails = event => {
        event.preventDefault();
        
    }

    const validateEmail = email => {
        const re=/(^[a-z0-9]*)+@+(?:[a-z]*\.[a-z]+)/i;
        return re.test(String(email))
    }

    const validatePassword = password => {
        const re=/(([A-Z]+[a-z]+[0-9]+[!@#$%^&*()]+))|(([a-z]+[A-Z]+[0-9]+[!@#$%^&*()]+))|(([0-9]+[a-z]+[A-Z]+[!@#$%^&*()]+))/g
        return re.test(password)
    }

    const onUsernameChange = event => {
        let error = null
        let inputString=event.target.value
        if(inputString.length < CONSTANTS.SIGNUP.USERNAME_LENGTH)
            error = CONSTANTS.ERRORS.USERNAME_COMPLIANCE_ERROR
        if(inputString.length === CONSTANTS.SIGNUP.USERNAME_DEFAULT_LENGTH)
            error = null
        setUsername({username : inputString, error : error})
    }

    const onEmailChange = event => {
        let error = null
        let inputString=event.target.value
        if(!validateEmail(inputString))
            error = CONSTANTS.ERRORS.EMAIL_COMPLIANCE_ERROR
        setEmail({email : inputString, error : error})
    }

    const onPasswor1Change = event => {
        let error = null
        let inputString=event.target.value
        if(inputString.length < CONSTANTS.SIGNUP.PASSWORD_MINLENGTH || inputString.length > CONSTANTS.SIGNUP.PASSWORD_MAXLENGTH)
            error = CONSTANTS.ERRORS.PASSWORD_LENGTH_ERROR
        if(inputString.length === CONSTANTS.SIGNUP.USERNAME_DEFAULT_LENGTH)
            error = null
        if(!validatePassword(inputString))
            error = CONSTANTS.ERRORS.PASSWORD_COMPLIANCE_ERROR
        if(password2.password2 !== null && password2.password2 !== inputString)
            error = CONSTANTS.ERRORS.PASSWORD_MISMATCH_ERROR
        setPassword1({password1 : inputString, error : error})
    }

    const onPasswor2Change = event => {
        let error = null
        let inputString=event.target.value
        if(inputString.length < CONSTANTS.SIGNUP.PASSWORD_MINLENGTH || inputString.length > CONSTANTS.SIGNUP.PASSWORD_MAXLENGTH)
            error = CONSTANTS.ERRORS.PASSWORD_LENGTH_ERROR
        if(inputString.length === CONSTANTS.SIGNUP.USERNAME_DEFAULT_LENGTH)
            error = null
        if(!validatePassword(inputString))
            error = CONSTANTS.ERRORS.PASSWORD_COMPLIANCE_ERROR
        if(password1.password1 !== null && password1.password1 !== inputString)
            error = CONSTANTS.ERRORS.PASSWORD_MISMATCH_ERROR
        setPassword2({password2 : inputString, error : error})
    }

    return(
        <div>
            <Instruction/>
        <div className={SignupCss.Signup}>
            <img src="/signup.png" alt="not available"/>
            <form onSubmit={sendSignUpDetails}>

            <input type="text" 
            placeholder="Enter your Name" 
            name="Username" 
            className={usernameClass} 
            onChange={(event)=>onUsernameChange(event)}/>

            <input 
            type="email" 
            placeholder="Enter your Email-ID" 
            name="EmailId" 
            className={emailClass}
            onChange={(event)=>{onEmailChange(event)}}/>

            <input 
            type="password" 
            placeholder="Enter your Password" 
            name="Password" 
            className={password1Class}
            onChange={(event)=>{onPasswor1Change(event)}}/>

            <input 
            type="password" 
            placeholder="Re-Enter your Password" 
            name="Password" 
            className={password2Class}
            onChange={(event)=>{onPasswor2Change(event)}}/>

            <button disabled={displayError!==null ? true : false} className={SignupCss.Submit}>Signup</button>

            <div>{displayError} {}</div>
            </form>
        </div>
        </div>
    );
}

export default Signup