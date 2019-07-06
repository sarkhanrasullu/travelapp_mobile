import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  View,
  Picker,
} from "native-base";
import * as stateUtil from '../api/StateUtil'

export default class ItemPicker extends Component {
  state = {
    val: null
}
    render() {
        const {items, error, placeholder, onValueChange} = this.props;
        
        const pickerItems = items.map((val, index)=>{
            return <Picker.Item key={index} label={val.name} value={val.id}/>
        })

        return (
            <View style={[styles.sectionInput, error ? styles.errorInput:null]} 
            >
              <Picker
                style={[styles.picker]} 
                textStyle={styles.pickerText}
                mode="dialog"
                placeholderStyle={[styles.pickerPlaceHolder, error ? styles.pickerPlaceHolderError:null]} 
                placeholder={placeholder}
                onValueChange={val => {
                  if(onValueChange)
                    onValueChange(val);
                    stateUtil.handleFieldChange(this, val);
                  } 
                }
                selectedValue={stateUtil.get(this)}
              >
                {pickerItems}
              </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    picker:{
      height:"100%", width:"100%",marginLeft:0, paddingLeft: 0
    },
    pickerText:{
      paddingLeft:5
    },
    pickerPlaceHolder:{
      color:"#666666", paddingLeft: 5 
    },
    pickerPlaceHolderError:{
      color:"red", paddingLeft: 5 
    },
    sectionInput: {
      width: "100%",
      borderWidth: 0.3,
      borderRadius: 2,
      height: 40,
      marginTop: 10
    },
    errorInput: {borderColor:"red", borderWidth:1}
  });
  