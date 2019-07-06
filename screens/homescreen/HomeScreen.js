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
import Settings from "../../constants/Settings";
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
    // if(!this.props.identificationNumber){
    //   this.props.setIdentification(CommonUtil.uuid());
    // }
    Api.loadDestinations(this, false);
    fetch(Settings.ip + '/galleries', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
          .then((responseJson) => {
            this.setState(
                { 
                  images:responseJson._embedded.galleries
                }
            );

            this.result = this.renderResult();

            this.setState({isLoading: false});
          })
          .catch((error) => {
            console.error(error);
          });
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
