import React, { Component } from 'react'
import { View } from 'native-base';

export default class ViewRow extends Component {
    render() {
        const {width, style} = this.props;
        return (
            <View style={[style, {flex:1, flexDirection:"row", justifyContent:"space-between", width:width}]}>
                {this.props.children}
            </View>
        )
    }
}
