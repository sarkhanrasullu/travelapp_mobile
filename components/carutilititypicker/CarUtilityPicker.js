import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../api/Api';
import { setLoading } from '../../modules/loading';
import CheckBoxList from "./../CheckBoxList";

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