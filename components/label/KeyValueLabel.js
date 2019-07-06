import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'native-base';

export default class KeyValueLabel extends Component {
    render() {
        const {text1, text2, width1, width2} = this.props;

        return (
            <View style={styles.priceItem}>
                <Text style={[styles.priceItemText,{width:width1}]} >{text1+(text2?":":"")} </Text>
                <Text style={[styles.priceItemText,{width:width2}]} >{text2}</Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
      priceItem: {
        flex: 1,
        flexDirection: "row",
        height:20,
        // paddingBottom: 5
      },
      priceItemText:{
          fontSize:13,
          height:20,
          color:"#FFF"
      }
});
    
