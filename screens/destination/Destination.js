import React, { Component } from 'react';
import {  Animated, Dimensions } from 'react-native';
import {  Text,  View } from 'native-base';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Gallery from '../../components/Gallery';
import { withNavigation } from 'react-navigation';
const { width } = Dimensions.get('window');
const w = width*0.90;
const h = 200;
const containerWidth = width*0.90;
const containerHeight = 240;
const imageContainerHeight = 200; 
const informationContainerHeight = 15;
class Destination extends Component {
  scrollX = new Animated.Value(0);
  render() {
    const { item, navigation } = this.props;
    const destination = item;
    return (
                <View style={{width:containerWidth, height:containerHeight,minHeight:containerHeight, alignSelf:"center"}}>
                    <View style={{height:imageContainerHeight}}>
                    <Gallery width={w} height={h} images={destination.placeMediafileList}  onPress={()=>{navigation.navigate('DestinationInfo', { destination: destination })}}/>
                    </View>
                    <View style={{top:0,alignContent:"center",flex:1, flexDirection:"row", height:informationContainerHeight}}>
                        <View style={{alignItems:"center"}}>
                          <Text uppercase style={{fontWeight:"500", fontSize:14}}>{destination.name}</Text>
                        </View>
                        <View style={{alignItems:"center", flex:1, flexDirection:"row",position:"absolute", right:5}}>
                            <FontAwesome name="location-arrow" color={'#007BFA'} size={12} />
                            <Text style={{ color: '#007BFA', fontSize:13 }}> {destination.distance} miles away</Text>
                        </View>
                    </View>
                </View>
    );
  }
}

export default withNavigation(Destination)