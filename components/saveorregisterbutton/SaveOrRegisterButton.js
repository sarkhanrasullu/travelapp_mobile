import React, { Component } from 'react'
import { StyleSheet} from "react-native";
import {connect} from 'react-redux'
import {View, Text} from 'native-base';
import UIButton from '../ui/UIButton';

class SaveOrRegisterButton extends Component {
    render() {
        const {target, onSubmit} = this.props;
        let text = "Register";
        if(target && target.id){
          text= "Save";
        }
        return (<View style={styles.registerButtonWrapper}>
                    <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
                    <Text style={styles.successMessage}>{this.props.successMessage}</Text>
                    <UIButton onPress={onSubmit} 
                    text={text} />
                </View>)
    }
}


const moduleState = state => ({
    errorMessage: state.loading.errorMessage,
    successMessage: state.loading.successMessage,
  });

  export default connect(
    moduleState
  )(SaveOrRegisterButton);

const styles = StyleSheet.create({
    errorMessage : {
      color: "red"
    },
    successMessage:{
      color:"green"
    },
    registerButtonWrapper: {
      alignItems: "center",
      justifyContent: "space-between",
      width: 200,
      paddingTop: 15,
      paddingBottom: 15,
      width:"100%"
    }
  });