import React, { Component } from 'react'
import { Image } from "react-native";

export default class ImageViewer extends Component {
    render() {
        const { style, base64, direct, resizeMode } = this.props;

        let rsMode = resizeMode?resizeMode:"contain";
        let {uri} = this.props;

        if(base64 || !direct){
            uri = {uri:uri};
        }

        return (
            <Image resizeMode={rsMode} style={style} source={uri} />
        )
    }
}
