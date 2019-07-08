import React, { Component } from 'react'
import { WebView } from 'react-native';
import * as settings from './../../constants/Settings';
export default class PaymentWindow extends Component {
    render() {
        //console.log(settings.settings.ipRoot+':8085/SmallMerchantTest/checkout.jsp?amount=1');
        return (
            <WebView
            originWhitelist={['85.132.17.121','192.168.1.103']}
                    scalesPageToFit={false}
                    source={{uri: 'http://192.168.1.103:8085/SmallMerchantTest/checkout.jsp?amount=1'}}
                style={{marginTop: 20}}
                />
        )
    }
}
