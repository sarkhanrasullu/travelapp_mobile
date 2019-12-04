import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome, Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
const { width, height } = Dimensions.get('screen');

class Guide extends React.Component {
 
  renderRatings = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={9}
          color={activeStar ? "#007BFA" : "#DCE0E9"}
          style={{ marginRight: 4 }}
        />
      );
    });
  };

  renderLanguages = guideLanguageList =>{
    return guideLanguageList.map((value, index)=>{
         return value.languageId.name+(index!==guideLanguageList.length-1?", ":"")
    })
  }

  render() {
        const { item, navigation } = this.props;
        const guide = item;
        return (
          <TouchableOpacity
           activeOpacity={0.8} 
           onPress={() => navigation.navigate('GuideInfo', { guide: guide })}>
            <View style={styles.guide}>
            <ImageBackground
              style={styles.guideImage}
              imageStyle={styles.guideImage}
              source={{ uri: guide.userId.thumbnail?guide.userId.thumbnail:undefined }}
            />

            <View style={styles.guideDetails}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                  {guide.userId.name+" "+guide.userId.surname}
                </Text>
                <Text style={{ fontSize: 12, color: '#A5A5A5', paddingTop: 5 }}>
                  {guide.about? guide.about.substring(0,130)+"...":""}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', }}>
                  <View style={styles.cardInformationContainer}>
                        <View style={{alignSelf:"center"}}>
                          <View style={styles.flexRow}>
                              <Ionicons name="md-pricetag" style={{marginRight:2}} size={12}/>
                              <Text style={styles.cardHeader3}>30$</Text>
                          </View>
                          <View style={styles.flexRow}>
                              <Ionicons name="md-chatboxes" style={{marginRight:2}} size={12}/>
                              <Text style={styles.cardHeader3}>
                                    {this.renderLanguages(guide.guideLanguageList)}
                              </Text>
                          </View>
                          <View style={styles.flexRow}>
                                  {this.renderRatings(guide.reviewAvg)}
                                  <Text style={styles.cardRatingText}>{guide.reviewCount}</Text>
                          </View>
                        </View>
                    </View>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        )
  }
}

export default withNavigation(Guide);

const styles = StyleSheet.create({
  flexRow:{
    flex:1, 
    flexDirection:"row",
    alignContent:"center",
    alignItems:"center"
  },
  cardRatingText:{
    fontSize:9
  },
  cardHeader3:{
    fontSize:10
  },
  cardHeader2:{
    fontWeight:"600",
    fontSize:13
  },
  cardHeader1:{
    fontWeight:"600",
    fontSize:14
  },
  cardInformationContainer:{
    top:0,
    alignContent:"center",
    flex:1, 
    flexDirection:"row",
    alignItems:"center",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.15,
    paddingHorizontal: 14,
  },
  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7657',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  rvMarker: {
    backgroundColor: '#FFBA5A',
  },
  tentMarker: {
    backgroundColor: '#FF7657',
  },
  settings: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    flex: 1,
    paddingHorizontal: 14,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  activeTab: {
    borderBottomColor: '#FF7657',
  },
  activeTabTitle: {
    color: '#FF7657',
  },
  map: {
    flex: 1,
  },
  guide: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    padding: 20,
  },
  guideDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  guideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  guideImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 45,
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 83, 251, 0.2)'
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#3353FB'
  }
});
