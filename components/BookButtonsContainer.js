import React, { Component } from "react";
import { Dimensions, TouchableOpacity} from "react-native";
import Ionicons from "react-native-ionicons";
import { View, Text } from "native-base";
import { connect } from 'react-redux';
import { setDestination } from '../modules/entities';
import { withNavigation } from "react-navigation";
const { width } = Dimensions.get("window");
const buttonsContainerWidth = width;
const buttonContainerWidth = buttonsContainerWidth * 0.49;
class BookButtonsContainer extends Component {

  handleDriver=()=>{
    const {destination} = this.props;
    this.props.setDestination(destination);
    this.props.navigation.navigate("DriverList")
  }

  handleGuide=()=>{
    const {destination} = this.props;
    this.props.setDestination(destination);
    this.props.navigation.navigate("GuideList")
  }

  render() {
    
    const bgColor = "#32a6ff";
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: bgColor,
          width: buttonsContainerWidth,
          bottom: 0,
          padding: 5
        }}
      >
        <TouchableOpacity
          style={{ width: buttonContainerWidth }}
          onPress={this.handleDriver}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
              maxHeight:60,
            }}
          >
            <Ionicons  color="#fff"  name="ios-car" size={26} />
            <Text style={{ fontSize: 8, fontWeight: "400", color: "#fff" }}>
              GET DRIVER
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: buttonContainerWidth }}
          onPress={this.handleGuide}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
              maxHeight:60,
            }}
          >
            <Ionicons name="ios-body" size={26} color="#fff" />
            <Text style={{ fontSize: 8, fontWeight: "400", color: "#fff" }}>
              GET GUIDE
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity 
          style={{ width: buttonContainerWidth }}
          onPress={this.handleDriver}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
              marginTop:0,
              paddingTop:0,
              maxHeight:60,
            }}
          >
            <View
              style={{
                alignSelf: "center",
                alignItems: "center", 
                flexDirection: "row",
                flex: 1,
                maxHeight:30,
                marginTop:0,
                paddingTop:0
              }}
            >
              <Ionicons  color="#fff"  name="ios-body" size={26} />
              <Ionicons  color="#fff"  name="ios-car" size={26} />
            </View>

            <Text style={{ fontSize: 8, fontWeight: "400", color: "#fff"}}>
              GET DRIVER+GEUIDE
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const moduleActions = {
  setDestination
}

export default withNavigation(connect(null, moduleActions)(BookButtonsContainer));
