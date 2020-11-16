import React,{useState} from 'react'
import * as AcknowledgementCss from './Acknowledgement.module.css'

const Acknowledgement = props => {

    let [DivClass,setDivClass]=useState({name : [AcknowledgementCss.Acknowledgement]})

    const onConfirmation = () => {
        let TmpClass = [...DivClass.name]
        TmpClass.push(AcknowledgementCss.Confirmed)
        setDivClass({name: [...TmpClass]})
        props.funToBeExecuted()
    }
    return(
    <div className={DivClass.name.join(" ")}>
        <div className={AcknowledgementCss.AckMsg}>{props.label}</div>
        <button className={AcknowledgementCss.AckButton} onClick={onConfirmation}>{props.button}</button>
    </div>);
}

export default Acknowledgement