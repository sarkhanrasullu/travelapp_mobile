import React, { Component } from 'react'
import {StyleSheet, Text} from 'react-native'
import { View, Button } from 'native-base';
import ThumbnailTextCircular from '../ThumbnailTextCircular';

export default class ProgressNavigationItem extends Component {
    render() {
        const {selected, submitColor,onSubmitPress, onImagePress, text, image, square, submit, submitText} = this.props;
        const bgColor = selected?"#bcbcbc":null;
        let submitButton = submit?(
            <Button style={[styles.submitButton, {backgroundColor:submitColor}]} onPress={onSubmitPress}>
                    <Text style={styles.submitButtonText}>{submitText}</Text>
            </Button> 
        ):null;
        return (
            <View style={[styles.item, {backgroundColor:bgColor}]}>
                <ThumbnailTextCircular onPress={onImagePress} square={square} textColor="black" text={text} images={[image]}/>
                {submitButton}
             </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        justifyContent:"flex-start",
        width:100,
        paddingTop:10
    },
    submitButtonText:{
        fontSize:15, 
        fontWeight:"600",
        color:"white"
      },
      submitButton:{
          width:80, 
          height:40, 
          marginTop:20,
          justifyContent:"center",
          alignSelf:"center"
      },
})