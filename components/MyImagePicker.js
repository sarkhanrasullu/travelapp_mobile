import React, { Component } from "react";
import { StyleSheet, PixelRatio, TouchableOpacity, Image} from "react-native";
import {
  View,
  Text,
} from "native-base";
import { ImagePicker, Permissions } from 'expo';
import * as stateUtil from '../api/StateUtil'

export default class MyImagePicker extends Component {

  state = {
    avatarSource: null,
  }
 

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  selectPhotoTapped = async () => {
    await this.askPermissionsAsync();
    const options = {
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    };
    let result = await ImagePicker.launchImageLibraryAsync(options);
    if (!result.cancelled) {
      stateUtil.handleFieldChange(this, result.base64)
    }
  }

    render() {
      const {square, component, name, error} = this.props;
      let {label} = this.props;
      label = label? label: "Select a Photo";
      const avatarStyle = square?styles.avatarSquare:styles.avatarRound;
      let imageUri = stateUtil.get(this);
      imageUri = imageUri? imageUri: undefined;
        return (
             <TouchableOpacity onPress={this.selectPhotoTapped}>
                        <View
                          style={[
                            avatarStyle,
                            styles.avatarContainer,
                            error ? styles.errorInput:null
                          ]}
                        >
                          {component.state[name] === null ? (
                            <Text>{label}</Text>
                          ) : (
                            <Image style={avatarStyle} source={{uri:`data:image/jpg;base64,${imageUri}`}} />
                          )}
                        </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    avatarContainer: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20, 
    },
    avatarRound: { 
      borderRadius: 75,
      width: 150,
      height: 150,
    },
    avatarSquare: {
      width: 150,
      height: 150,
    },
    errorInput: {borderColor:"red", borderWidth:1}
})