import React, { Component } from 'react'
import {Image} from 'react-native'
import { View, Thumbnail, Text } from 'native-base';

export default class ThumbnailText extends Component {
  render() {
        const {text, style, onPress} = this.props;
        let {textColor} = this.props;
        textColor = textColor?textColor:"#fff";
        return (
            <View onTouchStart={onPress} style={{alignItems:"center", alignContent:"center", alignSelf:"center"}}>
                {this.renderImages()}
                <Text style={{fontSize:10,fontWeight:"400", color:textColor}}>
                        {text}
                </Text> 
            </View>
        )
  }

  renderImages = ()=>{
      const {images,text, square} = this.props;
      const borderRadius = square?0:20;
      const result = images.map((value, index)=>{
          const uri = typeof value === "string"? {uri: value}: value;
            return <Thumbnail key={index} large
                        source={uri}
                        style={{ width:40, height:40, borderRadius:borderRadius, backgroundColor:"white" }} />
      })

      return (
        <View style={{alignSelf:"center" ,alignItems:"center", flexDirection:"row", flex:1, maxHeight:40}}>
            {result}
                
        </View>  
        );
  }
}
