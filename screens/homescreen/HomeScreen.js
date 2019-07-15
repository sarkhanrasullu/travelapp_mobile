import React from "react";
import {
  View,
  Dimensions,
} from "react-native";
import images from './../../assets/icons/base64images';
import { Container, Content } from "native-base";
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux';
import { setDestinations } from '../../modules/destinations';
import Gallery from "../../components/Gallery";
import WelcomeNavigation from "./welcomeNavigation/WelcomeNavigation";
import Api from "../../api/Api";
import ImageViewer from "../../components/imageviewer/ImageViewer";

let win = Dimensions.get("window");
const width = win.width;

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    images:[]
  }

  result = null;

  render(){
    return this.result;
  }

  componentWillMount() {
    Api.loadDestinations(this, false);
    Api.loadGalleries(this, false);
  }

  renderResult() {
    const galleryHeight = 220;
    return ( 
      <Container > 
        <Content style={{backgroundColor:"#FFF"}}>
                <View style={{justifyContent:"flex-end"}}>
                    <View style={{backgroundColor:"#FFF",height:70, justifyContent:"flex-end"}}>
                        <ImageViewer 
                              uri={images.banner}
                              base64
                              resizeMode='stretch'
                              style={{ width: "55%", height: 55,bottom:0, alignSelf:"center"}}/>
                    </View>
                    <Gallery 
                    width={width} 
                    height={galleryHeight} 
                    images={this.state.images} />
                </View>
              <WelcomeNavigation/>
        </Content>
      </Container>
    );
  }
}

const moduleActions = {
  setDestinations
}

const moduleState = state => { 
  if(state.auth.loggedInUser){
    Api.token = state.auth.loggedInUser.token;
  }
  return {
  };
}

export default withNavigation(connect(moduleState, moduleActions)(HomeScreen));
