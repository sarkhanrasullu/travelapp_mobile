import React, { Component } from "react";
import BookButtonsContainer from "../../components/BookButtonsContainer";
import NavigationHeader from "../../components/navigationoptions/NavigationHeader";
import InfoPage from '../../components/infopage/InfoPage';
import { StyleSheet } from "react-native";
class DestinationInfo extends Component {

  static navigationOptions = ({navigation})=> NavigationHeader.navigationOptions(navigation);
   
  render() {
    const { navigation } = this.props;
    const destination = navigation.getParam("destination");
    
    return (
      <InfoPage 
            images={destination.placeMediafileList} 
            info={destination.about}
            reviewAvg={destination.reviewAvg}
            reviewCount={destination.reviewCount}
            footerHeight={50}
            footer={
                <BookButtonsContainer
                  style={stylesButton.bottomView}
                  destination={destination}
                  
                />
            }
            />
    );
  }
}

export default DestinationInfo;

const stylesButton = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: "center"
  },
  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#EE5407",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  textStyle: {
    color: "#fff",
    fontSize: 18
  }
});
