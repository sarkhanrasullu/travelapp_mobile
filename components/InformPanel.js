import React, { Component } from 'react'
import { Text } from 'native-base';

export default class InformPanel extends Component {
    render() {
        return (
            <Text style={{alignSelf:"center",marginTop:30}}>{this.props.text}</Text>
        )
    }
}
