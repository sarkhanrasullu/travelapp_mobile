import React, { Component } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as stateUtil from '../../api/StateUtil'
import { Text } from "native-base";
import { connect } from 'react-redux';
import { setLoading } from '../../modules/loading';

const width = Dimensions.get("window").width*0.90;
class MapPicker extends Component {

  state = {
    initialCoords: null,//{latitude:null, longitude:null},
    initialRegion: null
  }

  marker = null;

  componentDidMount(){
      let currentValue = stateUtil.get(this);
      if(currentValue && currentValue.trim().length>0){
        console.log('current value');
        const r = JSON.parse(currentValue.trim());
        this.setState({initialCoords: r.coords, initialRegion: r.region});
      }else{
        console.log('navigator')
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(Object.keys(position.coords));
          this.setState({
            initialCoords: position.coords,
            initialRegion:{
              latitude: 40.39197169316081,
              latitudeDelta: 0.3487869675947195,
              longitude: 49.87168582165617,
              longitudeDelta: 0.39252751707090283,
            }
          //   {"longitude":47.71934755154428,
          //   "latitude":40.13557906918777,
          //   "latitudeDelta":3.4498359410859436,
          //   "longitudeDelta":4.351445943768681
          // }
             
          });

          this.updateMapData();
        });
      } 
  } 

  onDragEnd = (event)=>{ 
    this.setState({initialCoords: event.nativeEvent.coordinate});
    this.updateMapData();
  }

  updateMapData = ()=>{
    
    const newLL = {
      region: this.state.initialRegion,
      coords: this.state.initialCoords
    }

    stateUtil.handleFieldChange(this, JSON.stringify(newLL));
  }

  render() {
    const { error, readOnly } = this.props;
    if(this.state.initialCoords){
     this.marker = <Marker
           draggable={!readOnly}
           onDragEnd={(event)=>this.onDragEnd(event)}
           coordinate={this.state.initialCoords}
       />
    }

    if(this.state.initialRegion===null){
      return <Text>Map is loading...</Text>
    }
                    return ( <MapView
                                showsUserLocation
                                scrollEnabled 
                                initialRegion={this.state.initialRegion}
                                onRegionChange={(event)=>{
                                    this.setState({initialRegion: event});
                                    this.updateMapData();
                                  }
                                }
                                onPress={ (event)=>{
                                    this.setState({initialCoords: event.nativeEvent.coordinate});
                                    this.updateMapData();
                                  }
                                }
                                style={[styles.container,  error ? styles.errorInput:null]}> 
                                {this.marker}
                          </MapView>);
  }
}
 

const moduleState = state => ({
  isLoading: state.loading.loading,
});

const moduleActions = {
  setLoading,
}; 

export default connect(moduleState, moduleActions)(MapPicker);

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
