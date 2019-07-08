import React, { Component } from "react";
import Modal from "react-native-modal";
import { StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import {Text} from 'native-base';
// import {MapView, Marker} from 'expo';
import UIButton from '../ui/UIButton';
const width = Dimensions.get("window").width*0.80;
class MapPicker extends Component {

  state = {
    initialRegion: null,//{latitude:null, longitude:null},
    val:null
  }

  componentWillMount(){
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          initialRegion: position.coords
        });
      })
  }

  componentWillReceiveProps(nextProps) {
    console.log('will recieve props');
    console.log(nextProps);
  }

  onDragEnd = (e)=>{
    console.log('pressed');
    console.log(this.marker.coordinate);
    this.setState({val:e});
  }

  marker = null;

  render() {
    if(this.state.initialRegion){
     this.marker = <Marker
           title={"Pick me up here!"}
           draggable
           onDragEnd={()=>this.onDragEnd()}
           coordinate={this.state.initialRegion}
       />
    }
    return (
                <MapView
                //initialRegion={this.state.val}
                    style={styles.container}
                    showsUserLocation
                    // onRegionChange={(e)=>this.handleMapPress(e)}
                    followsUserLocation
                    // showsCompass={true}
                    // zoomControlEnabled={true}
                    // zoomEnabled = {true}
                    // showsMyLocationButton={true}
                    // onRegionChange={(e)=>this.onRegionChange(e)}
                    // onPoiClick={(e)=>this.onRegionChange(e)}
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
  });
