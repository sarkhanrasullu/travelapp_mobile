import React, { Component } from 'react'
import ItemPicker from "./../ItemPicker";
import {connect} from 'react-redux';
import {setBrands, setModels} from '../../modules/entities';
import Api from '../../api/Api';
class BrandPicker extends Component {

    componentDidMount(){
        
    }
    render() {
        const {name, component, error, brands} = this.props;
        return (
            <ItemPicker 
            onValueChange={(brandId)=>{Api.loadModels(this, brandId)}}
            items={brands}  
            placeholder={"select"}
            error={error}
            component={component} 
            name={name}/>
        )
    }
}

const state = state =>({
    brands: state.entities.brands
})

const actions = {
    setBrands,
    setModels,
}

export default connect(state, actions)(BrandPicker);

