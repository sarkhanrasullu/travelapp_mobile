import React, { Component } from 'react'
import {  Text, Button, View } from 'native-base';
import { Icon } from 'react-native-vector-icons';
import SocialButtonWrapper from './SocialButtonWrapper';
export default class FacebookButton extends Component {
    render() {
        const {text} = this.props;
        return (
            <SocialButtonWrapper color={"#FFF"} backgroundColor={"#4267b2"}  logo={"logo-facebook"} text={"Login with Facebook"}/>
        )
    }
}
