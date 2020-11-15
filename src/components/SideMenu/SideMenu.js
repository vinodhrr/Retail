import React from 'react'
import * as SideMenuCss from './SideMenu.module.css'
import {withRouter} from 'react-router-dom'

class SideMenu extends React.Component{
    loginListener = event => {
        this.props.history.push("/login")
    }
    signupListener = event => {
        this.props.history.push("/signup/")
    }
    render(){
        return(
         <div className={SideMenuCss.SideMenu}>
            <div>
            <button className={SideMenuCss.Button} onClick={(event)=>{this.loginListener(event)}}>Login</button>
            </div>
            <div>
            <button className={SideMenuCss.Button} onClick={(event)=>{this.signupListener(event)}}>Signup</button>
            </div>
         </div>
        );
    }
}

export default withRouter(SideMenu)