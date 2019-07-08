import React, { Component } from 'react'
import { StyleSheet} from "react-native";
import {View, Text} from 'native-base';

export default class ReviewWarning extends Component {
    render() {
            const {target} = this.props;
            if(target && target.id && !target.isVerified){
                return (
                    <View style={styles.warningWrapper}>
                        <Text style={styles.warningMessage}>We are reviewing your request. Meanwhile you can edit your request if you need changes</Text>
                    </View>
                )
            }else{
                return null;
            }
    }
}


const styles = StyleSheet.create({
    warningMessage : {
      color: "green"
    },
  });