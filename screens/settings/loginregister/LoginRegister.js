import React, { Component } from "react";
import { View, Button, Text } from "native-base";
import {Dimensions, StyleSheet} from 'react-native'
import { withNavigation } from "react-navigation";

const width = Dimensions.get("screen").width

class LoginRegister extends Component {
  render() {
    const{navigation} = this.props;
   
    return (
      <View style={{ width:width, flex:1,flexDirection:"column", justifyContent:"flex-end"}}>
        <View style={{flex:1, flexDirection:"row",width:"80%",maxHeight:50, alignSelf:"center", justifyContent:"space-between"}}>
          <Button style={styles.buttonLogin} onPress={() => { navigation.navigate('Login') }}>
            <Text> Sign in</Text>
          </Button>
          <Button style={styles.buttonRegister} onPress={() => { navigation.navigate('Register') }}>
            <Text>Register</Text>
          </Button>
        </View>
      </View>
    );
  }
}


export default withNavigation(LoginRegister);

const styles = StyleSheet.create({
    buttonLogin:{
        backgroundColor:"#fc8116",
        height:35,
        width:130,
        justifyContent:"center",
    },
    buttonRegister:{
        backgroundColor:"#00000000",
        height:35,
        width:130,
        justifyContent:"center",
        borderWidth:1,
        borderColor:"#CCC"
    }
})
