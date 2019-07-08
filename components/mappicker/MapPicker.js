import React, { Component } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as stateUtil from '../../api/StateUtil'
const width = Dimensions.get("window").width*0.80;
class MapPicker extends Component {

  state = {
    initialRegion: null,//{latitude:null, longitude:null},
    val:null
  }

  componentWillMount(){
      let currentValue = stateUtil.get(this);
      if(currentValue){
        this.setState({initialRegion: currentValue});
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
    const newLL = {
      latitude: newLoc.latitude,
      longitude: newLoc.longitude 
    }

    this.setState({val:newLL});
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

    const { placeholder, error, readOnly } = this.props;
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
