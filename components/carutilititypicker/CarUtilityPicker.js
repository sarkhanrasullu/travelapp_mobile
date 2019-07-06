import React, { Component } from 'react'
import CheckBoxList from "./../CheckBoxList";
import Api from '../../api/Api';
export default class CarUtilityPicker extends Component {

     
    componentDidMount(){
        const {component} = this.props;
        Api.loadCarUtilities(component)
    }
    
    render() {
        const {component} = this.props;
        return (
            <CheckBoxList 
            items={component.state.carUtilities} 
            component={component}
            />
        )
    }
}
