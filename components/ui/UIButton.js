import React, { Component } from 'react'
import {  Text, Button } from 'native-base';

export default class UIButton extends Component {
    render() {
        const {text, style, onPress, bgColor} = this.props;
        return (
            <Button onPress={onPress} rounded block style={[
                bgColor?{backgroundColor:bgColor}:null,
                style,
                {height:40, width:150, alignSelf:"center", marginTop:10}]}>
                    <Text style={{fontWeight:"600"}}>{text}</Text>
            </Button>
        )
    }
}
