import React, { Component } from 'react'
import ItemPicker from "../ItemPicker";
class GenderPicker extends Component {
    state = {
        educationLevels:[{name:"select",id:null},{name:"male",id:1},{name:"female",id:2}]
    }
    componentDidMount(){
        
    }
    render() {
        const {educationLevels} = this.state;
        const { name, component, error } = this.props;
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


export default GenderPicker;

