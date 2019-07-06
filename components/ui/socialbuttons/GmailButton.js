import React, { Component } from 'react'
import {  Text, Button, View } from 'native-base';
import { Icon } from 'expo';
import SocialButtonWrapper from './SocialButtonWrapper';
export default class GmailButton extends Component {
    render() {
        const {text} = this.props;
        return (
            <SocialButtonWrapper logo={"logo-google"} text={"Login with Google"}/>
        )
    }
}
