import React, { Component } from 'react'
import {StyleSheet, TextInput} from 'react-native'
import * as stateUtil from '../api/StateUtil'

export default class FormTextArea extends Component {
    state = {
        val: null
    }
    render() {
        const {placeholder} = this.props;
        return (
            <TextInput
                autoCorrect={false}
                multiline={true}
                numberOfLines={15}
                style={styles.sectionInput}
                placeholder={placeholder}
                defaultValue={stateUtil.get(this)}
                onChangeText={(val) => stateUtil.handleFieldChange(this, val)}
                />
        )
    }
}

const styles = StyleSheet.create({
    sectionInput: {
      width: "100%",
      borderWidth: 0.3,
      borderRadius: 2,
      height: 90,
      marginTop:10
    }, 
    });
    
