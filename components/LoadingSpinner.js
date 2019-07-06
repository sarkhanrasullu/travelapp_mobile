import React, { Component } from 'react'
import {ActivityIndicator} from 'react-native'
import { View, Text } from 'native-base';

export default class LoadingSpinner extends Component {
    render() {
        const textComponent = this.props.text? (<Text>{this.props.text}</Text>):null;
        return (
            <View style={{minHeight:500,maxHeight:500, width:"100%"}}>
                <View style={{alignSelf:"center",marginTop:"50%",minHeight:50,maxHeight:50}}>
                    <ActivityIndicator></ActivityIndicator>
                    {textComponent}
                </View>
            </View>
        )
    }
}
