import React, { Component } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as stateUtil from '../../api/StateUtil'
import { Text, View } from "native-base";
import { connect } from 'react-redux';
import { setLoading } from '../../modules/loading';

const width = Dimensions.get("window").width*0.90;
class MapPicker extends Component {

  state = {
    initialCoords: null,//{latitude:null, longitude:null},
    initialRegion:null
  }

  marker = null;

  componentDidMount(){
      let currentValue = stateUtil.get(this);
      if(currentValue && currentValue.trim().length>0){
        //console.log('current value');
        const r = JSON.parse(currentValue.trim());
        this.setState({initialCoords: r.coords, initialRegion: r.region});
      }else{
        this.setState({initialRegion:{
          latitude: 40.39197169316081,
          latitudeDelta: 0.3487869675947195,
          longitude: 49.87168582165617,
          longitudeDelta: 0.39252751707090283,
        }})
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({initialCoords: position.coords});
          this.updateMapData();
        });
      }
  } 

  onDragEnd = (event)=>{ 
    this.setState({initialCoords: event.nativeEvent.coordinate});
    this.updateMapData();
  }

  updateMapData = ()=>{
    // console.log('this.state.initialCoords=');
    // console.log(this.state.initialCoords);
    if(this.state.initialCoords){
      const newLL = {
        region: this.state.initialRegion,
        coords: {
          longitude: this.state.initialCoords.longitude,
          latitude: this.state.initialCoords.latitude
        }
      }

      stateUtil.handleFieldChange(this, JSON.stringify(newLL));
    }
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
                    return (<View style={[error ? styles.errorInput:null]}>
                           <MapView
                                showsUserLocation
                                scrollEnabled 
                                initialRegion={this.state.initialRegion}
                                onRegionChange={(event)=>{
                                    this.setState({initialRegion: event});
                                    this.updateMapData();
                                  }
                                }
                                onPoiClick={(event)=>{
                                    this.setState({initialCoords: event.nativeEvent.coordinate});
                                    this.updateMapData();
                                }}
                                onPress={ (event)=>{
                                    this.setState({initialCoords: event.nativeEvent.coordinate});
                                    this.updateMapData();
                                  }
                                }
                                style={[styles.container,  error ? styles.errorInput:null]}> 
                                {this.marker}
                          </MapView>
                          </View>);
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
    container: {
      flex: 1, 
      width:width-2,
      height:350, 
      maxWidth:width-2,
      maxHeight:350,

    },
    errorInput: {borderColor:"red", borderWidth:1}
  });
