import React, { Component } from 'react'
import {StyleSheet, Dimensions,TouchableOpacity, Animated, ScrollView, Image} from 'react-native'
import { View} from 'native-base';

import { withNavigation } from 'react-navigation';
const { width, height } = Dimensions.get('window');

class Gallery extends Component {
      scrollX = new Animated.Value(0);
      render() {
          return (
              <View >
                      {this.renderImages()}
              </View>
          ) 
      } 

      renderImages = ()=>{
        const w = this.props.width;
        const h = this.props.height;
        const {  images, onPress } = this.props;
        
        if(!images) return null;
          return( 
                <View style={{width: w}}>
                  <ScrollView
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
                  >
                    {
                      images.map((img, index) => 
                      <TouchableOpacity 
                        onPress={onPress}
                        key={`${index}-${img.mediafile}`}
                        activeOpacity={1}
                      >
                        <Image
                          source={{ uri: img.mediafile }}
                          resizeMode='cover'
                          style={{ width: w, height: h, left:0}}
                        />
                        </TouchableOpacity>
                        
                      )
                    }
                  </ScrollView>
                  {this.renderDots()}
                </View>
                
          )
      }

      renderDots = () => {
        const { navigation, images } = this.props;
        const dotPosition = Animated.divide(this.scrollX, width);
    
        return ( 
          <View style={[ styles.flex, styles.row, styles.dotsContainer ]}>
            {images.map((item, index) => {
              const opacity = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.7, 1, 0.7],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View
                  key={`step-${item}-${index}`}
                  style={[styles.dots, { opacity }]}
                />
              )
            })}
          </View>
        )
      }
}

export default withNavigation(Gallery);

const styles = StyleSheet.create({
    welcomeCol:{
      paddingTop: 10
    },
    flex: {
      flex: 0,
    },
    column: {
      flexDirection: 'column'
    },
    row: {
      flexDirection: 'row'
    },
    header: {
      // backgroundColor: 'transparent',
      paddingHorizontal: 36,
      paddingTop: 36,
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    back: {
      width: 16 * 3,
      height: 16 * 3,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    contentHeader: {
      backgroundColor: 'transparent',
      padding: 36,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: -36 / 2,
    },
    avatar: {
      position: 'absolute',
      top: 5,
      left: 5,
      width: 36 * 2,
      height: 36 * 2,
      borderRadius: 36,
    },
    informationLabel: {
      
      position: 'relative',
      // padding:5,
      // bottom: 0,
      // left: 5,
      width: width,
      // height: 36 * 2,
      flex:1,
      flexDirection:"row",
      borderRadius: 0,
      // backgroundColor: '#FFFFFF70',
    },
    shadow: { 
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    dotsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      right: 0,
      left: 0
    },
    dots: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 6,
      backgroundColor: '#DCE0E9',
    },
    title: {
      fontSize: 14 * 2,
      fontWeight: 'bold'
    },
    description: {
      fontSize: 14 * 1.2,
      lineHeight: 14 * 2,
      color: '#BCCCD4'
    }
  });