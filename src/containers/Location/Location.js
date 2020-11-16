import React from 'react'
import * as LocationCss from './Location.module.css'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import Acknowledgement from '../../components/Acknowledgement/Acknowledgement'
import * as CONSTANTS from '../constants/indexConstants'

class Location extends React.Component {
    locationData = null
    state = {
        state : null,
        district : null,
        area : null,
        inv_cnt : null,
        getDataSuccess : false,
        updatedFlag : false,
        error : null
    }

    getLocationData = props => {
        axios.get("https://retail-edef3.firebaseio.com/India.json")
        .then(response => {
            this.locationData = response.data;
            if(this.state.state === null && this.state.getDataSuccess === false) 
            {
                this.setState({state : null, district : null, area : null, inv_cnt : null, getDataSuccess : true})
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount(){
        console.log("componentDidMount")
        this.getLocationData()
    }

    componentDidUpdate(){
        console.log("componentDidUpdate")
        if(!this.state.getDataSuccess)
        {
            console.log("updating the location data")
            this.getLocationData()
        }
    }

    onSelectState = event => {
        console.log("selected state is "+event.target.value)
        let selectedState = event.target.value
        this.setState({state : selectedState, district : null, area : null, inv_cnt : null})
    }

    onSelectDistrict = event => {
        console.log("selected District is "+event.target.value)
        let selectedDistrict = event.target.value
        this.setState({district : selectedDistrict, area : null, inv_cnt : null})
    }

    onSelectArea = event => {
        console.log("selected Area is "+event.target.value)
        let selectedArea = event.target.value
        let inv_cnt = Number(this.locationData[this.state.state][this.state.district]['areas'][selectedArea])
        this.setState({area : selectedArea, inv_cnt : inv_cnt})
    }

    onChangeInvCnt = event => {
        if(!this.validateInvCnt(event.target.value))
            this.setState({inv_cnt : event.target.value, error : CONSTANTS.ERRORS.INVENTORY_NUMBER_ERROR})
        else
            this.setState({inv_cnt : Number(event.target.value), error : null})
    }

    updateInventory = event => {
        event.preventDefault()
        let SampleData = null
        console.log(this.locationData[this.state.state][this.state.district]['areas'][this.state.area])
        console.log(this.state.inv_cnt)
        if(this.locationData[this.state.state][this.state.district]['areas'][this.state.area] === this.state.inv_cnt){
            this.setState({error : CONSTANTS.ERRORS.INVENTORY_NOCHANGE_ERROR})
        }
        else if(this.state.error === null)
        {
        this.locationData[this.state.state][this.state.district]['areas'][this.state.area] = this.state.inv_cnt
        SampleData = {...this.locationData}
        axios.put('https://retail-edef3.firebaseio.com/India.json',SampleData)
                .then(response => console.log(response))
                .catch(error => console.log(error))
        this.setState({getDataSuccess : false, updatedFlag : true, error : null})
        }
    }

    onConfirmedMsg = () => {
        console.log("User confirmed")
        this.setState({updatedFlag:false});
    }

    validateInvCnt = InvCnt => {
        let regex=/([0-9]+){1,}/
        return(regex.test(InvCnt))    
    }

    disableUpdate = () => {
        return (this.state.error !== null ? true : false)
    }

    render(){
        let DisplayForm = <Loader/>
        let StateList = null;
        let DistrictList = null
        let AreaList = null
        let InvCnt = null

        if(this.locationData !== null){

            StateList = Object.keys(this.locationData).map((data,index)=>{
                return(<option key={data} value={data} >{data}</option>);
                })
            
            if(this.state.state !== null && this.state.state !== "Select")
            {
                console.log("not null",this.state.state)
                DistrictList = <div><label>Select The District </label>
                    <select name="district" onChange={(event)=>this.onSelectDistrict(event)}>
                    <option key="Select" value="Select" >Select</option>
                    {Object.keys(this.locationData[this.state.state]).map((data,index)=>{
                    return(<option key={data} value={data} >{data}</option>);
                })}
                </select></div>

                if(this.state.district !== null && this.state.district !== "Select")
                {
                    console.log(this.state.district)
                    console.log(this.locationData[this.state.state])
                    console.log(this.locationData[this.state.state][this.state.district]['areas'])
                    AreaList = <div><label>Select The Area </label><select name="area" onChange={(event)=>this.onSelectArea(event)}>
                    <option key="Select" value="Select" >Select</option>
                    {Object.keys(this.locationData[this.state.state][this.state.district]['areas']).map((data,index)=>{
                    return(<option key={data} value={data} >{data}</option>);
                    })}
                    </select></div>

                    if(this.state.inv_cnt !== null && this.state.area !== "Select")
                    {
                        InvCnt = <div>
                            <div>Inventory count : <input type="text" value={this.state.inv_cnt} onChange={(event)=>this.onChangeInvCnt(event)}/></div>
                            <button type="submit" className={LocationCss.Update} disabled={this.disableUpdate()}>Update</button>
                            </div>
                    }
                }
            }

            DisplayForm = <form onSubmit={(event)=>this.updateInventory(event)}>
            <div>
                <label>Select the State </label>
            <select name="state" onChange={(event)=>this.onSelectState(event)}>
                <option key="Select" value="Select" >Select</option>
                {StateList}
            </select>
            </div>
                {DistrictList}
                {AreaList}
                {InvCnt}
            {this.state.error !== null ? <div>{this.state.error}</div> : null}
            </form>

            
        }
            
        return(
        <div className={LocationCss.Location}>
            {DisplayForm}
            {this.state.updatedFlag ? <Acknowledgement label="Details Updated !!" button="OK !" funToBeExecuted={this.onConfirmedMsg}/> : null}
        </div>);
    }
}

export default Location