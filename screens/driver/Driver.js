import React, { Component } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { Text, View } from 'native-base';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as theme from '../../theme';
import { withNavigation } from 'react-navigation';
import Gallery from '../../components/Gallery';
const { width } = Dimensions.get('window');

const containerWidth = width*0.90;
const containerHeight = 270;
const imageContainerHeight = 200; 
const galleryW = width*0.90;
const galleryH = 200;
class Driver extends Component {
  scrollX = new Animated.Value(0);
 
  renderRatings = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={9}
          color={theme.colors[activeStar ? "active" : "gray"]}
          style={{ marginRight: 4 }}
        />
      );
    });
  };
  
  render() {
    const { navigation, item } = this.props;
    const driver = item;
    const car = driver.carList[0];
    
    return (
                <View style={styles.cardContainer}>
                    <View style={styles.cardImageContainer}>
                      <Gallery 
                      width={galleryW}
                      height={galleryH}
                      images={car.carMediafileList} onPress={()=>{navigation.navigate('DriverInfo', { driver: driver })}}/>
                    </View>
                    <View style={styles.cardInformationContainer}>
                        <View style={{alignSelf:"center"}}>
                          <Text style={styles.cardHeader1}>{driver.name} </Text>
                          <Text style={styles.cardHeader2}>{car.modelId.brandId.name+" "+car.modelId.name}</Text>
                              <Text style={styles.cardHeader3}>{driver.price1}$</Text>
                              <View style={styles.cardRating}>
                                  {this.renderRatings(driver.reviewAvg)}
                                  <Text style={styles.cardRatingText}>{driver.reviewCount}</Text>
                             </View>
                        </View>
                    </View>
                </View>
    );
  }
}

export default withNavigation(Driver)
const styles = StyleSheet.create({
  cardRating:{
    flex:1, 
    flexDirection:"row",
    alignItems:"center",
    height:10,
    maxHeight:10,
  },
  cardRatingText:{
    fontSize:8,
    lineHeight:10
  },
  cardHeader3:{
    fontSize:12,
    lineHeight:13
  },
  cardHeader2:{
    fontWeight:"600",
    fontSize:13,
    lineHeight:13
  },
  cardHeader1:{
    fontWeight:"600",
    fontSize:14,
    lineHeight:15
  },
  cardInformationContainer:{
    top:0,
    alignContent:"center",
    flex:1, 
    flexDirection:"row",
    alignItems:"center",
  },
  cardImageContainer:{height:imageContainerHeight},
  cardContainer:{
    width:containerWidth, 
    height: containerHeight, 
    maxHeight: containerHeight, 
    alignSelf:"center",
    marginBottom:10
  },
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
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: 'transparent',
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2,
  },
  avatar: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
    borderWidth:1,
    borderColor:"#FFFFFF70",
  },
  informationLabel: {
    
    position: 'relative',
    // padding:5,
    bottom: 0,
    // left: 5,
    width: width,
    minHeight:30,
    // height: theme.sizes.padding * 2,
    flex:1,
    flexDirection:"row",
    borderRadius: 0,
    // backgroundColor: '#FFFFFF70',
  },
  shadow: { 
    shadowColor: theme.colors.black,
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
    backgroundColor: theme.colors.gray,
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: 'bold'
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption
  }
});