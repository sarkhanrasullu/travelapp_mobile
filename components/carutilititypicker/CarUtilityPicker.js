import React, { Component } from 'react'
import CheckBoxList from "./../CheckBoxList";
import Api from '../../api/Api';
import {setLoading} from '../../modules/loading';
import {connect} from 'react-redux';

class CarUtilityPicker extends Component {
     
    componentWillMount(){
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

const actions = {
    setLoading
}
export default connect(null, actions)(CarUtilityPicker);