import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  ImageBackground
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-ionicons'

import {
  View,
  Text, 
  Container, 
  Content
} from "native-base";
import BookContainer from "../../components/BookContainer";
const { width, height } = Dimensions.get("window");

class GuideInfo extends Component {
  state = {
    readMore: false
  };
  scrollX = new Animated.Value(0);

  renderRatings = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={14}
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

  renderBody() {
    const { navigation } = this.props;
    const guide = navigation.getParam("guide");
    let description = guide.about;
    if (!this.state.readMore && guide.about && guide.about.length > 0) {
      description = guide.about.substring(0, 180);
    }
    let readMoreButton = null;
    if (guide.about && guide.about.length > 180 && !this.state.readMore) {
      readMoreButton = (
        <Text
          style={{ color: '#007BFA', fontSize:15 }}
          onPress={() => {
            this.setState({ readMore: true });
          }}
        >
          {" "}
          Read more
        </Text>
      );
    }
    return (
      <ScrollView>
        <View style={{padding:20}}>
          <View style={styles.guide}>
            <View style={{flex:1, flexDirection:"row",}}>
                
                <View style={styles.guideDetails}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                      {guide.userId.name+" "+guide.userId.surname}
                    </Text>
                  </View>
                </View>
                <ImageBackground
                  style={styles.guideImage}
                  imageStyle={styles.guideImage}
                  source={{ uri: `data:image/jpg;base64,${guide.userId.thumbnail}` }}
                />
           </View>
            <View style={[styles.guideDetails,{height:120}]}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "center",
                      justifyContent: 'space-between'
                    }}
                  >
                      {
                        guide.isVerified?(
                          <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center"
                              }}
                            >
                              <Ionicons name="ios-checkmark-circle-outline" size={17} />
                              <Text style={{ marginLeft: 4 }}>
                                Verified
                              </Text>
                            </View>
                        ):null
                      }
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <Ionicons name="ios-chatbubbles" size={17} />
                      <Text style={{ marginLeft: 4, fontSize:15 }}>
                        {guide.reviewCount} Reviews
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      {this.renderRatings(guide.reviewAvg)}
                      <Text style={{ color: '#007BFA', fontSize:13 }}>
                        {guide.reviewAvg}
                      </Text>
                      <Text style={{ marginLeft: 8, color: '#BCCCD4', fontSize:13 }}>
                        ({guide.reviewCount} reviews)
                      </Text>
                    </View>
                  </View>
                </View>
          </View>
         
         {/* About */}
          <View style={styles.guideDetails}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                marginTop: 30,
                marginBottom: 20
              }}
            >
              About
            </Text>
            <View style={styles.guideInfo}>
              <Text style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                {description}
                {readMoreButton}
              </Text>
            </View>
          </View>
          <View style={styles.guideDetails2}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <View
                style={styles.guideDetails2Item}
              >
                <Ionicons name="ios-chatbubbles" size={17} />
                <Text style={{ marginLeft: 4 }}>{this.renderLanguages(guide.guideLanguageList)}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  render() {
    const { navigation } = this.props;
    const guide = navigation.getParam("guide");
    return (
      <Container>
        <Content>{this.renderBody()}</Content>
        <BookContainer pageIndex={1} entity={guide} type={"GUIDE"}/>
      </Container>
    );
  }
}

export default GuideInfo;

const styles = StyleSheet.create({
  welcomeCol: {
    paddingTop: 10
  },
  flex: {
    flex: 0
  },
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },
  header: {
    // backgroundColor: 'transparent',
    paddingHorizontal: 36,
    paddingTop: 36,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  back: {
    width: 16 * 3,
    height: 16 * 3,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  contentHeader: {
    backgroundColor: "transparent",
    padding: 36,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: -36 / 2
  },
  avatar: {
    position: "absolute",
    top: -36,
    right: 36,
    width: 36 * 2,
    height: 36 * 2,
    borderRadius: 36
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  dotsContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: '#DCE0E9'
  },
  title: {
    fontSize: 14 * 2,
    fontWeight: "bold"
  },
  description: {
    fontSize: 14 * 1.2,
    lineHeight: 14 * 2,
    color: '#BCCCD4'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.15,
    paddingHorizontal: 14
  },
  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7657"
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF"
  },
  rvMarker: {
    backgroundColor: "#FFBA5A"
  },
  tentMarker: {
    backgroundColor: "#FF7657"
  },
  settings: {
    alignItems: "center",
    justifyContent: "center"
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent"
  },
  tabTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10
  },
  activeTab: {
    borderBottomColor: "#FF7657"
  },
  activeTabTitle: {
    color: "#FF7657"
  },
  map: {
    flex: 1
  },
  guide: {
    flex: 1,
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 0.5,
    width: "100%",
  },
  guideDetails: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  guideDetails2: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop:30
  },
  guideDetails2Item: {
    marginTop:20,
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center"
  },
  guideInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14
  },
  guideImage: {
    width: 75,
    height: 75,
    borderRadius: 36
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(51, 83, 251, 0.2)"
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#3353FB"
  }
});
