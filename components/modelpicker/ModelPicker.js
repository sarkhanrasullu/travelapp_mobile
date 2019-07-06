import React, { Component } from 'react'
import ItemPicker from "./../ItemPicker";
import {connect} from 'react-redux';

class ModelPicker extends Component {

    componentDidMount(){
 
    }
    render() {
        const {name, component, error, models} = this.props;
        return (
            <ItemPicker 
            items={models} 
            placeholder={"select"}
            error={error}
            component={component} 
            name={name}/>
        )
    }
}

const state = state =>({
    models: state.entities.models
})

export default connect(state)(ModelPicker);

