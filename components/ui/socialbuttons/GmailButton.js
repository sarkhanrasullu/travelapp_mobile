import React, { Component } from 'react'
import SocialButtonWrapper from './SocialButtonWrapper';
export default class GmailButton extends Component {
    render() {
        const {text} = this.props;
        return (
            <SocialButtonWrapper logo={"logo-google"} text={"Login with Google"}/>
        )
    }
}
