import React,{useState} from 'react';
import * as LoginCss from './Login.module.css';
import Instruction from '../../components/Login/Instruction'
import axios from 'axios'
import * as CONSTANTS from '../constants/indexConstants'

const Login = props => {

    let [Email,setEmail] = useState({email:null, error:null})
    let [Password,setPassword] = useState({password:null, error:null})
    let [Error,setError] = useState({error:null});

    let displayError =null;

    displayError = Email.error || Password.error || Error.error

    const onChangeEmail = event => {
        console.log(event.target.value)
        let error=null
        if(!validateEmailID(event.target.value))
            error=CONSTANTS.ERRORS.EMAILID_LOGIN_ERROR
        console.log(error)
        setEmail({email:event.target.value, error:error})
    }

    const onChangePassword = event => {
        let error=null
        if(!validatePassword(event.target.value))
            error=CONSTANTS.ERRORS.PASSWORD_LOGIN_ERROR
        console.log(error)
        setPassword({password:event.target.value, error:error})
    }

    const postBody = body => {
        console.log(body)
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1ljrHjMRBj0eApCM2wbgpstNOB6cbs6c'
        ,body)
        .then(
        response=>{
            console.log("response",response)
            props.history.replace(props.match.url + "/inventory");
        })
        .catch(error=>{
            setError({error: CONSTANTS.ERRORS.LOGIN_ERROR})
        });
    }

    const validateEmailID = mailID => {
        const re=/(^[a-z0-9]*)+@+(?:[a-z]*\.[a-z]+)/i;
        console.log(re.test(String(mailID)))
        return re.test(String(mailID))
    }

    const validatePassword = password => {
        const re=/^([a-zA-Z!@#$%^&*()_+0-9])+/i
        console.log(password)
        console.log(re.test(String(password)))
        return re.test(String(password))
    }

    const signIn = event => {
        event.preventDefault()
        let body={email:Email.email,password:Password.password,returnSecureToken:true}
        if(displayError === null && Email.email !== null && Password.password !== null)
            postBody(body)
    }

    const disableSubmit = () => {
        if(displayError === CONSTANTS.ERRORS.MAILID_LOGIN_ERROR || displayError === CONSTANTS.ERRORS.PASSWORD_LOGIN_ERROR)
            return true
        else
            return false
    } 

    return(
        <div>
            <Instruction/>
        <div className={LoginCss.Login}>
        <img src="/user_icon.jpg" className={LoginCss.img} alt="Not available"/>
        <form onSubmit={(event)=>signIn(event)}>
        <input type="text" placeholder="Username" className={LoginCss.Input} onChange={onChangeEmail}></input>
        <input type="password" placeholder="Password" className={LoginCss.Input} onChange={onChangePassword}></input>
        <button type="submit" disabled={disableSubmit()} className={LoginCss.Submit}>Login</button>
        <div>{displayError}</div>
        </form>
        </div>
        </div>
    );
}

export default Login