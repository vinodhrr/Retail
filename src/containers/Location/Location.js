import React from 'react'
import * as LocationCss from './Location.module.css'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import { render } from '@testing-library/react'

class Location extends React.Component {
    locationData = null
    state = {
        state : null,
        district : null,
        area : null,
        getDataSuccess : false
    }

    componentDidMount(){
        axios.get("https://retail-edef3.firebaseio.com/India.json")
        .then(response => {
            console.log("got the respnse data")
            this.locationData = response.data;
            if(this.state.state === null && this.state.getDataSuccess === false) 
            {
                console.log("setting the state")
                this.setState({getDataSuccess : true})
            }
        })
        .catch(error => {
            console.log(error)
        })
    }


    onSelectState = event => {
        console.log("selected state is "+event.target.value)
        let selectedState = event.target.value
        this.setState({state : selectedState})
    }

    onSelectDistrict = event => {
        console.log("selected District is "+event.target.value)
        let selectedDistrict = event.target.value
        this.setState({district : selectedDistrict})
    }

    onSelectArea = event => {
        console.log("selected Area is "+event.target.value)
        let selectedArea = event.target.value
        this.setState({area : selectedArea})
    }

    render(){
        let DisplayForm = <Loader/>
        let StateList = null;
        let DistrictList = null
        let AreaList = null

        if(this.locationData !== null){

            StateList = Object.keys(this.locationData).map((data,index)=>{
                return(<option key={data} value={data} >{data}</option>);
                })
            
            if(this.state.state !== null && this.state.state != "Select")
            {
                console.log("not null",this.state.state)
                DistrictList = <div><label>Select The District </label><select name="district" onChange={(event)=>this.onSelectDistrict(event)}>
                    <option key="Select" value="Select" >Select</option>
                    {Object.keys(this.locationData[this.state.state]).map((data,index)=>{
                    return(<option key={data} value={data} >{data}</option>);
                })}
                </select></div>

                if(this.state.district != null && this.state.district != "Select")
                {
                    console.log(this.locationData[this.state.state][this.state.district]['areas'])
                    AreaList = <div><label>Select The Area </label><select name="area" onChange={(event)=>this.onSelectArea(event)}>
                    <option key="Select" value="Select" >Select</option>
                    {Object.keys(this.locationData[this.state.state][this.state.district]['areas']).map((data,index)=>{
                    return(<option key={data} value={data} >{data}</option>);
                    })}
                    </select></div>
                }
            }

            DisplayForm = <form>
            <div>
                <label>Select the State </label>
            <select name="state" onChange={(event)=>this.onSelectState(event)}>
                <option key="Select" value="Select" >Select</option>
                {StateList}
            </select>
            </div>
                {DistrictList}
                {AreaList}
            </form>

            
        }
            
        return(
        <div className={LocationCss.Location}>
            {DisplayForm}
             {/* <form>
                <select name="State" onChange={onSelectState}>
                    <option value="TamilNadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                </select>
                <select name="District">
                    <option>Trichy</option>
                    <option>Chennai</option>
                </select>
                <select name="Area">
                    <option></option>
                    <option></option>
                </select>
            </form> */}
        </div>);
    }
}

export default Location