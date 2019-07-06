import React, { Component } from 'react'
import ItemPicker from "../ItemPicker";
import {connect} from 'react-redux';
import {setBrands, setModels} from '../../modules/entities';
import Api from '../../api/Api';
class EducationPicker extends Component {
    state = {
        educationLevels:[{name:"select",id:null},{name:"Bacholor",id:1},{name:"Master",id:2},{name:"Highschool",id:3},{name:"Not educated",id:0}]
    }
    componentDidMount(){
        
    }
    render() {
        const { educationLevels} = this.state;
        const {name, component, error} = this.props;
        return (
            <ItemPicker 
            items={educationLevels}  
            placeholder={"select"}
            error={error}
            component={component} 
            name={name}/>
        )
    }
}


export default EducationPicker;

