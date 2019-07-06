import React, { Component } from 'react'
import { View,  Text,  } from 'native-base';
import {Image} from 'react-native'
import ImageViewer from './imageviewer/ImageViewer';

export default class ThumbnailText extends Component {
  render() {
        const {text, style, fontSize} = this.props;
        return (
            <View style={style}>
                {this.renderImages()}
                <Text style={{ alignSelf: "center" ,fontWeight: "600", fontSize: fontSize}}>
                    {text}
                </Text> 
            </View>
        )
  }

  renderImages = ()=>{
      const {images, width, height} = this.props;

      const result = images.map((value, index)=>{
            return <ImageViewer 
                        key={index} 
                        uri={value}
                        base64={this.props.base64}
                        direct={this.props.direct}
                        style={{ alignSelf: "center", width:width, height:height }} />
      })

      return (
        <View style={{flexDirection: "row", flex: 1, alignSelf: "center"}}>
            {result}
        </View>  
        );
  }
}
