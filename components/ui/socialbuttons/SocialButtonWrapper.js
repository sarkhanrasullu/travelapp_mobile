import React, { Component } from 'react'
import {  Text, Button } from 'native-base';
import { Icon } from 'react-native-vector-icons';
export default class SocialButtonWrapper extends Component {
    render() {
        const {text, logo, backgroundColor, color} = this.props;
        return (
            <Button light rounded block style={{
                backgroundColor:backgroundColor ,height:40, width:220, alignSelf:"center",
                marginTop:10}}>
                    <Ionicons size={18} name={logo} style={{color:color}}/>
                    <Text style={{fontWeight:"600", fontSize:10, color:color}}>{text}</Text>
            </Button>
        )
    }
}
