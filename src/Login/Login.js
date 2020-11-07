import React from 'react';
import * as LoginCss from './Login.module.css';
class Login extends React.Component
{
    render(){
        
        return(
            <div className={LoginCss.Login}>
            <img src="/user_icon.jpg" className={LoginCss.img} alt="Not available"/>
            <input type="text" placeholder="Username" className={LoginCss.Input} ></input>
            <input type="password" placeholder="Password" className={LoginCss.Input}></input>
            <button type="submit" className={LoginCss.Submit}>Login</button>
            </div>
        );
    }
}

export default Login