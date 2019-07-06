import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { View, Text } from 'native-base';

export default class FormSection extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                {this.props.title? <Text style={styles.title}>{this.props.title}</Text>:null}
                {this.props.children}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapper :{
        marginBottom:10,
        width:"100%"
    },  
    title:{
        fontWeight:"600",
        marginTop:15,
    },
})
