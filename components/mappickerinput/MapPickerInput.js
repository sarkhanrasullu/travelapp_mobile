import React, { Component } from 'react'
import {Input,View, Text} from 'native-base'
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as stateUtil from '../../api/StateUtil'
import MapPicker from '../mappicker/MapPicker';

export default class MapPickerInput extends Component {
    state = {
        val: null,
        isMapVisible: false
    }

    handleMapPicker = ()=>{
        console.log('handle map picker')
        this.setState({isMapVisible:true});
    }

    handleSubmit = ()=>{
        this.setState({isMapVisible: false});
    }

    handleCancel = ()=>{
        this.setState({isMapVisible: false});
    }

    render() {
        const { placeholder, error, readOnly } = this.props;
        let currentValue = stateUtil.get(this);
        currentValue = currentValue?currentValue+"":null;
        return (
            <MapPicker 
            onSubmitPress={this.handleSubmit}
            onCancelPress={this.handleCancel}
            isVisible={this.state.isMapVisible}/>
            // <React.Fragment>
                /* <TouchableOpacity opacity={1} 
                onPress={this.handleMapPicker}>
                    <Text>Click here</Text>
                        <Input  
                            disabled={true} 
                            placeholderTextColor={error ?"red":"#666666"} 
                            autoCapitalize={"none"} 
                            autoCorrect={false} 
                            placeholder={placeholder} 
                            defaultValue={currentValue} 
                            style={[styles.sectionInput, error ? styles.errorInput:null]} 
                            onChangeText={(val)=>{
                                let v = val;
                                stateUtil.handleFieldChange(this, v);
                            }}
                        />
                </TouchableOpacity> */
               
            // </React.Fragment>
        )
    }
}


const styles = StyleSheet.create({
      sectionInput: {
        width: "100%",
        borderWidth: 0.3,
        borderRadius: 2,
        height: 40,
        marginTop:10,
      }, 
      errorInput: {borderColor:"red", borderWidth:1}
  });


