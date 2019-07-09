import React, { Component } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as stateUtil from '../../api/StateUtil'
const width = Dimensions.get("window").width*0.80;
class MapPicker extends Component {

  state = {
    initialRegion: null,//{latitude:null, longitude:null},
  }

  marker = null;

  componentWillMount(){
      let currentValue = stateUtil.get(this);
      if(currentValue && currentValue.trim().length>0){
        this.setState({initialRegion: JSON.parse(currentValue.trim())});
      }else{
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            initialRegion: position.coords
          });
        });
      } 
  }

  onDragEnd = ()=>{
    const newLoc = this.marker.props.coordinate;
    // const newLL = {
    //   latitude: newLoc.latitude,
    //   longitude: newLoc.longitude 
    // }

    // console.log(JSON.stringify(newLL));

    stateUtil.handleFieldChange(this, JSON.stringify(newLoc));
  }

  render() {
    const { error, readOnly } = this.props;
    if(this.state.initialRegion){
     this.marker = <Marker
           title={"Pick me up here!"}
           draggable={!readOnly}
           onDragEnd={()=>this.onDragEnd()}
           coordinate={this.state.initialRegion}
       />
    }

    return (
                <MapView
                //initialRegion={this.state.val}
                    style={[styles.container,  error ? styles.errorInput:null]}
                    showsUserLocation
                    followsUserLocation
                    scrollEnabled
                    > 
                    {this.marker}
                    </MapView>);
  }
}
 
export default MapPicker;

const styles = StyleSheet.create({
    modal:{
      width:width,
      maxWidth:width,
      maxHeight:450,
      height:450,
      alignSelf:"center",
      top:85, 
      position:"absolute",
    },
    container: {
      flex: 1, 
      width:width,
      height:350, 
      maxWidth:width,
      maxHeight:350,

    },
    errorInput: {borderColor:"red", borderWidth:1}
  });
